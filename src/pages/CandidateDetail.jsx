import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Download,
  Cpu,
  MessageSquare,
  Zap,
  Puzzle,
  Users,
  Award,
} from "lucide-react";

import { candidateAPI, interviewAPI, reportAPI } from "../services/api";

import ScoreCard from "../components/ScoreCard.jsx";
import Loader from "../components/Loader.jsx";

const decisionStyle = {
  Hire: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
  },
  Hold: {
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    text: "text-yellow-400",
  },
  Reject: {
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    text: "text-red-400",
  },
};

export default function CandidateDetail() {
  const { id } = useParams();

  const [candidate, setCandidate] = useState(null);
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCandidate();
  }, [id]);

  const loadCandidate = async () => {
    try {
      setLoading(true);

      const candidateRes = await candidateAPI.getById(id);
      setCandidate(candidateRes.data.data.candidate);

      try {
        const interviewRes = await interviewAPI.getByCandidate(id);
        setInterview(interviewRes.data.data.interview);
      } catch {
        setInterview(null);
      }
    } catch (err) {
      toast.error("Unable to load candidate");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen label="Loading Candidate..." />;
  }

  if (!candidate) {
    return (
      <div className="text-center py-20 text-red-400">Candidate not found.</div>
    );
  }

  const evaluation = interview?.evaluation;

  const style = evaluation?.decision
    ? decisionStyle[evaluation.decision]
    : null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <Link
        to="/recruiter/dashboard"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {candidate.fullName}
            </h1>

            <p className="text-slate-400 mt-1">{candidate.email}</p>

            <p className="text-slate-500 text-sm">
              {candidate.targetRole || "No Target Role"}
            </p>
          </div>

          {evaluation && (
            <a
              href={reportAPI.downloadUrl(candidate._id)}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary flex items-center gap-2"
            >
              <Download size={16} />
              Download PDF
            </a>
          )}
        </div>

        {style && (
          <div
            className={`rounded-2xl border ${style.bg} ${style.border} p-6 mb-8`}
          >
            <div className="flex items-center gap-4">
              <Award size={34} className={style.text} />

              <div>
                <p className="text-sm text-slate-400">AI Recommendation</p>

                <h2 className={`text-3xl font-bold ${style.text}`}>
                  {evaluation.decision}
                </h2>
              </div>
            </div>
          </div>
        )}

        {candidate.resume?.atsScore && (
          <div className="glass-card p-6 mb-8">
            <h3 className="text-white font-semibold mb-4">ATS Resume Score</h3>

            <ScoreCard
              label="ATS Score"
              score={candidate.resume.atsScore.overall}
              icon={Award}
            />
          </div>
        )}

        {evaluation && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <ScoreCard
              label="Technical"
              score={evaluation.technicalScore}
              icon={Cpu}
            />

            <ScoreCard
              label="Communication"
              score={evaluation.communicationScore}
              icon={MessageSquare}
            />

            <ScoreCard
              label="Confidence"
              score={evaluation.confidenceScore}
              icon={Zap}
            />

            <ScoreCard
              label="Problem Solving"
              score={evaluation.problemSolvingScore}
              icon={Puzzle}
            />

            <ScoreCard
              label="Behaviour"
              score={evaluation.behaviourScore}
              icon={Users}
            />

            <ScoreCard
              label="Overall"
              score={evaluation.overallScore}
              icon={Award}
            />
          </div>
        )}

        {evaluation && (
          <div className="glass-card p-6 mb-6">
            <h3 className="text-white font-semibold mb-3">AI Summary</h3>

            <p className="text-slate-300 leading-7">
              {evaluation.justification}
            </p>
          </div>
        )}

        {evaluation && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h3 className="text-emerald-400 font-semibold mb-4">Strengths</h3>

              <ul className="space-y-3">
                {(evaluation.strengths || []).map((item, index) => (
                  <li key={index} className="text-slate-300 flex gap-2">
                    <span className="text-emerald-400">✔</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-red-400 font-semibold mb-4">
                Areas of Concern
              </h3>

              <ul className="space-y-3">
                {(evaluation.concerns || []).map((item, index) => (
                  <li key={index} className="text-slate-300 flex gap-2">
                    <span className="text-red-400">⚠</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {!evaluation && (
          <div className="glass-card p-8 text-center">
            <h2 className="text-xl font-semibold text-white mb-2">
              Interview Not Completed
            </h2>

            <p className="text-slate-400">
              This candidate hasn't completed the AI interview yet.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
