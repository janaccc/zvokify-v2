"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function Page() {

    useEffect(() => {

    }, []);

    return (
        <div className="h-screen flex justify-center items-center w-full bg-hover">
            <div className="bg-background flex flex-col items-center px-6 lg:px-12 py-6 rounded-md max-w-[400px] w-[90%]">
                <Image src="/images/zvokifylogo.png" width={500} height={500} alt="logo image" className="h-11 w-11" />
                <h2 className="text-2xl font-bold text-white my-2 mb-8 text-center">Dodaj Pesem</h2>
                <form>
                    <input type="text" placeholder="Naslov" className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-neutral-600 mb-6 focus:text-secondary-text" />
                    <input type="text" placeholder="Izvajalec" className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-neutral-600 mb-6 focus:text-secondary-text" />
                    <label htmlFor="audio" className="block py-2 text-secondary-text">Pesem</label>
                    <input id="audio" type="file" className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-neutral-600 mb-6 focus:text-secondary-text" />
                    <label id="cover" htmlFor="cover" className="block py-2 text-secondary-text">Slika</label>
                    <input type="file" className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-neutral-600 mb-6 focus:text-secondary-text" />
                    <button className="bg-primary py-3 rounded-full w-full font-bold cursor-pointer">Dodaj pesem</button>

                </form>
            </div>
        </div>
    )
}