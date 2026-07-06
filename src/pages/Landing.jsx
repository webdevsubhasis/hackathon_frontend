import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Workflow from "../components/workflow/Workflow";
import "../components/workflow/Workflow.css";
import {
  Sparkles,
  FileUp,
  Brain,
  Target,
  Mic,
  Gauge,
  Clock,
  FileText,
  LayoutDashboard,
  Award,
  ChevronRight,
  ShieldCheck,
  ChevronLeft,
  ArrowRight,
  Download,
  AudioLines,
  CheckCircle2,
  BarChart3,
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Cpu,
  Link2,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "AI Resume Parsing",
    desc: "Extracts skills, education, and experience from any PDF resume in seconds.",
  },
  {
    icon: BarChart3,
    title: "ATS Scoring",
    desc: "Objective, explainable scoring against real ATS criteria and target roles.",
  },
  {
    icon: Mic,
    title: "Voice Interviews",
    desc: "Speech-to-text HR & technical interviews evaluated live by Gemini AI.",
  },
  {
    icon: ShieldCheck,
    title: "Hiring Recommendation",
    desc: "Hire / Hold / Reject decisions backed by five measurable score dimensions.",
  },
];

const stats = [
  {
    label: "Hiring Time Saved",
    value: "91%",
    sub: "Reduce manual recruitment effort",
  },
  {
    label: "Resume Match Accuracy",
    value: "95%",
    sub: "AI-powered ATS analysis",
  },
  {
    label: "AI Evaluation Time",
    value: "< 4 Min",
    sub: "Resume to hiring recommendation",
  },
  {
    label: "AI Hiring Reports",
    value: "100%",
    sub: "Automatically generated insights",
  },
];

