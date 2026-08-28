import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ConstellationField from "@/components/ui/constellation-field";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandPalette } from "@/components/layout/command-palette";
import { siteConfig } from "@/data/site-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.titles[0]}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.titles.join(" · ")}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.titles.join(" · ")}`,
    description: siteConfig.description,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.titles.join(" / "),
  url: siteConfig.url,
  email: siteConfig.email,
  sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /*
     * `dark` and `colorScheme` are stamped here at build time, and they have to
     * be: next-themes injects its script inside <body>, several hundred bytes
     * past <body> itself, so without this the browser paints one frame of
     * `bg-background` from the light palette before the script swaps the class.
     * That is a white flash at the top of every page — barely visible when the
     * old hero was a pale gradient, glaring now that the first screen is black.
     *
     * Hard-coding dark here is correct rather than a guess: the provider below
     * is configured with defaultTheme="dark", and next-themes only consults the
     * system preference when the stored theme is literally "system", so a
     * visitor with nothing in localStorage resolves to dark either way. Only
     * someone who has explicitly chosen light sees a swap, and theirs is a
     * dark-to-light correction on their own machine rather than a flash for
     * everybody. suppressHydrationWarning already covers the mismatch.
     */
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} dark h-full scroll-smooth antialiased`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground print:bg-white print:text-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {/* The supplied constellation field is the shared visual ground for
                every route. Keep it decorative and behind the document flow. */}
            <ConstellationField
              mode="auto"
              speed={0.55}
              density={0.9}
              opacity={0.82}
              className="pointer-events-none fixed inset-0 z-[-1] h-screen w-screen print:hidden"
            />
            <Navbar />
            <CommandPalette />
            <main className="flex-1">{children}</main>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
