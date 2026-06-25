import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";
import CommunityBanner from "@/components/CommunityBanner";

export const metadata: Metadata = {
  title: "AlphaJEE — The Ultimate Free JEE Ecosystem",
  description:
    "The most accurate, 100% FREE ecosystem for JEE aspirants. Predict your JEE Main percentile and JEE Advanced Rank instantly. No login, no paywalls. Powered by the V4 Alpha Engine.",
  keywords:
    "free jee predictor, jee advanced rank predictor, iit jee rank calculator, free neet rank predictor, jee main score calculator, marks vs percentile jee, alphajee official",
  authors: [{ name: "AlphaJEE Syndicate" }],
  metadataBase: new URL("https://www.alphajee.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "AlphaJEE Official",
    url: "https://www.alphajee.com/",
    title: "AlphaJEE — The Ultimate Free JEE Ecosystem",
    description:
      "Calculate raw scores, predict exact percentiles, and estimate All India Ranks. 100% Free forever.",
    images: [
      {
        url: "https://www.alphajee.com/official-banner.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AlphaJEE — Ultimate Free JEE Predictor",
    description:
      "Instant JEE Percentiles and IIT JEE Advanced Ranks. Zero paywalls.",
    images: ["https://www.alphajee.com/official-banner.png"],
  },
  robots: "index, follow, max-image-preview:large",
  icons: { icon: "/favicon.png" },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('color-theme')==='dark'){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ToastProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CommunityBanner />
        </ToastProvider>
      </body>
    </html>
  );
}
