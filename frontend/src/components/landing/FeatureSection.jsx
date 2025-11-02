import React from "react";
import { FolderKanban, CheckCircle2, Users, Shield } from "lucide-react";
import FeatureCard from "./FeatureCard";

export default function FeaturesSection() {
  const features = [
    {
      icon: FolderKanban,
      title: "Project Management",
      description:
        "Create, update, and organize all your team projects in one clean dashboard.",
    },
    {
      icon: CheckCircle2,
      title: "Task Tracking",
      description:
        "Stay on top of your tasks — assign, update status, and track progress easily.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Invite members, manage teams, and collaborate seamlessly within each project.",
    },
    {
      icon: Shield,
      title: "Role Management",
      description:
        "Control access by assigning admin or member roles for better team structure.",
    },
  ];

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
          Everything you need to manage your team
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto mb-12">
          Taskation provides all the essential tools to help you plan, execute,
          and deliver projects with confidence.
        </p>

        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
