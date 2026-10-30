import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PaletteLab from "@/components/PaletteLab";
import ScrollProgress from "@/components/ScrollProgress";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// The display face, used only for the italic accent words in headings.
// Instrument Serif isn't a variable font, so a weight has to be named.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // metadataBase turns the relative paths below into absolute URLs, which is
  // what link previews on social and messaging apps need.
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.positioning,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.positioning,
    url: "/",
    siteName: site.name,
    locale: "en_GB",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

// Runs before the browser paints anything, which is the only way to apply a
// saved theme without a flash of the wrong one. It has to be a raw string
// because React components render too late to help here.
const themeScript = `
(function(){
  try {
    var saved = localStorage.getItem('theme');
    var dark = saved ? saved === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <ScrollProgress />
        {/* Keyboard users land on this first and can jump past the nav. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-70 focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
        >
          Skip to content
        </a>
        <Nav />
        <div id="main" className="flex-1">
          {children}
        </div>
        <Footer />
        {/* TEMPORARY palette comparison tool. Delete this line and
            components/PaletteLab.tsx once the palette is settled. */}
        <PaletteLab />
      </body>
    </html>
  );
}
