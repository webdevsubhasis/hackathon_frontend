import {
  FileUp,
  Brain,
  Target,
  Mic,
  Gauge,
  FileText,
  LayoutDashboard,
  Award,
  Sparkles,
  Download,
  AudioLines,
  CheckCircle2,
  BarChart3,
} from "lucide-react";

const workflowData = [
  {
    id: 1,
    step: "01",
    title: "Resume Upload",
    description:
      "Candidate submits their resume through the portal to start the recruitment process.",

    icon: FileUp,
    tag: "PDF / DOCX",
    tagIcon: FileText,

    color: {
      primary: "#7C3AED",
      secondary: "#A78BFA",
      glow: "rgba(124,58,237,.45)",
      bg: "rgba(124,58,237,.10)",
      border: "rgba(124,58,237,.30)",
      text: "#C4B5FD",
    },
  },

  {
    id: 2,
    step: "02",
    title: "AI Resume Parsing",
    description:
      "Gemini AI extracts skills, experience, education, projects and certifications automatically.",

    icon: Brain,
    tag: "Gemini AI",
    tagIcon: Sparkles,

    color: {
      primary: "#2563EB",
      secondary: "#60A5FA",
      glow: "rgba(37,99,235,.45)",
      bg: "rgba(37,99,235,.10)",
      border: "rgba(37,99,235,.30)",
      text: "#93C5FD",
    },
  },

  {
    id: 3,
    step: "03",
    title: "ATS Match Score",
    description:
      "Resume is matched against the Job Description and receives an AI-powered ATS score.",

    icon: Target,
    tag: "ATS Analysis",
    tagIcon: BarChart3,

    color: {
      primary: "#0F766E",
      secondary: "#2DD4BF",
      glow: "rgba(15,118,110,.45)",
      bg: "rgba(15,118,110,.10)",
      border: "rgba(15,118,110,.30)",
      text: "#5EEAD4",
    },
  },

  {
    id: 4,
    step: "04",
    title: "AI Voice Interview",
    description:
      "RecruitIQ AI conducts HR and Technical interviews using intelligent voice conversations.",

    icon: Mic,
    tag: "Voice AI",
    tagIcon: AudioLines,

    color: {
      primary: "#C026D3",
      secondary: "#E879F9",
      glow: "rgba(192,38,211,.45)",
      bg: "rgba(192,38,211,.10)",
      border: "rgba(192,38,211,.30)",
      text: "#F0ABFC",
    },
  },

  {
    id: 5,
    step: "05",
    title: "AI Evaluation",
    description:
      "Communication, confidence, technical ability and behavioural skills are evaluated.",

    icon: Gauge,
    tag: "AI Analysis",
    tagIcon: BarChart3,

    color: {
      primary: "#EA580C",
      secondary: "#FB923C",
      glow: "rgba(234,88,12,.45)",
      bg: "rgba(234,88,12,.10)",
      border: "rgba(234,88,12,.30)",
      text: "#FDBA74",
    },
  },

  {
    id: 6,
    step: "06",
    title: "PDF Report",
    description:
      "Generate a professional AI report containing ATS score, interview analysis and recommendations.",

    icon: FileText,
    tag: "Download PDF",
    tagIcon: Download,

    color: {
      primary: "#16A34A",
      secondary: "#4ADE80",
      glow: "rgba(22,163,74,.45)",
      bg: "rgba(22,163,74,.10)",
      border: "rgba(22,163,74,.30)",
      text: "#86EFAC",
    },
  },

  {
    id: 7,
    step: "07",
    title: "Recruiter Dashboard",
    description:
      "Recruiters review reports, interview transcripts, AI insights and candidate analytics.",

    icon: LayoutDashboard,
    tag: "Dashboard",
    tagIcon: BarChart3,

    color: {
      primary: "#2563EB",
      secondary: "#60A5FA",
      glow: "rgba(37,99,235,.45)",
      bg: "rgba(37,99,235,.10)",
      border: "rgba(37,99,235,.30)",
      text: "#93C5FD",
    },
  },

  {
    id: 8,
    step: "08",
    title: "Hiring Recommendation",
    description:
      "RecruitIQ AI recommends Hire, Hold or Reject using complete AI evaluation results.",

    icon: Award,
    tag: "AI Decision",
    tagIcon: CheckCircle2,

    color: {
      primary: "#7C3AED",
      secondary: "#A78BFA",
      glow: "rgba(124,58,237,.45)",
      bg: "rgba(124,58,237,.10)",
      border: "rgba(124,58,237,.30)",
      text: "#C4B5FD",
    },
  },
];

export default workflowData;