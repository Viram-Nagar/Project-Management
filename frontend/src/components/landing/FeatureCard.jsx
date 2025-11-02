import React from "react";

export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-surface border border-border rounded-2xl shadow-sm p-6 text-center hover:shadow-md hover:border-primary/30 transition-all">
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon size={26} />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
