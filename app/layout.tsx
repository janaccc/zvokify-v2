import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers";
import { PlayerProvider } from "@/context/PlayerContext";
import MusicPlayer from "@/components/MusicPlayer";
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
        {/* Najprej glavni providerji */}
        <Providers>
          {/* PlayerProvider za MusicPlayer in Songs */}
          <PlayerProvider>
            {children}      {/* tvoja vsebina (npr. Songs) */}
            <MusicPlayer /> {/* vedno vidna na dnu */}
          </PlayerProvider>
        </Providers>
      </body>
    </html>
  );
}
