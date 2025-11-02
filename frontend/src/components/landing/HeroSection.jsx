import React from "react";
import { Play } from "lucide-react"; // if you don't want even lucide, I’ll remove it next
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-surface to-white">
      {/* container */}
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-6 py-20 lg:py-28 gap-12">
        {/* Left content */}
        <div className="text-center lg:text-left space-y-6 max-w-xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary leading-tight">
            Manage Projects. <br className="hidden sm:block" />
            <span className="text-primary">Empower Teams.</span> Deliver Faster.
          </h1>

          <p className="text-text-secondary text-base sm:text-lg max-w-md mx-auto lg:mx-0">
            Taskation helps teams plan, collaborate, and track progress in one
            simple workspace.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <button
              className="bg-primary text-white px-6 py-3 rounded-xl text-base font-medium hover:bg-primary/90 transition"
              onClick={() => navigate("/signup")}
            >
              Get Started Free
            </button>
            {/* 
              <button className="flex items-center gap-2 border border-border px-6 py-3 rounded-xl text-base font-medium text-text-primary hover:bg-surface transition">
                <Play size={18} className="text-primary" />
                Watch Demo
              </button> */}
          </div>
        </div>

        {/* Right image */}
        <div className="relative w-full lg:w-1/2 flex justify-center">
          <div className="relative bg-surface rounded-2xl shadow-xl overflow-hidden max-w-2xl">
            <img
              src="/Screenshot (48).png" // replace with your real image path
              alt="Taskation Dashboard Preview"
              className="w-full h-auto object-cover"
            />
            {/* subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Decorative blurred backgrounds */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
    </section>
  );
}
