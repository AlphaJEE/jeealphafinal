import type { Metadata } from "next";
import SmoothScroll from "@/components/home/SmoothScroll";
import Ecosystem from "@/components/home/Ecosystem";
import RedditWall from "@/components/oviqo/RedditWall";

export const metadata: Metadata = {
  title: "The Oviqo Ecosystem — AlphaJEE",
  description:
    "Four products, one mission. JEE Predictor, OviGuide, OviBattle and NEET Predictor — plus what the community is saying about us on Reddit.",
  alternates: { canonical: "/oviqo" },
};

export default function OviqoPage() {
  return (
    <div className="home-premium relative min-h-screen overflow-hidden pt-6">
      <SmoothScroll />
      <Ecosystem />
      <RedditWall />
    </div>
  );
}
