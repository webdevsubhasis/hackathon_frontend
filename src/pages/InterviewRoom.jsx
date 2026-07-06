import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Mic, MicOff, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { interviewAPI } from "../services/api";
import Loader from "../components/Loader.jsx";

// Web Speech API — Chrome/Edge only. Falls back to manual text entry elsewhere if unsupported.
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function InterviewRoom() {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [finalizing, setFinalizing] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const loadInterview = async () => {
      try {
        setLoading(true);

        const res = await interviewAPI.get(interviewId);

        const iv = res.data.data.interview;

        setInterview(iv);

        const combined = [
          ...iv.hrQuestions.map((q) => ({
            ...q,
            category: "hr",
          })),
          ...iv.technicalQuestions.map((q) => ({
            ...q,
            category: "technical",
          })),
        ];

        setAllQuestions(combined);

        // Resume interview from backend
        if (
          typeof iv.currentQuestion === "number" &&
          iv.currentQuestion < combined.length
        ) {
          setCurrentIdx(iv.currentQuestion);
        } else {
          const firstUnanswered = combined.findIndex(
            (q) => !q.answerTranscript,
          );

          setCurrentIdx(
            firstUnanswered === -1 ? combined.length : firstUnanswered,
          );
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Unable to load interview.");
      } finally {
        setLoading(false);
      }
    };

    loadInterview();
  }, [interviewId]);

  const startRecording = () => {
    if (!SpeechRecognition) {
      toast.error(
        "Voice recognition is not supported in this browser. Please use Chrome.",
      );
      return;
    }
    const recog = new SpeechRecognition();
    recog.continuous = true;
    recog.interimResults = true;
    recog.lang = "en-US";

    let finalText = transcript;
    recog.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalText += text + " ";
        else interim += text;
      }
      setTranscript(finalText + interim);
    };
    recog.onerror = () => setIsRecording(false);
    recog.onend = () => setIsRecording(false);

    recognitionRef.current = recog;
    recog.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  };

  const handleSubmitAnswer = async () => {
    if (!transcript.trim()) {
      return toast.error("Please record or type an answer first.");
    }

    const q = allQuestions[currentIdx];

    setSubmitting(true);

    try {
      const res = await interviewAPI.submitAnswer(interviewId, {
        questionId: q._id,
        category: q.category,
        transcript: transcript.trim(),
      });

      toast.success("Answer saved successfully.");

      // Update progress from backend
      if (res.data.data.progress !== undefined) {
        setInterview((prev) => ({
          ...prev,
          progress: res.data.data.progress,
          currentQuestion: res.data.data.answeredQuestions,
        }));
      }

      // Update local question
      const updated = [...allQuestions];

      updated[currentIdx].answerTranscript = transcript.trim();

      updated[currentIdx].answeredAt = new Date();

      setAllQuestions(updated);

      setTranscript("");

      setCurrentIdx((prev) => prev + 1);
    } catch (err) {
      if (err.response?.status === 429) {
        toast.error(
          "AI service is temporarily busy.\nPlease wait about 30 seconds and try again.",
        );

        return;
      }

      toast.error(err.response?.data?.message || "Failed to save answer.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFinalize = async () => {
    setFinalizing(true);

    const loadingToast = toast.loading(
      "🤖 RecruitIQ AI is evaluating your interview...",
    );

    try {
      const res = await interviewAPI.finalize(interviewId);

      toast.dismiss(loadingToast);

      toast.success("Interview evaluated successfully!");

      // Small delay so user sees success
      setTimeout(() => {
        navigate("/candidate/report");
      }, 1500);
    } catch (err) {
      toast.dismiss(loadingToast);

      if (err.response?.status === 429) {
        toast.error(
          "AI service is temporarily busy.\nPlease wait about 30 seconds and try again.",
        );

        return;
      }

      if (err.response?.status === 401) {
        toast.error("AI authentication failed.");

        return;
      }

      if (err.response?.status === 500) {
        toast.error("Unable to generate interview evaluation.");

        return;
      }

      toast.error(
        err.response?.data?.message || "Failed to finalize interview.",
      );
    } finally {
      setFinalizing(false);
    }
  };

  if (loading) return <Loader fullScreen label="Loading interview..." />;
  if (!interview) return null;

  const isComplete = currentIdx >= allQuestions.length;
  const q = allQuestions[currentIdx];
  const progress = Math.round((currentIdx / allQuestions.length) * 100);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-white">AI Voice Interview</h1>
        <span className="text-xs text-slate-500">
          {Math.min(currentIdx, allQuestions.length)}/{allQuestions.length}
        </span>
      </div>
      <div className="w-full h-1.5 bg-white/5 rounded-full mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-accent"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key={q._id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <div className="glass-card p-6 mb-6">
              <span
                className={`inline-block text-[10px] uppercase tracking-wide font-semibold px-2 py-1 rounded-full mb-3 ${
                  q.category === "hr"
                    ? "bg-purple-500/15 text-purple-300"
                    : "bg-blue-500/15 text-blue-300"
                }`}
              >
                {q.category === "hr" ? "HR Round" : "Technical Round"} ·{" "}
                {q.difficulty}
              </span>
              <p className="text-lg text-white font-medium leading-relaxed">
                {q.question}
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center justify-center mb-5">
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                    isRecording
                      ? "bg-red-500 pulse-ring"
                      : "bg-accent hover:bg-accent-dark"
                  }`}
                >
                  {isRecording ? (
                    <MicOff size={24} className="text-white" />
                  ) : (
                    <Mic size={24} className="text-white" />
                  )}
                </button>
              </div>
              <p className="text-center text-xs text-slate-500 mb-4">
                {isRecording
                  ? "Listening... click to stop"
                  : "Click the mic to record your answer"}
              </p>

              <textarea
                className="input-field min-h-[100px] resize-none"
                placeholder="Your transcribed answer will appear here — you can also type or edit it directly."
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
              />

              <button
                onClick={handleSubmitAnswer}
                disabled={submitting || !transcript.trim()}
                className="btn-primary w-full mt-4 flex items-center justify-center gap-2"
              >
                {submitting ? "Saving..." : "Save & Next"}
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-10 text-center"
          >
            <CheckCircle2 size={40} className="text-emerald-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">
              All questions answered!
            </h2>
            <p className="text-slate-400 mb-6 text-sm">
              Our AI will now analyze your full interview and generate your
              hiring recommendation.
            </p>
            <button
              onClick={handleFinalize}
              disabled={finalizing}
              className="btn-primary flex items-center gap-2 mx-auto"
            >
              <Sparkles size={16} />{" "}
              {finalizing ? "AI is evaluating..." : "Generate Final Evaluation"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
