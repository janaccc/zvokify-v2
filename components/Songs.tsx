"use client";

import { supabase } from "@/lib/SupabaseClient";
import { Song } from "@/types/song";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { IoMdPlay } from "react-icons/io";

// DODANO: uvoz Contexta
import { usePlayer } from "@/context/PlayerContext";

export default function Songs() {
    const { setCurrentSong } = usePlayer();

    const getAllSongs = async (): Promise<Song[]> => {
        const { data, error } = await supabase.from("songs").select("*");

        if (error) {
            console.log("Napaka pri prikazu pesmi:", error.message);
            return [];
        }
        return data || [];
    }

    const { data: songs, isLoading, error, isError } = useQuery<Song[]>({
        queryFn: getAllSongs,
        queryKey: ["allSongs"]
    });

    if (isLoading)
        return (
            <div className="min-h-[90vh] bg-background my-15 p-4 lg:ml-80 rounded-lg mx-4">
                <h2 className="text-2xl text-white mb-3 font-semibold">Vse Pesmi</h2>
                <h2 className="text-center text-white text-2xl">Nalaganje...</h2>
            </div>
        );

    if (isError)
        return (
            <div className="min-h-[90vh] bg-background my-15 p-4 lg:ml-80 rounded-lg mx-4">
                <h2 className="text-2xl text-white mb-3 font-semibold">Vse Pesmi</h2>
                <h2 className="text-center text-white text-2xl">Prišlo je do napake: {error?.message}</h2>
            </div>
        );

    return (
        <div className="min-h-[90vh] bg-background my-15 p-4 lg:ml-80 rounded-lg mx-4">
            <h2 className="text-2xl text-white mb-3 font-semibold">Vse Pesmi</h2>
            <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {songs?.map((song) => (
                    <div
                        key={song.id}
                        className="relative group bg-background p-3 cursor-pointer rounded-md hover:bg-hover transition"
                        onClick={() => setCurrentSong(song)}
                    >
                        <Image
                            src={song.cover_image_url}
                            alt={song.title}
                            width={500}
                            height={500}
                            className="w-full h-50 object-cover rounded-md cursor-pointer"
                        />
                        {/* SIVA OVERLAY ob hover */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-md transition" />
                        {/* PLAY GUMB ob hover */}
                        <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer">
                            <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                                <IoMdPlay />
                            </div>
                        </button>
                        <div className="mt-2">
                            <p className="text-primary-text font-semibold">{song.title}</p>
                            <p className="text-secondary-text text-sm">{song.artist}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
