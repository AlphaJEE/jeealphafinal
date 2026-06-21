"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Video {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: { high?: { url: string }; medium?: { url: string } };
    channelTitle: string;
  };
}

export default function UpdatesPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const channelId = "UCGWRq8lhJHP_wmp5ha1fFvA";
  const youtubeUrl = `https://youtube.com/@dizzyattitude?si=mIpcfE12JgGrzzPW${channelId}`;

  const embeddedVideos = [
    {
      id: "otClIg5J04Q",
      title:
        "How dizzy got kicked out of his own company . A brief on the Meritverse/AlphaJEE coup",
    },
    {
      id: "aAdVgj3xWlg",
      title: "MOST ACCURATE PERCENTILE prediction record!!",
    },
    {
      id: "MYaxP3yNwx0",
      title:
        "JEE MAINS 2026 PROVISIONAL RESULTS 🔥🔥🔥 BASED ON JEE ALPHA PREDICTOR with explaination",
    },
    {
      id: "uhuWkadYXaY&t=332s",
      title: "BLATANT COPYING 🤬🤬🤬. Marks vs Percentile Calculator updates!",
    },
    {
      id: "9gDv8t1xpfY",
      title:
        "RESULT KAB AAYEGA yehh bhi Tera bhai predict karega 🔥🔥🔥 (just kidding new update)",
    },
    {
      id: "BdWCRKOB_N8",
      title:
        "EE 2026 APRIL PROVISIONAL RESULTS 🔥🔥 | BITSAT Marks Updates | STOP MILKING US FOR VIEWS",
    },
  ];

  return (
    <div className="bg-[#f9f9f0] dark:bg-[#0f0e0b] min-h-screen">
      {/* Header */}
      <div className="bg-[#d5fad3] pt-28 pb-16 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-code-label text-[#3d3b34] uppercase tracking-widest mb-3">
                YouTube
              </p>
              <h1 className="text-display-large text-[#0f0e0b]">
                Updates & Videos
              </h1>
              <p className="text-body-large text-[#3d3b34] mt-3">
                Tutorials, analysis sessions, and announcements from the
                AlphaJEE team.
              </p>
            </div>
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-shrink-0"
              style={{
                backgroundColor: "#ff0000",
                color: "#ffffff",
                borderColor: "#ff0000",
              }}
            >
              Subscribe on YouTube ↗
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-16">
        {/* Subscribe CTA banner */}
        <div className="bg-[#0f0e0b] p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#ff0000] flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
              </svg>
            </div>
            <div>
              <p className="text-code-label text-[#f9f9f0] uppercase tracking-widest">
                AlphaJEE on YouTube
              </p>
              <p className="text-body-small text-[#9d937c] mt-1">
                Data analysis, predictor walkthroughs, and JEE strategy
              </p>
            </div>
          </div>
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex-shrink-0"
            style={{
              backgroundColor: "#ff0000",
              color: "#ffffff",
              borderColor: "#ff0000",
              padding: "12px 24px",
            }}
          >
            Subscribe Now
          </a>
        </div>

        {/* Video grid */}
        <div>
          <p className="text-code-label text-[#9d937c] uppercase tracking-widest mb-8">
            Recent Videos
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-[#0f0e0b]/10 dark:bg-[#f9f9f0]/10">
            {embeddedVideos.map((video, i) => (
              <a
                key={i}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-[#f9f9f0] dark:bg-[#0f0e0b] hover:bg-[#f0efe6] dark:hover:bg-[#21201c] transition-colors"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-[#21201c]">
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes("mqdefault")) {
                        target.src = `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`;
                      } else {
                        target.style.display = "none";
                      }
                    }}
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#0f0e0b]/40">
                    <div className="w-14 h-14 bg-[#ff0000] flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white ml-1"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-subheading text-[#0f0e0b] dark:text-[#f9f9f0] leading-snug mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-code-micro text-[#9d937c] uppercase tracking-widest">
                    AlphaJEE Official
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* More videos CTA */}
        <div className="mt-16 text-center">
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
            style={{ backgroundColor: "#0f0e0b", color: "#f9f9f0" }}
          >
            Watch All Videos on YouTube →
          </a>
        </div>
      </div>
    </div>
  );
}
