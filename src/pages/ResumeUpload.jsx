import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { UploadCloud, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { resumeAPI, interviewAPI } from '../services/api';
import ScoreCard from '../components/ScoreCard.jsx';
import Loader from '../components/Loader.jsx';

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [stage, setStage] = useState('select'); // select -> uploading -> parsing -> done
  const [resume, setResume] = useState(null);
  const inputRef = useRef();
  const navigate = useNavigate();

  const handleFile = (f) => {
    if (f && f.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }
    setFile(f);
  };

  const handleUploadAndParse = async () => {
    if (!file) return toast.error('Please select a resume PDF first');
    try {
      setStage('uploading');
      const formData = new FormData();
      formData.append('resume', file);
      const uploadRes = await resumeAPI.upload(formData);
      const { resumeId } = uploadRes.data.data;

      setStage('parsing');
      const parseRes = await resumeAPI.parse(resumeId);
      setResume(parseRes.data.data.resume);
      setStage('done');
      toast.success('Resume parsed and ATS scored successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
      setStage('select');
    }
  };

  const handleStartInterview = async () => {
    try {
      const res = await interviewAPI.generate(resume._id);
      toast.success('Interview questions generated!');
      navigate(`/candidate/interview/${res.data.data.interview._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not generate interview');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-white mb-1">Resume Upload &amp; AI Analysis</h1>
      <p className="text-slate-400 mb-8">Upload a PDF resume — our AI will parse it and generate your ATS score.</p>

      {stage === 'select' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-10 text-center">
          <div
            onClick={() => inputRef.current.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
            className="border-2 border-dashed border-white/10 hover:border-accent/50 rounded-2xl py-14 cursor-pointer transition-colors"
          >
            <UploadCloud size={36} className="mx-auto text-accent-light mb-3" />
            <p className="text-slate-300 font-medium">
              {file ? file.name : 'Click or drag your resume PDF here'}
            </p>
            <p className="text-xs text-slate-500 mt-1">PDF only, up to 5MB</p>
            <input ref={inputRef} type="file" accept="application/pdf" hidden
              onChange={(e) => handleFile(e.target.files[0])} />
          </div>

          <button onClick={handleUploadAndParse} disabled={!file} className="btn-primary mt-6 w-full">
            Analyze Resume with AI
          </button>
        </motion.div>
      )}

      {(stage === 'uploading' || stage === 'parsing') && (
        <div className="glass-card p-10">
          <Loader label={stage === 'uploading' ? 'Uploading resume...' : 'AI is parsing your resume & computing ATS score...'} />
        </div>
      )}

      <AnimatePresence>
        {stage === 'done' && resume && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="glass-card p-6 flex items-center gap-3">
              <CheckCircle2 className="text-emerald-400" size={22} />
              <div>
                <p className="text-white font-medium">{resume.fileName}</p>
                <p className="text-xs text-slate-500">Parsed &amp; scored successfully</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ScoreCard label="Overall ATS Score" score={resume.atsScore?.overall} icon={FileText} delay={0} />
              <ScoreCard label="Keyword Match" score={resume.atsScore?.keywordMatch} icon={FileText} delay={0.05} />
              <ScoreCard label="Formatting" score={resume.atsScore?.formatting} icon={FileText} delay={0.1} />
              <ScoreCard label="Experience Relevance" score={resume.atsScore?.experienceRelevance} icon={FileText} delay={0.15} />
            </div>

            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-white mb-2">ATS Analysis</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{resume.atsScore?.breakdown}</p>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-white mb-3">Extracted Profile</h3>
              <p className="text-sm text-slate-400 mb-3">{resume.parsed?.summary}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {(resume.parsed?.skills || []).map((s) => (
                  <span key={s} className="px-2.5 py-1 bg-accent/10 text-accent-light text-xs rounded-full border border-accent/20">
                    {s}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-500">
                Recommended role: <span className="text-slate-300 font-medium">{resume.parsed?.recommendedRole}</span>
              </p>
            </div>

            <button onClick={handleStartInterview} className="btn-primary w-full flex items-center justify-center gap-2">
              Generate AI Interview Questions <ArrowRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
