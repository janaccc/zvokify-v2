import { supabase } from "@/lib/SupabaseClient";
import { Song } from "@/types/song";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { FaTrash } from "react-icons/fa";
import DeleteButton from "./DeleteButton";

type userSongsProps = {
    userId?: string | undefined;
};

export default function UserSongs({ userId }: userSongsProps) {

    const getUserSongs = async (userId: string) => {
        const { error, data } = await supabase.from("songs").select("*").eq("user_id", userId);

        if (error) {
            console.log("Napaka pri pridobivanju pesmi uporabnika:", error.message);
        }

        return data;
    };

    const { data: songs, isLoading, error, isError } = useQuery({
        queryKey: ["UserSongs", userId],
        queryFn: () => {
            if (!userId) return []; // če userId ni definiran
            return getUserSongs(userId);
        },
        enabled: !!userId, // query se bo izvedel samo, če userId obstaja
    });

    if(isLoading){
        return <div className="min-h-[20vh] bg-background my-2 p-2 rounded-lg mx-2">
            <h2 className="text-center text-white text-2xl">Nalaganje vaših pesmi...</h2>
        </div>;
    }

    if(isError){
        return <div className="min-h-[20vh] bg-background my-2 p-2 rounded-lg mx-2">
            <h2 className="text-center text-white text-2xl">Prišlo je do napake: {error?.message}</h2>
        </div>;
    }


    return (
  <div>
    {songs?.map((song: Song, index) => {
      return (
        <div
          key={song.id}
          className="relative flex gap-2 items-center cursor-pointer mb-4 p-2 rounded-lg hover:bg-hover group"
        >
            <DeleteButton songId={song.id} imagePath={song.cover_image_url} audioPath={song.audio_url} />
          <button className="text-secondary-text absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer hidden group-hover:block">
            <FaTrash />
          </button>
          <Image
            src={song.cover_image_url}
            alt="slika pesmi"
            width={300}
            height={300}
            className="w-8 h-8 rounded-md"
          />
          <div>
            <p className="text-primary-text font-semibold">{song.title}</p>
            <p className="text-secondary-text text-sm">{song.artist}</p>
          </div>
        </div>
      );
    })}
  </div>
);

}

