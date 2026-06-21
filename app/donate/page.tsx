"use client";

import { useState } from "react";
import Script from "next/script";
import { useToast } from "@/components/ToastProvider";

const tiers = [
  {
    emoji: "🥤",
    amount: 20,
    name: "Cold Drink",
    desc: "Instant refreshment to cool down after a heated argument with a redditor.",
    lore: "Specifically that freezing cold bottle from the corner shop after a long afternoon lecture.",
    color: "#badbee",
    favor: null,
  },
  {
    emoji: "🥟",
    amount: 50,
    name: "Momo Plate",
    desc: "A celebratory plate of momos to keep the spirits high after a successful deployment.",
    lore: "Steamed momos with that spicy red chutney — the only thing that keeps me sane after a Physics Mock Test.",
    color: "#f97316",
    favor: "Personalized Thank-You Note",
  },
  {
    emoji: "🍫",
    amount: 80,
    name: "Dark Chocolate",
    desc: "The ultimate midnight brain fuel for complex mathematical modeling.",
    lore: "75% Cocoa. It's bitter, just like my mock test analysis, but it keeps the brain sharp for 4 AM stuff.",
    color: "#a855f7",
    favor: "Name on the Wall of Legends",
  },
  {
    emoji: "🌐",
    amount: 120,
    name: "Domain Cost",
    desc: "I purchased this domain exactly for you guys so we have a clean, stable home for Results.",
    lore: "A clean URL makes a huge difference in credibility. This ensures AlphaJEE stays live all year.",
    color: "#f97316",
    favor: "Technical Discussion / Website Mention",
  },
  {
    emoji: "🍲",
    amount: 250,
    name: "Keep it Yummy!",
    desc: "Treat the owner to a meal of your choice as a thanks for helping you predict your results!",
    lore: "I love exploring different vegetarian food — it keeps the Study/Code sessions fresh!",
    color: "#d5fad3",
    favor: "You pick a Veg meal & restaurant for me",
  },
  {
    emoji: "💾",
    amount: 400,
    name: "The Broken Keyboard",
    desc: "I dropped my keyboard off my server PC and was looking to buy a nice one.",
    lore: "The only close device I have always missed losing.",
    color: "#eab308",
    favor:
      "Request Features in Priority + Dedicated Page with any useful tool (within limits)",
  },
  {
    emoji: "🎬",
    amount: 1000,
    name: "SFW Dare Video",
    desc: "I will record a video doing a SFW doable dare of your choice (within reason!) on YouTube.",
    lore: "I'll wear a weird hat or speak in an accent. Nothing that'll get me banned, just pure student humor.",
    color: "#a855f7",
    favor: "Legendary Video Credit",
  },
];

