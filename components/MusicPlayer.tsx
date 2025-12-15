'use client'

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoMdPause, IoMdPlay, IoMdSkipBackward, IoMdSkipForward, IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";
import { LuRepeat1 } from "react-icons/lu";
import { MdOutlineQueueMusic } from "react-icons/md";

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [previousVolume, setPreviousVolume] = useState(0);

    const togglePlayButton = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying)
    }

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => {
            setCurrentTime(audio.currentTime) //posodobi pesem vsako sekundo za dolzino
            setDuration(audio.duration | 0)
        }

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateTime);
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, "0");

        return `${minutes}:${seconds}`;
    }

    const handleBar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);

        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };


    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const vol = parseInt(e.target.value);
        setVolume(vol);
        if (audioRef.current) {
            audioRef.current.volume = vol / 100;
        }
    };


    const toggleMute = () => {
        if (volume === 0) {
            //unmuta pesem
            setVolume(previousVolume);
            if (audioRef.current) {
                audioRef.current.volume = previousVolume / 100;
            }
        } else {
            //mute-a pesem
            setPreviousVolume(volume);
            setVolume(0);
            if (audioRef.current) {
                audioRef.current.volume = 0;
            }
        }
    }



    return (
        <div className="fixed bottom-0 left-0 w-full bg-black text-white px-4 py-3 shadow-md z-50">
            <audio src="/songs/homecoming.mp3" ref={audioRef}> </audio>

            <div className="max-w-8xl w-[95%] mx-auto flex items-center justify-between">
                <div className="flex gap-4 items-center">
                    <Image src="/images/graduation.jpg" alt="slika pesmi" width={500} height={500} className="w-13 h-13 object-cover rounded-md" />
                    <div className="text-sm">
                        <p className="text-white font-semibold">Graduation</p>
                        <p className="text-secondary-text font-normal">Kanye West</p>
                    </div>
                </div>

                {/*kontrole zvoka */}
                <div className="max-w-[400px] w-full flex items-center flex-col gap-3">
                    <div className="flex gap-4">
                        <button className="text-xl text-secondary-text">
                            <IoMdSkipBackward />
                        </button>
                        <button onClick={togglePlayButton} className="bg-white text-xl text-black w-10 h-10 rounded-full grid place-items-center">
                            {isPlaying ? <IoMdPause /> : <IoMdPlay />}
                        </button>
                        <button className="text-xl text-secondary-text">
                            <IoMdSkipForward />
                        </button>
                    </div>

                    <div className="w-full flex justify-center items-center gap-2">
                        <span className="text-secondary-text font-normal text-sm">
                            {formatTime(currentTime)}
                        </span>
                        <div className="w-full">
                            <input onChange={handleBar} type="range" min="0" max={duration} value={currentTime} className="w-full outline-none h-1 bg-zinc-700 rounded-md appearence-none accent-white" />
                        </div>
                        <span className="text-secondary-text font-normal text-sm">
                            {formatTime(duration)}
                        </span>
                    </div>




                </div>
                {/*Volume kontrole */}
                <div className="flex items-center gap-2">

                    {volume === 0 ? <button onClick={toggleMute} className="text-secondary-text text-xl cursor-pointer hover:bg-zinc-600 rounded-md">
                        <IoMdVolumeOff />
                    </button> : <button onClick={toggleMute} className="text-secondary-text text-xl cursor-pointer hover:bg-zinc-600 rounded-md">
                        <IoMdVolumeHigh />
                    </button>}
                    <input onChange={handleVolumeChange} value={volume} type="range" min="0" max="100" className="w-[100px] outline-none h-1 bg-zinc-700 accent-white appearance-none" />

                </div>

            </div>

        </div>
    )
}
