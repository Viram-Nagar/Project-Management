import React from "react";
import { useNavigate } from "react-router-dom";

export default function ShowcaseSection() {
  const navigate = useNavigate();
  return (
    <section className="bg-surface py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="text-center lg:text-left max-w-lg space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary leading-snug">
            Visualize progress <br className="hidden sm:block" />
            and collaborate in real-time.
          </h2>
          <p className="text-text-secondary text-base sm:text-lg">
            Taskation helps you see every project at a glance. Track tasks,
            monitor members, and deliver results efficiently — all from one
            modern workspace.
          </p>
          <button
            className="bg-primary text-white px-6 py-3 rounded-xl text-base font-medium hover:bg-primary/90 transition"
            onClick={() => navigate("/signup")}
          >
            Explore Dashboard
          </button>
        </div>

        {/* Right Dashboard Preview */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative rounded-2xl shadow-2xl overflow-hidden border border-border bg-white">
            <img
              src="/Screenshot (49).png" // replace with your actual dashboard image
              alt="Taskation Dashboard"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
