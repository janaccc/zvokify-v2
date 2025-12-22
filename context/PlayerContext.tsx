'use client';
// context/PlayerContext.tsx
import React, { createContext, useContext, useState } from "react";
import { Song } from "@/types/song";

type PlayerContextType = {
    currentSong: Song | null;
    setCurrentSong: (song: Song) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    // ... ostale funkcije
};

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <PlayerContext.Provider value={{ currentSong, setCurrentSong, searchTerm, setSearchTerm }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => {
    const context = useContext(PlayerContext);
    if (!context) throw new Error("usePlayer must be used within PlayerProvider");
    return context;
};