export default function Landing() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section
        id="home"
        className="relative max-w-7xl mx-auto px-6 pt-32 pb-28 text-center"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[140px] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative flex flex-wrap justify-center gap-3 mb-8"
        >
          <div className="glass-card inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-accent-light border border-accent/20">
            <Sparkles size={16} />
            Powered by Gemini AI
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-sm font-semibold text-emerald-400">
            🏆 Hackathon 2026
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sky-500/10 border border-sky-500/30 text-sm font-semibold text-sky-400">
            ⚡ AI-Powered Recruitment
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]"
        >
          {/* Hiring, reimagined by <span className="gradient-text">AI</span>.  */}
          Next Generation
          <br />
          <span className="gradient-text">AI Recruitment Platform</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mt-5 max-w-2xl mx-auto text-lg text-slate-400"
        >
          RecruitIQ AI streamlines the entire hiring process—from AI-powered
          resume screening and ATS analysis to voice interviews, candidate
          evaluation, and intelligent hiring recommendations—helping recruiters
          make faster and smarter hiring decisions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Candidate Registration */}
          <Link to="/register" className="btn-primary flex items-center gap-2">
            Candidate Registration
            <ArrowRight size={16} />
          </Link>

          {/* Recruiter Demo Login */}
          <Link to="/login" className="btn-secondary flex items-center gap-2">
            🚀 Recruiter Demo
          </Link>
        </motion.div>

        {/* Demo Account Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 flex justify-center"
        >
          <div className="glass-card max-w-xl w-full p-6 border border-emerald-500/20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">🚀</span>
              <h3 className="text-xl font-bold text-white">
                Hackathon Demo Account
              </h3>
            </div>

            <p className="text-slate-400 text-center leading-relaxed mb-6">
              Recruiters can evaluate the complete AI Recruitment Platform using
              the demo account below.
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white/5 rounded-2xl px-4 py-3">
                <span className="font-medium text-slate-300">📧 Email</span>

                <span className="font-semibold text-accent-light">
                  demo@recruitiq.ai
                </span>
              </div>

              <div className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
                <span className="font-medium text-slate-300">🔑 Password</span>

                <span className="font-semibold text-accent-light">
                  Demo@123
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
              <p className="text-sm text-emerald-300 text-center leading-relaxed">
                ✅ Demo account includes preloaded candidates, ATS analysis, AI
                interview evaluations, recruiter dashboard analytics, and
                downloadable recruitment reports.
              </p>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Trusted by recruiters for faster, smarter, AI-powered hiring.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section id="stats" className="max-w-6xl mx-auto px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="glass-card p-6 text-center"
            >
              <div className="flex items-center justify-center gap-1.5 text-slate-500 mb-2">
                <Clock size={13} />{" "}
                <span className="text-xs uppercase tracking-wide">
                  {s.label}
                </span>
              </div>
              <p className="text-3xl font-extrabold gradient-text">{s.value}</p>
              <p className="text-xs text-slate-500 mt-1">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= AI Recruitment Workflow ================= */}

      <Workflow />

      {/* ========================= PREMIUM FOOTER ========================= */}

      <footer className="mt-20 border-t border-white/10 bg-gradient-to-b from-navy-950 via-navy-900/60 to-navy-950">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* ================= CTA ================= */}

          <div className="glass-card border border-accent/20 shadow-glow rounded-3xl p-10 text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Ready to Transform Your Hiring Process?
            </h2>

            <p className="text-slate-400 max-w-3xl mx-auto leading-8 text-lg mb-8">
              Experience faster, smarter, AI-powered recruitment with
              <span className="text-accent-light font-semibold">
                {" "}
                RecruitIQ AI
              </span>
              . Automate Resume Screening, ATS Analysis, AI Voice Interviews,
              Candidate Evaluation and Intelligent Hiring Recommendations.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="btn-primary px-10 py-3.5 flex items-center gap-2"
              >
                👤 Candidate Registration
              </Link>

              <Link
                to="/login"
                className="btn-secondary px-10 py-3.5 flex items-center gap-2"
              >
                🚀 Recruiter Demo
              </Link>
            </div>
          </div>

          {/* ================= Main Footer ================= */}

          {/* ================= Main Footer ================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* ======================================================
                      COLUMN 1
  ======================================================= */}

            <div>
              <h2 className="text-4xl font-extrabold gradient-text mb-5">
                RecruitIQ AI
              </h2>

              <p className="text-slate-400 leading-8 mb-6">
                AI-powered recruitment platform that automates resume screening,
                ATS analysis, voice interviews, candidate evaluation and
                intelligent hiring recommendations.
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent-light text-xs">
                  AI Recruitment
                </span>

                <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 text-xs">
                  Gemini AI
                </span>

                <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-300 text-xs">
                  MERN Stack
                </span>
              </div>
            </div>

            {/* ======================================================
                      COLUMN 2
  ======================================================= */}

            <section id="technology">
              <h3 className="text-xl font-bold text-white mb-6">
                ⚙ Technology Stack
              </h3>

              <ul className="space-y-4">
                <li className="text-slate-300 hover:text-accent-light transition">
                  ⚛ React.js
                </li>

                <li className="text-slate-300 hover:text-accent-light transition">
                  🟢 Node.js
                </li>

                <li className="text-slate-300 hover:text-accent-light transition">
                  🍃 MongoDB
                </li>

                <li className="text-slate-300 hover:text-accent-light transition">
                  ✨ Gemini AI
                </li>

                <li className="text-slate-300 hover:text-accent-light transition">
                  🎨 Tailwind CSS
                </li>

                <li className="text-slate-300 hover:text-accent-light transition">
                  🎬 Framer Motion
                </li>
              </ul>
            </section>

            {/* ======================================================
                      COLUMN 3
  ======================================================= */}

            <div>
              <h3 className="text-xl font-bold text-white mb-6">
                🚀 Quick Links
              </h3>

              <ul className="space-y-4">
                <li>
                  <a
                    href="#home"
                    className="text-slate-300 hover:text-accent-light transition"
                  >
                    Home
                  </a>
                </li>

                <li>
                  <a
                    href="#workflow"
                    className="text-slate-300 hover:text-accent-light transition"
                  >
                    Workflow
                  </a>
                </li>

                <li>
                  <a
                    href="#stats"
                    className="text-slate-300 hover:text-accent-light transition"
                  >
                    Stats
                  </a>
                </li>

                <li>
                  <a
                    href="#technology"
                    className="text-slate-300 hover:text-accent-light transition"
                  >
                    Technology
                  </a>
                </li>

                <li>
                  <a
                    href="#contact"
                    className="text-slate-300 hover:text-accent-light transition"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* ======================================================
                      COLUMN 4
  ======================================================= */}

            <section id="contact">
              <h3 className="text-xl font-bold text-white mb-6">📞 Contact</h3>

              <div className="space-y-5">
                <a
                  href="mailto:mukherjeebasis@gmail.com"
                  className="flex items-center gap-3 text-slate-300 hover:text-accent-light transition"
                >
                  📧
                  <span>mukherjeebasis@gmail.com</span>
                </a>

                <a
                  href="tel:+91700xxx7430"
                  className="flex items-center gap-3 text-slate-300 hover:text-accent-light transition"
                >
                  📞
                  <span>+91 700xxx7430</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/subhasis-mukherjee-b43257240/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition"
                >
                  💼
                  <span>LinkedIn Profile</span>
                </a>

                <div className="flex items-center gap-3 text-slate-300">
                  📍
                  <span>Durgapur, West Bengal, India</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </footer>
    </div>
  );
}
