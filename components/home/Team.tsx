"use client";

import { SpotlightCard, Reveal } from "./primitives";

type Member = {
  name: string;
  role: string;
  tags: string[];
  bio: string;
  accent: string;
  /** Drop a photo in /public/team and set e.g. "/team/gunveer.jpg" */
  image?: string;
  linkedin?: string;
};

const team: Member[] = [
  {
    name: "Mohit Pratap Singh Rathore",
    role: "Co-Founder & CEO",
    tags: ["CEO", "HDYUAI", "Operations"],
    bio: "Co-Founder at HDYUAI | Head of Operations at CollabClan | Student at Ramaiah Institute of Technology. Drives strategic growth and operational excellence across the AlphaJEE ecosystem.",
    accent: "#badbee",
    image: "/team/mohit.jpg",
    linkedin: "https://www.linkedin.com/in/mohit-pratap-singh-rathore-428b0b27a/",
  },
  {
    name: "Gunveer Singh Kalsi",
    role: "Co-Founder & CTO",
    tags: ["CTO", "OviGuide", "Systems"],
    bio: "Co-Founder & CTO at OviGuide | Renewable Energy Systems specialist. Architecting the technical backbone of the entire platform — from prediction engines to real-time battle arenas.",
    accent: "#2a6b4a",
    image: "/team/gunveer.jpg",
    linkedin: "https://www.linkedin.com/in/gunveer-kalsi-17789a334/",
  },
  {
    name: "Sriharsha Meduri",
    role: "Head of Engineering",
    tags: ["AI-ML", "Full Stack", "GDGoC"],
    bio: "Head of Engineering at OviGuide | Research Intern at IIM Shillong | Co-Lead at GDGoC | AI-ML & Full Stack Developer at Andhra University. Building intelligent systems that scale.",
    accent: "#d5fad3",
    image: "/team/sriharsha.jpg",
    linkedin: "https://www.linkedin.com/in/sriharsha-meduri/",
  },
  {
    name: "Akashdeep Singh",
    role: "Lead Developer",
    tags: ["Salesforce", "7x Certified", "Trailblazer"],
    bio: "Salesforce Developer and Omnistudio specialist. 7x Certified, Trailblazer Hoodie Winner. Building free tools that empower every JEE aspirant.",
    accent: "#c8522a",
    image: "/team/akashdeep.jpg",
    linkedin: "https://www.linkedin.com/in/akashdeep-singh-81885227b/",
  },
];

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.73v20.53C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.73C24 .78 23.2 0 22.22 0z" />
    </svg>
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] || "") + (parts[parts.length - 1]?.[0] || "")).toUpperCase();
}

export default function Team() {
  return (
    <section id="team" className="relative max-w-[1400px] mx-auto px-5 sm:px-8 py-24">
      <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
        <div>
          <p className="font-akkurat text-[11px] uppercase tracking-[0.25em] text-[#9d937c] mb-4">
            Core Team
          </p>
          <h2 className="font-season text-[clamp(28px,3.6vw,50px)] leading-[1] text-[#0f0e0b]">
            The Builders.
          </h2>
        </div>
        <span className="font-akkurat text-[11px] uppercase tracking-[0.2em] text-[#9d937c]">
          {team.length} Members
        </span>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(16px,1.6vw,22px)]">
        {team.map((m, i) => (
          <Reveal key={m.name} delay={(i % 3) * 90}>
            <SpotlightCard className="glass rounded-3xl overflow-hidden h-full flex flex-col" tilt={false}>
              {/* Photo / avatar */}
              <div
                className="relative aspect-[4/5] flex items-center justify-center overflow-hidden"
                style={{ background: `linear-gradient(160deg, ${m.accent}, ${m.accent}55)` }}
              >
                {/* initials sit behind; the photo covers them once it loads */}
                <span className="font-season text-[clamp(56px,7vw,84px)] font-semibold text-[#0f0e0b]/55 select-none">
                  {initials(m.name)}
                </span>
                {m.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={m.image}
                    alt={m.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/15 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-season text-2xl text-[#0f0e0b] leading-tight">{m.name}</h3>
                <p className="font-akkurat text-[10px] uppercase tracking-[0.18em] text-[#9d937c] mt-1.5">
                  {m.role}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {m.tags.map((t) => (
                    <span
                      key={t}
                      className="font-akkurat text-[9px] uppercase tracking-[0.12em] text-[#3d3b34] bg-[#0f0e0b]/[0.05] border border-[#0f0e0b]/10 rounded-full px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p className="font-season text-[15px] text-[#3d3b34] leading-relaxed mt-4">
                  {m.bio}
                </p>

                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 font-akkurat text-[10px] uppercase tracking-[0.2em] text-[#9d937c] hover:text-[#0f0e0b] transition-colors"
                  >
                    <LinkedInIcon className="w-4 h-4" />
                    LinkedIn
                  </a>
                )}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
