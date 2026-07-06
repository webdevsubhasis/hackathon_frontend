import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ChevronRight,
  User,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import navLinks from "./NavLinks";

export default function MobileMenu({
  open,
  closeMenu,
  user,
  handleLogout,
}) {
  return (
    <AnimatePresence>

      {open && (
        <>
          {/* ================= Overlay ================= */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeMenu}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md lg:hidden"
          />

          {/* ================= Drawer ================= */}

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 30,
            }}
            className="
              fixed
              top-0
              right-0
              h-screen
              w-[340px]
              max-w-[92%]
              bg-[#08111F]
              border-l
              border-white/10
              shadow-2xl
              z-50
              lg:hidden
              flex
              flex-col
            "
          >

            {/* ================= Header ================= */}

            <div className="flex items-center justify-between p-6 border-b border-white/10">

              <div>

                <h2 className="text-xl font-bold text-white">
                  Recruit
                  <span className="gradient-text">
                    IQ
                  </span>{" "}
                  AI
                </h2>

                <p className="text-xs text-slate-400">
                  AI Recruitment Platform
                </p>

              </div>

              <button
                onClick={closeMenu}
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-white/5
                  hover:bg-white/10
                  transition
                  flex
                  items-center
                  justify-center
                "
              >
                <X
                  size={22}
                  className="text-white"
                />
              </button>

            </div>

            {/* ================= Navigation ================= */}

            <div className="flex-1 overflow-y-auto p-6">

              <div className="space-y-3">

                {navLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="
                      flex
                      items-center
                      justify-between
                      rounded-2xl
                      px-5
                      py-4
                      bg-white/5
                      border
                      border-white/10
                      hover:border-violet-500/50
                      hover:bg-violet-500/10
                      transition-all
                      text-white
                    "
                  >
                    <span>{item.title}</span>

                    <ChevronRight size={18} />
                  </a>
                ))}

              </div>

              {/* ================= Auth Buttons ================= */}

              <div className="mt-10 space-y-3">

                {!user && (
                  <>
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="
                        flex
                        items-center
                        justify-between
                        rounded-2xl
                        px-5
                        py-4
                        bg-white/5
                        border
                        border-white/10
                        text-white
                        hover:bg-white/10
                        transition-all
                      "
                    >
                      Recruiter Portal

                      <ChevronRight size={18} />
                    </Link>

                    <Link
                      to="/register"
                      onClick={closeMenu}
                      className="
                        flex
                        items-center
                        justify-between
                        rounded-2xl
                        px-5
                        py-4
                        bg-gradient-to-r
                        from-violet-600
                        to-indigo-600
                        text-white
                        shadow-lg
                      "
                    >
                      Get Started

                      <ChevronRight size={18} />
                    </Link>
                  </>
                )}

                {user?.role === "candidate" && (
                  <>
                    <Link
                      to="/candidate/dashboard"
                      onClick={closeMenu}
                      className="mobile-nav-item"
                    >
                      <div className="flex items-center gap-3">
                        <User size={18} />
                        <span>My Profile</span>
                      </div>

                      <ChevronRight size={18} />
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="mobile-nav-item w-full"
                    >
                      <div className="flex items-center gap-3">
                        <LogOut size={18} />
                        <span>Logout</span>
                      </div>

                      <ChevronRight size={18} />
                    </button>
                  </>
                )}

                {user?.role === "recruiter" && (
                  <>
                    <Link
                      to="/recruiter/dashboard"
                      onClick={closeMenu}
                      className="mobile-nav-item"
                    >
                      <div className="flex items-center gap-3">
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                      </div>

                      <ChevronRight size={18} />
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="mobile-nav-item w-full"
                    >
                      <div className="flex items-center gap-3">
                        <LogOut size={18} />
                        <span>Logout</span>
                      </div>

                      <ChevronRight size={18} />
                    </button>
                  </>
                )}

              </div>

            </div>

            {/* ================= Footer ================= */}

            <div className="border-t border-white/10 p-6">

              <h3 className="text-white font-semibold">
                RecruitIQ AI
              </h3>

              <p className="text-xs text-slate-500 mt-2">
                AI-Powered Recruitment Platform
              </p>

              <div className="mt-5 flex flex-wrap gap-2">

                <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 text-xs">
                  React
                </span>

                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-300 text-xs">
                  Node.js
                </span>

                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs">
                  MongoDB
                </span>

                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs">
                  Gemini AI
                </span>

              </div>

            </div>

          </motion.aside>
        </>
      )}

    </AnimatePresence>
  );
}