"use client";

import { useEffect } from "react";
import { Reveal } from "@/components/home/primitives";

type Post = { url: string; sub: string; title: string };

const posts: Post[] = [
  { url: "https://www.reddit.com/r/JEE/comments/1sqrgjp/alpha_jee_i_wasnt_aware_of_your_game/", sub: "r/JEE", title: "Alpha JEE — I wasn't aware of your game" },
  { url: "https://www.reddit.com/r/JEENEETards/comments/1srehbp/official_alphajee_predictor_postmortem_what_went/", sub: "r/JEENEETards", title: "Official AlphaJEE predictor postmortem — what went right" },
  { url: "https://www.reddit.com/r/JEENEETards/comments/1sk4m6a/i_wonder_who_he_is_talking_about/", sub: "r/JEENEETards", title: "I wonder who he is talking about" },
  { url: "https://www.reddit.com/r/JEENEETards/comments/1siekc4/in_house_response_sheet_checker_data_based/", sub: "r/JEENEETards", title: "In-house response sheet checker, data based" },
  { url: "https://www.reddit.com/r/JEENEETards/comments/1ryur8z/alphajee_april_update/", sub: "r/JEENEETards", title: "AlphaJEE April update" },
  { url: "https://www.reddit.com/r/JEENEETards/comments/1r6yinf/prediction_so_goated_even_nta_had_to_match_it/", sub: "r/JEENEETards", title: "Prediction so goated even NTA had to match it" },
  { url: "https://www.reddit.com/r/JEENEETards/comments/1r0z90s/closure_of_project_due_to_crossing_limits/", sub: "r/JEENEETards", title: "Closure of project due to crossing limits" },
  { url: "https://www.reddit.com/r/collegeindia/comments/1ua2xcu/the_stier_jee_paths_nobody_on_this_sub_talks_about/", sub: "r/collegeindia", title: "The S-tier JEE paths nobody on this sub talks about" },
  { url: "https://www.reddit.com/r/JEENEETards/comments/1tsu6a1/added_every_major_counselling_to_oviguide_so_you/", sub: "r/JEENEETards", title: "Added every major counselling to OviGuide" },
  { url: "https://www.reddit.com/r/BITSAT/comments/1to4d3f/i_had_no_idea_bits_msc_courses_even_existed/", sub: "r/BITSAT", title: "I had no idea BITS MSc courses even existed" },
  { url: "https://www.reddit.com/r/comedk/comments/1tn7uzn/i_completely_messed_up_my_own_comedk_counselling/", sub: "r/comedk", title: "I completely messed up my own COMEDK counselling" },
  { url: "https://www.reddit.com/r/collegeindia/comments/1tbzn4k/i_completely_fucked_up_my_own_college_counselling/", sub: "r/collegeindia", title: "I messed up my own college counselling" },
  { url: "https://www.reddit.com/r/Btechtards/comments/1tb4fky/i_completely_fucked_up_my_own_college_counselling/", sub: "r/Btechtards", title: "I messed up my own college counselling" },
  { url: "https://www.reddit.com/r/NITIAN/comments/1tb2d2a/i_completely_fucked_up_my_own_college_counselling/", sub: "r/NITIAN", title: "I messed up my own college counselling" },
];

function RedditIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12c-.69 0-1.25.563-1.25 1.25 0 .687.56 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  );
}

export default function RedditWall() {
  useEffect(() => {
    // Reddit's widget renders the embeds (with live upvotes/comments) in the
    // visitor's browser. Re-injected each mount so it re-scans the blockquotes.
    const s = document.createElement("script");
    s.src = "https://embed.reddit.com/widgets.js";
    s.async = true;
    s.charset = "UTF-8";
    document.body.appendChild(s);
    return () => {
      try { document.body.removeChild(s); } catch {}
    };
  }, []);

  return (
    <section id="featured" className="relative max-w-[1400px] mx-auto px-5 sm:px-8 py-24">
      <Reveal className="mb-12 max-w-2xl">
        <p className="font-akkurat text-[11px] uppercase tracking-[0.25em] text-[#c8522a] mb-4">
          Featured on Reddit
        </p>
        <h2 className="font-season text-[clamp(28px,3.6vw,50px)] leading-[1] text-[var(--ovi-cream)]">
          What the community is saying.
        </h2>
        <p className="font-season text-[var(--ovi-cream-dim)] text-lg leading-relaxed mt-4">
          Real threads from across the JEE, NEET and counselling communities — live
          upvotes and comments, straight from Reddit.
        </p>
      </Reveal>

      <div className="columns-1 md:columns-2 xl:columns-3 gap-5 [&>*]:mb-5">
        {posts.map((p) => (
          <div key={p.url} className="break-inside-avoid">
            {/* Reddit's widgets.js replaces this blockquote with a live card.
                Until it loads (or if blocked), this on-brand fallback shows. */}
            <blockquote
              className="reddit-embed-bq glass rounded-2xl p-6 block"
              data-embed-height="316"
              data-embed-theme="light"
            >
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <span className="flex items-center gap-2 mb-3">
                  <RedditIcon className="w-5 h-5 text-[#ff4500]" />
                  <span className="font-akkurat text-[9px] uppercase tracking-[0.16em] text-[var(--ovi-muted)]">
                    {p.sub}
                  </span>
                </span>
                <span className="font-season text-lg text-[var(--ovi-cream)] leading-snug group-hover:text-[#c8522a] transition-colors block">
                  {p.title}
                </span>
                <span className="mt-4 inline-flex items-center gap-1.5 font-akkurat text-[10px] uppercase tracking-[0.2em] text-[var(--ovi-muted)]">
                  View thread on Reddit ↗
                </span>
              </a>
            </blockquote>
          </div>
        ))}
      </div>
    </section>
  );
}
