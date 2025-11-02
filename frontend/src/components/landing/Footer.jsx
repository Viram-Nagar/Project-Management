import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
            T
          </div>
          <span className="text-lg font-semibold text-text-primary">
            Taskation
          </span>
        </div>

        {/* Links */}
        <nav className="flex space-x-6 text-text-secondary text-sm">
          <a href="#about" className="hover:text-primary transition">
            About
          </a>
          <a href="#contact" className="hover:text-primary transition">
            Contact
          </a>
          <a href="#privacy" className="hover:text-primary transition">
            Privacy
          </a>
        </nav>

        {/* Copyright */}
        <p className="text-text-secondary text-sm text-center sm:text-right">
          © 2025 Taskation. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
