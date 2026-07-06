import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 group select-none"
    >
      {/* Logo Icon */}

      <motion.div
        whileHover={{
          rotate: 15,
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.95,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          relative
          w-11
          h-11
          rounded-2xl
          flex
          items-center
          justify-center
          bg-gradient-to-br
          from-violet-500
          via-indigo-500
          to-cyan-500
          shadow-[0_0_35px_rgba(99,102,241,.45)]
          overflow-hidden
        "
      >
        {/* Glow */}

        <div className="absolute inset-0 bg-white/10 blur-xl" />

        <Sparkles
          size={20}
          className="relative z-10 text-white"
        />
      </motion.div>

      {/* Text */}

      <div className="leading-tight">

        <motion.h1
          whileHover={{
            x: 2,
          }}
          className="
            text-xl
            font-extrabold
            tracking-tight
            text-white
          "
        >
          Recruit
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            IQ
          </span>{" "}
          AI
        </motion.h1>

        <p className="text-[11px] text-slate-400 font-medium tracking-wide">
          AI Recruitment Platform
        </p>

      </div>
    </Link>
  );
}