export default function DonatePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<(typeof tiers)[0] | null>(
    null,
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [handle, setHandle] = useState("");
  const [paying, setPaying] = useState(false);
  const { showToast } = useToast();

  const openModal = (tier: (typeof tiers)[0]) => {
    setSelectedTier(tier);
    setModalOpen(true);
  };

  const triggerPayment = async () => {
    if (!name.trim() || !email.trim()) {
      showToast("Missing Info", "Please fill in your name and email.", "error");
      return;
    }

    setPaying(true);
    try {
      const resp = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: selectedTier!.amount,
          name,
          email,
          handle,
        }),
      });
      const data = await resp.json();

      if (!resp.ok || !data.id) {
        const msg = data?.error || data?.message || "Order creation failed";
        showToast("Payment Error", msg, "error");
        setPaying(false);
        return;
      }

      const Razorpay = (window as any).Razorpay;
      if (!Razorpay) {
        showToast(
          "Razorpay Error",
          "Payment library not loaded. Please refresh.",
          "error",
        );
        setPaying(false);
        return;
      }

      const rzp = new Razorpay({
        key: data.key_id,
        amount: data.amount,
        currency: "INR",
        order_id: data.id,
        name: "AlphaJEE",
        description: selectedTier!.name,
        handler: (response: any) => {
          setModalOpen(false);
          showToast(
            "Payment Successful!",
            `Thank you ${name}! You are a legend! 👑`,
            "success",
          );
          setName("");
          setEmail("");
          setHandle("");
        },
        prefill: { name, email, contact: "" },
        theme: { color: "#0f0e0b" },
      });
      rzp.open();
    } catch (err) {
      showToast(
        "Payment Error",
        "Could not initiate payment. Please try again.",
        "error",
      );
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="bg-[#f9f9f0] dark:bg-[#0f0e0b] min-h-screen">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      {/* Header */}
      <div className="bg-[#0f0e0b] pt-28 pb-20 px-6 text-center relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-code-label text-[#9d937c] uppercase tracking-widest mb-4">
            Support
          </p>
          <h1 className="text-display-large text-[#f9f9f0] mb-6">
            Keep the lights on.
          </h1>
          <p className="text-body-large text-[#9d937c] max-w-2xl mx-auto mb-4">
            AlphaJEE is a nonprofit mission. We don&apos;t run ads, and we don&apos;t sell
            your data. Every tool we build is to help you crush the JEE without
            falling for the &quot;hopium&quot; traps.
          </p>
          <p className="text-body-small text-[#9d937c] bg-[#f9f9f0]/5 border border-[#f9f9f0]/10 px-6 py-3 inline-block mt-4">
            [!] Please do not waste your money — these are fun challenges for
            real supporters. Study first!
          </p>
        </div>
      </div>

      {/* Mission box */}
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="bg-[#badbee]/20 border border-[#badbee]/30 p-10 mb-16">
          <h2 className="text-display-medium text-[#0f0e0b] dark:text-[#f9f9f0] mb-6">
            Expressing Gratitude
          </h2>
          <p className="text-body-large text-[#3d3b34] dark:text-[#9d937c] leading-relaxed mb-4">
            AlphaJEE is a <strong>nonprofit mission</strong>. We don't run ads,
            and we don't sell your data. Every tool we build is to help you
            crush the JEE without falling for the "hopium" traps.
          </p>
          <p className="text-body-base text-[#3d3b34] dark:text-[#9d937c] leading-relaxed">
            We are committed to continuous redesigns and making our code even
            more efficient for the community.
          </p>
          <p className="text-body-base text-[#0f0e0b] dark:text-[#f9f9f0] font-semibold mt-4">
            We will be having campaigns of &quot;Giving Back&quot; (Raffles &amp;
            Giveaways) soon to return the love to the community!
          </p>
        </div>

        {/* Donation grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#0f0e0b]/10 dark:bg-[#f9f9f0]/10">
          {tiers.map((tier, i) => (
            <button
              key={i}
              onClick={() => openModal(tier)}
              className="group relative text-left p-8 bg-[#f9f9f0] dark:bg-[#0f0e0b] hover:bg-[#f0efe6] dark:hover:bg-[#21201c] transition-all duration-300 overflow-hidden"
            >
              {/* Accent top */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: tier.color }}
              />

              <span className="text-4xl block mb-4">{tier.emoji}</span>
              <div className="font-akkurat text-2xl font-bold text-[#0f0e0b] dark:text-[#f9f9f0] mb-2">
                ₹{tier.amount}
              </div>
              <h3 className="text-heading-2xl text-[#0f0e0b] dark:text-[#f9f9f0] mb-3">
                {tier.name}
              </h3>
              <p className="text-body-small text-[#9d937c] leading-relaxed mb-4">
                {tier.desc}
              </p>

              {tier.favor && (
                <div
                  className="text-code-micro uppercase tracking-widest px-3 py-1.5 mt-auto self-start"
                  style={{
                    background: `${tier.color}20`,
                    color: tier.color,
                    borderRadius: "9999px",
                  }}
                >
                  FAVOR: {tier.favor}
                </div>
              )}

              {/* Hover lore overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: tier.color }}
              >
                <p className="text-body-base text-[#0f0e0b] italic leading-relaxed">
                  "{tier.lore}"
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {modalOpen && selectedTier && (
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
          style={{
            background: "rgba(15,14,11,0.85)",
            backdropFilter: "blur(12px)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="bg-[#f9f9f0] dark:bg-[#21201c] w-full max-w-md p-8 relative">
            <div className="text-4xl text-center mb-4">
              {selectedTier.emoji}
            </div>
            <h2 className="text-display-medium text-[#0f0e0b] dark:text-[#f9f9f0] text-center mb-2">
              {selectedTier.name}
            </h2>
            <p className="text-code-label text-[#9d937c] text-center uppercase tracking-widest mb-8">
              ₹{selectedTier.amount}
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-code-micro text-[#9d937c] uppercase tracking-widest block mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-3 border border-[#0f0e0b]/20 dark:border-[#f9f9f0]/20 bg-transparent text-[#0f0e0b] dark:text-[#f9f9f0] text-body-base focus:outline-none focus:border-[#0f0e0b] dark:focus:border-[#f9f9f0] transition-colors"
                />
              </div>
              <div>
                <label className="text-code-micro text-[#9d937c] uppercase tracking-widest block mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full p-3 border border-[#0f0e0b]/20 dark:border-[#f9f9f0]/20 bg-transparent text-[#0f0e0b] dark:text-[#f9f9f0] text-body-base focus:outline-none focus:border-[#0f0e0b] dark:focus:border-[#f9f9f0] transition-colors"
                />
              </div>
              <div>
                <label className="text-code-micro text-[#9d937c] uppercase tracking-widest block mb-2">
                  Reddit / Social Handle (Optional)
                </label>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="e.g. u/username or @discord"
                  className="w-full p-3 border border-[#0f0e0b]/20 dark:border-[#f9f9f0]/20 bg-transparent text-[#0f0e0b] dark:text-[#f9f9f0] text-body-base focus:outline-none focus:border-[#0f0e0b] dark:focus:border-[#f9f9f0] transition-colors"
                />
              </div>
            </div>

            <button
              onClick={triggerPayment}
              disabled={paying}
              className="btn-primary w-full justify-center mt-8 disabled:opacity-60"
              style={{ backgroundColor: "#0f0e0b", color: "#f9f9f0" }}
            >
              {paying
                ? "Processing..."
                : `Pay ₹${selectedTier.amount} Securely`}
            </button>

            <button
              onClick={() => setModalOpen(false)}
              className="w-full text-center mt-4 text-code-micro text-[#9d937c] hover:text-[#0f0e0b] dark:hover:text-[#f9f9f0] transition-colors uppercase tracking-widest"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
