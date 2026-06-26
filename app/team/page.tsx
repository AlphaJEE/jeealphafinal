import type { Metadata } from "next";
import SmoothScroll from "@/components/home/SmoothScroll";
import Team from "@/components/home/Team";

export const metadata: Metadata = {
  title: "The Builders — AlphaJEE by OviGuide",
  description:
    "Meet the team building AlphaJEE and the Oviqo ecosystem — the people behind the predictors, OviGuide, and OviBattle.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <div className="home-premium relative min-h-screen overflow-hidden pt-6">
      <SmoothScroll />
      <Team />
    </div>
  );
}
