import React from "react";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <>
      <section className="relative overflow-hidden py-20 px-6 bg-primary text-white">
        {/* optional soft overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/90 to-accent/70 opacity-90" />

        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold leading-snug">
            Start managing your projects smarter — for free.
          </h2>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Empower your team, organize workflows, and deliver results faster
            with Taskation. No setup needed — just sign up and start building
            together.
          </p>

          <button
            className="bg-white text-primary font-medium px-8 py-3 rounded-xl text-base hover:bg-white/90 transition"
            onClick={() => navigate("/signup")}
          >
            Get Started Now
          </button>
        </div>

        {/* Soft blur background shapes for depth */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-accent/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 blur-3xl rounded-full" />
      </section>
    </>
  );
}
