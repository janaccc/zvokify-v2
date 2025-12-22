"use client";
import useUserSession from "@/custom-hooks/useUserSession";
import { supabase } from "@/lib/SupabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [AudioFile, setAudioFile] = useState<File | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const { session } = useUserSession();

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (!data.session) {
                router.push("/");
            } else {
                setPageLoading(false);
            }
        });
    }, []);

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (!title || !artist || !AudioFile || !image) {
            setMessage("Vsa polja morajo biti izpolnjena.");
            setLoading(false);
            return;
        }

        try {
            //upload song
            const timestamp = Date.now();

            //upload image
            const imagePath = `images/${timestamp}_${image.name}`;
            const { error: imageError } = await supabase.storage.from("cover-images").upload(imagePath, image);

            if (imageError) {
                setMessage(imageError.message);
                setLoading(false);
                return;
            }

            //get public url
            const { data: { publicUrl: imageURL } } = supabase.storage.from("cover-images").getPublicUrl(imagePath);

            //upload autdio
            const audioPath = `songs/${timestamp}_${AudioFile.name}`;
            const { error: audioError } = await supabase.storage.from("songs").upload(audioPath, AudioFile);
            if (audioError) {
                setMessage(audioError.message);
                setLoading(false);
                return;
            }

            const { data: { publicUrl: audioURL } } = supabase.storage.from("songs").getPublicUrl(audioPath);

            //save songs to supabase
            const { error: insertError } = await supabase.from("songs").insert({
                title,
                artist,
                audio_url: audioURL,
                cover_image_url: imageURL,
                user_id: session?.user.id,
            });

            if (insertError) {
                setMessage(insertError.message);
                setLoading(false);
                return;
            }

            setTitle("");
            setArtist("");
            setAudioFile(null);
            setImage(null);
            setMessage("Pesem je bila uspešno dodana!");
            setTimeout(() => {
                router.push("/");
            }, 3000);

        } catch (err) {
            console.log("Prišlo je do napake:", err);

        }

    }



    if (pageLoading) return null;

    return (
        <div className="h-screen flex justify-center items-center w-full bg-hover">
            <div className="bg-background flex flex-col items-center px-6 lg:px-12 py-6 rounded-md max-w-[400px] w-[90%]">
                <Image src="/images/zvokifylogo.png" width={500} height={500} alt="logo image" className="h-11 w-11" />
                <h2 className="text-2xl font-bold text-white my-2 mb-8 text-center">Dodaj Pesem</h2>
                <form onSubmit={handleUpload}>
                    {message && <p className="text-red-500 mb-4 text-center">{message}</p>}
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Naslov" className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-neutral-600 mb-6 focus:text-secondary-text" />
                    <input value={artist} onChange={(e) => setArtist(e.target.value)} type="text" placeholder="Izvajalec" className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-neutral-600 mb-6 focus:text-secondary-text" />
                    <label htmlFor="audio" className="block py-2 text-secondary-text">Pesem</label>
                    <input onChange={(e) => {
                        const files = e.target.files;
                        if (!files) return;
                        const file = files[0];
                        setAudioFile(file);

                    }} accept="audio/*" id="audio" type="file" className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-neutral-600 mb-6 focus:text-secondary-text" />
                    <label id="cover" htmlFor="cover" className="block py-2 text-secondary-text">Slika</label>
                    <input onChange={(e) => {
                        const files = e.target.files;
                        if (!files) return;
                        const file = files[0];
                        setImage(file);
                    }} accept="image/*" id="cover" type="file" className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-neutral-600 mb-6 focus:text-secondary-text" />
                    {loading ? (
                        <button className="bg-primary py-3 rounded-full w-full font-bold cursor-pointer">Nalaganje pesmi...</button>
                    ) : (
                        <button className="bg-primary py-3 rounded-full w-full font-bold cursor-pointer">Dodaj pesem</button>
                    )};

                </form>
            </div>
        </div>
    )
}