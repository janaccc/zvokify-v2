"use client";

import { supabase } from "@/lib/SupabaseClient";
import { Song } from "@/types/song";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { IoMdPlay } from "react-icons/io";
import { usePlayer } from "@/context/PlayerContext";

export default function Songs() {
    const { setCurrentSong, setSongs, searchTerm } = usePlayer();

    const getallSongs = async () => {
        const { data, error } = await supabase.from("songs").select("*");

        if (error) {
            console.log("Napaka pri prikazu pesmi:", error.message);
        }
        return data;
    }

    const { data: songs, isLoading, error, isError } = useQuery({
        queryFn: getallSongs,
        queryKey: ["allSongs"],
        onSuccess: (data) => {
            if (data) setSongs(data);
        }
    });

    // Filter songs glede na searchTerm
    const filteredSongs = songs?.filter((song: Song) => {
        const term = searchTerm?.toLowerCase() || "";
        return song.title.toLowerCase().includes(term) || song.artist.toLowerCase().includes(term);
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
                <button className="bg-primary w-12 h-12 rounded-full grid place-items-center absolute bottom-8 right-5 opacity-0 group-hover:opacity-100 group-hover:bottom-18 transition-all duration-300 ease-in-out cursor-pointer">
                    <IoMdPlay />
                </button>
                {filteredSongs?.map((song: Song, index) => {
                    return (
                        <div
                            key={song.id}
                            className="relative group bg-background p-3 cursor-pointer rounded-md hover:bg-hover transition"
                            onClick={() => setCurrentSong(song)}
                        >
                            <Image src={song.cover_image_url} alt="Naslovna slika" width={500} height={500} className="w-full h-50 object-cover rounded-md cursor-pointer" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-md transition" />
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
                    )
                })}
            </div>
        </div>
    )
}
