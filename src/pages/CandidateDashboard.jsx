import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Mic, Award, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { candidateAPI, interviewAPI } from '../services/api';
import Loader from '../components/Loader.jsx';

const STEPS = [
  { key: 'registered', label: 'Account Created' },
  { key: 'resume_uploaded', label: 'Resume Uploaded' },
  { key: 'parsed', label: 'AI Parsing & ATS Score' },
  { key: 'interview_ready', label: 'Interview Questions Ready' },
  { key: 'interviewed', label: 'Interview Completed' },
  { key: 'evaluated', label: 'Final Evaluation' },
];

export default function CandidateDashboard() {
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = async () => {
    try {
      const res = await candidateAPI.getMyProfile();
      setCandidate(res.data.data.candidate);
    } catch (err) {
      toast.error('Could not load your profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) return <Loader fullScreen label="Loading your profile..." />;

  const stepIndex = STEPS.findIndex((s) => s.key === candidate?.status);

  const handlePrimaryAction = async () => {
    if (!candidate?.resume) return navigate('/candidate/resume');
    if (candidate.status === 'resume_uploaded' || candidate.status === 'parsed') {
      if (candidate.status === 'resume_uploaded') return navigate('/candidate/resume');
      // parsed -> generate interview
      try {
        const res = await interviewAPI.generate(candidate.resume._id || candidate.resume);
        navigate(`/candidate/interview/${res.data.data.interview._id}`);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Could not start interview');
      }
      return;
    }
    if (candidate.status === 'interview_ready' || candidate.status === 'interviewed') {
      try {
        const res = await interviewAPI.getByCandidate(candidate._id);
        navigate(`/candidate/interview/${res.data.data.interview._id}`);
      } catch {
        navigate('/candidate/resume');
      }
      return;
    }
    if (candidate.status === 'evaluated') return navigate('/candidate/report');
    navigate('/candidate/resume');
  };

  const primaryLabel = {
    registered: 'Upload Resume',
    resume_uploaded: 'Continue: Parse Resume',
    parsed: 'Start AI Interview',
    interview_ready: 'Continue Interview',
    interviewed: 'View Progress',
    evaluated: 'View Final Report',
  }[candidate?.status] || 'Get Started';

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white mb-1">
          Welcome, {candidate?.fullName?.split(' ')[0] || 'Candidate'}
        </h1>
        <p className="text-slate-400 mb-8">Here's where you are in the RecruitIQ AI pipeline.</p>

        <div className="glass-card p-6 mb-6">
          <div className="space-y-1">
            {STEPS.map((s, i) => {
              const done = i < stepIndex || candidate?.status === s.key && i <= stepIndex;
              const active = i === stepIndex;
              const complete = i < stepIndex;
              return (
                <div key={s.key} className="flex items-center gap-3 py-2.5">
                  {complete ? (
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                  ) : active ? (
                    <div className="w-[18px] h-[18px] rounded-full border-2 border-accent bg-accent/20 shrink-0" />
                  ) : (
                    <Circle size={18} className="text-slate-600 shrink-0" />
                  )}
                  <span className={`text-sm ${complete ? 'text-slate-300' : active ? 'text-white font-medium' : 'text-slate-600'}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <button onClick={handlePrimaryAction} className="btn-primary flex items-center gap-2">
          {primaryLabel} <ArrowRight size={16} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          <Link to="/candidate/resume" className="glass-card p-5 hover:border-accent/30 transition-colors">
            <FileText size={18} className="text-accent-light mb-2" />
            <p className="font-medium text-white text-sm">Resume & ATS Score</p>
          </Link>
          <div className="glass-card p-5 opacity-80">
            <Mic size={18} className="text-accent-light mb-2" />
            <p className="font-medium text-white text-sm">AI Voice Interview</p>
          </div>
          <Link to="/candidate/report" className="glass-card p-5 hover:border-accent/30 transition-colors">
            <Award size={18} className="text-accent-light mb-2" />
            <p className="font-medium text-white text-sm">Final Report</p>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
