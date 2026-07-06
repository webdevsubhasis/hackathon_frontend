import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

export default function Navbar() {

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {

    logout();

    navigate("/");

    closeMenu();

  };

  return (
    <>
      {/* ===========================
              Navbar
      =========================== */}

      <motion.nav
        initial={{
          y: -80,
        }}
        animate={{
          y: 0,
        }}
        transition={{
          duration: 0.45,
        }}
        className="
          fixed
          top-0
          left-0
          right-0
          z-50
          border-b
          border-white/10
          bg-[#08111F]/80
          backdrop-blur-2xl
        "
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          <div className="h-20 flex items-center justify-between">

            {/* Logo */}

            <Logo />

            {/* Desktop */}

            <DesktopMenu
              user={user}
              location={location}
              handleLogout={handleLogout}
            />

            {/* Mobile Button */}

            <button
              onClick={() => setMenuOpen(true)}
              className="
                lg:hidden
                w-11
                h-11
                rounded-xl
                bg-white/5
                border
                border-white/10
                flex
                items-center
                justify-center
                hover:border-violet-500/40
                transition-all
              "
            >
              <Menu
                size={24}
                className="text-white"
              />
            </button>

          </div>

        </div>

      </motion.nav>

      {/* Spacer to offset fixed navbar height (prevents content from
          hiding underneath it, since fixed elements are removed from
          normal document flow) */}

      <div className="h-20" />

      {/* Mobile Drawer */}

      <MobileMenu
        open={menuOpen}
        closeMenu={closeMenu}
        user={user}
        handleLogout={handleLogout}
      />

    </>
  );

}