import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers";
import { PlayerProvider } from "@/context/PlayerContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zvokify",
  description: "Zvokify je kao spotify",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        {/* Glavni providerji */}
        <Providers>
          {/* PlayerProvider ovije samo vsebino, ki jo želiš, da ima dostop do MusicPlayer */}
          <PlayerProvider>
            {children} {/* MusicPlayer NI več tukaj */}
          </PlayerProvider>
        </Providers>
      </body>
    </html>
  );
}
