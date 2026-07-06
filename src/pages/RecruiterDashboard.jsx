import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Users, TrendingUp, Clock, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { dashboardAPI, candidateAPI } from '../services/api';
import Loader from '../components/Loader.jsx';

const PIE_COLORS = { Hire: '#1BA362', Hold: '#D19E14', Reject: '#D14343' };

export default function RecruiterDashboard() {
  const [stats, setStats] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadCandidates = async (q = '') => {
    const res = await candidateAPI.list(q ? { search: q } : {});
    setCandidates(res.data.data.candidates);
  };

  useEffect(() => {
    (async () => {
      try {
        const [statsRes] = await Promise.all([dashboardAPI.getStats(), loadCandidates()]);
        setStats(statsRes.data.data);
      } catch (err) {
        toast.error('Could not load dashboard');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loader fullScreen label="Loading dashboard..." />;

  const recData = (stats.recommendationBreakdown || []).map((r) => ({ name: r._id, value: r.count }));
  const scoreData = stats.interviewAverages
    ? [
        { name: 'Technical', value: Math.round(stats.interviewAverages.avgTechnical || 0) },
        { name: 'Comm.', value: Math.round(stats.interviewAverages.avgCommunication || 0) },
        { name: 'Confidence', value: Math.round(stats.interviewAverages.avgConfidence || 0) },
        { name: 'Problem Solv.', value: Math.round(stats.interviewAverages.avgProblemSolving || 0) },
        { name: 'Behaviour', value: Math.round(stats.interviewAverages.avgBehaviour || 0) },
      ]
    : [];

  const statusColor = {
    evaluated: 'text-emerald-400', interviewed: 'text-blue-300', interview_ready: 'text-purple-300',
    parsed: 'text-slate-300', resume_uploaded: 'text-slate-400', registered: 'text-slate-500',
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white mb-1">Recruiter Dashboard</h1>
        <p className="text-slate-400 mb-8">Live analytics across your candidate pipeline.</p>

        {/* Top stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-6 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-accent/15 flex items-center justify-center"><Users size={20} className="text-accent-light" /></div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.totalCandidates}</p>
              <p className="text-xs text-slate-500">Total Candidates</p>
            </div>
          </div>
          <div className="glass-card p-6 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/15 flex items-center justify-center"><TrendingUp size={20} className="text-emerald-400" /></div>
            <div>
              <p className="text-2xl font-bold text-white">{Math.round(stats.avgAtsScore)}</p>
              <p className="text-xs text-slate-500">Avg. ATS Score</p>
            </div>
          </div>
          <div className="glass-card p-6 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-purple-500/15 flex items-center justify-center"><Clock size={20} className="text-purple-300" /></div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.impact.timeSavedPercent}%</p>
              <p className="text-xs text-slate-500">Screening Time Saved</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Hiring Recommendations</h3>
            {recData.length ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={recData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                    {recData.map((d) => <Cell key={d.name} fill={PIE_COLORS[d.name] || '#6C5CE7'} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#111A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                </PieChart>
              </ResponsiveContainer>
            ) : <p className="text-sm text-slate-500 py-16 text-center">No evaluated candidates yet</p>}
          </div>
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Average Interview Scores</h3>
            {scoreData.length && stats.interviewAverages.count ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={scoreData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2A47" />
                  <XAxis dataKey="name" tick={{ fill: '#8892A6', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#8892A6', fontSize: 11 }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: '#111A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                  <Bar dataKey="value" fill="#6C5CE7" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : <p className="text-sm text-slate-500 py-16 text-center">No evaluated candidates yet</p>}
          </div>
        </div>

        {/* Candidate table */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Candidates</h3>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                className="input-field !pl-9 !py-2 !w-64 text-sm"
                placeholder="Search by name, email, role..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); loadCandidates(e.target.value); }}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-white/5">
                  <th className="py-2 font-medium">Name</th>
                  <th className="py-2 font-medium">Target Role</th>
                  <th className="py-2 font-medium">ATS Score</th>
                  <th className="py-2 font-medium">Status</th>
                  <th className="py-2 font-medium">Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((c) => (
                  <tr key={c._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-3">
                      <Link to={`/recruiter/candidate/${c._id}`} className="text-white font-medium hover:text-accent-light">
                        {c.fullName || c.email}
                      </Link>
                    </td>
                    <td className="py-3 text-slate-400">{c.targetRole || '—'}</td>
                    <td className="py-3 text-slate-400">{c.resume?.atsScore?.overall ?? '—'}</td>
                    <td className={`py-3 capitalize ${statusColor[c.status] || 'text-slate-400'}`}>{c.status.replace('_', ' ')}</td>
                    <td className="py-3">
                      {c.finalRecommendation ? (
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          c.finalRecommendation === 'Hire' ? 'bg-emerald-500/15 text-emerald-400' :
                          c.finalRecommendation === 'Hold' ? 'bg-amber-500/15 text-amber-400' : 'bg-red-500/15 text-red-400'
                        }`}>
                          {c.finalRecommendation}
                        </span>
                      ) : <span className="text-slate-600">—</span>}
                    </td>
                  </tr>
                ))}
                {!candidates.length && (
                  <tr><td colSpan={5} className="py-8 text-center text-slate-500">No candidates found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
