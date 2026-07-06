import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  LogOut,
  ArrowRight,
} from "lucide-react";

import navLinks from "./NavLinks";

export default function DesktopMenu({
  user,
  location,
  handleLogout,
}) {
  const isActive = (href) => {
    if (!location.hash) {
      return href === "#home";
    }

    return location.hash === href;
  };

  return (
    <div className="hidden lg:flex items-center justify-between flex-1 ml-12">

      {/* =========================
            Navigation
      ========================= */}

      <div className="flex items-center gap-8">

        {navLinks.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`relative text-sm font-medium transition-all duration-300

            ${
              isActive(item.href)
                ? "text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {item.title}

            {isActive(item.href) && (
              <span
                className="
                  absolute
                  left-0
                  -bottom-2
                  w-full
                  h-[2px]
                  rounded-full
                  bg-gradient-to-r
                  from-violet-500
                  to-cyan-400
                "
              />
            )}
          </a>
        ))}

      </div>

      {/* =========================
            Right Buttons
      ========================= */}

      <div className="flex items-center gap-3">

        {!user && (
          <>
            <Link
              to="/login"
              className="
                px-5
                py-2.5
                rounded-xl
                border
                border-white/10
                bg-white/5
                hover:bg-white/10
                text-white
                transition-all
              "
            >
              Recruiter Portal
            </Link>

            <Link
              to="/register"
              className="
                flex
                items-center
                gap-2
                px-5
                py-2.5
                rounded-xl
                bg-gradient-to-r
                from-violet-600
                to-indigo-600
                hover:scale-105
                transition-all
                text-white
                shadow-lg
              "
            >
              Get Started

              <ArrowRight size={16} />
            </Link>
          </>
        )}

        {user?.role === "candidate" && (
          <>
            <Link
              to="/candidate/dashboard"
              className="
                flex
                items-center
                gap-2
                px-5
                py-2.5
                rounded-xl
                bg-white/5
                border
                border-white/10
                text-white
                hover:bg-white/10
                transition-all
              "
            >
              <User size={16} />

              My Profile
            </Link>

            <button
              onClick={handleLogout}
              className="
                flex
                items-center
                gap-2
                px-5
                py-2.5
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                text-red-300
                hover:bg-red-500/20
                transition-all
              "
            >
              <LogOut size={16} />

              Logout
            </button>
          </>
        )}

        {user?.role === "recruiter" && (
          <>
            <Link
              to="/recruiter/dashboard"
              className="
                flex
                items-center
                gap-2
                px-5
                py-2.5
                rounded-xl
                bg-gradient-to-r
                from-violet-600
                to-indigo-600
                text-white
                hover:scale-105
                transition-all
              "
            >
              <LayoutDashboard size={16} />

              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="
                flex
                items-center
                gap-2
                px-5
                py-2.5
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                text-red-300
                hover:bg-red-500/20
                transition-all
              "
            >
              <LogOut size={16} />

              Logout
            </button>
          </>
        )}

      </div>

    </div>
  );
}