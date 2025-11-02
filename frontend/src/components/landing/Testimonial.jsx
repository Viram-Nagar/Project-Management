import React from "react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Taskation transformed the way our team collaborates. Project tracking feels effortless, and everyone stays aligned.",
      name: "Aarav Mehta",
      role: "Team Lead, InnovateHub",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    {
      quote:
        "We love the simplicity! Creating and managing tasks is so intuitive — it keeps our workflow clean and focused.",
      name: "Priya Sharma",
      role: "Product Manager, DevCraft",
      avatar: "https://i.pravatar.cc/100?img=32",
    },
    {
      quote:
        "Inviting members and managing roles has never been easier. Taskation made our project operations more efficient.",
      name: "Rohit Kumar",
      role: "Operations Head, NextGenTech",
      avatar: "https://i.pravatar.cc/100?img=45",
    },
  ];

  return (
    <section className="bg-primary/5 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
          Trusted by teams to deliver better, faster.
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto mb-12">
          Real feedback from teams that rely on Taskation every day to manage
          projects and collaborate efficiently.
        </p>

        {/* Grid of Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white border border-border rounded-2xl shadow-sm p-6 text-left hover:shadow-md transition"
            >
              <blockquote className="text-text-secondary italic mb-6">
                “{t.quote}”
              </blockquote>
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full border border-border object-cover"
                />
                <div>
                  <h4 className="text-text-primary font-semibold text-base">
                    {t.name}
                  </h4>
                  <p className="text-text-secondary text-sm">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
