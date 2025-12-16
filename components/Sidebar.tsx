'use client'
import Image from "next/image";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { use, useState } from "react";
import { FaTrash } from "react-icons/fa";
import useUserSession from "@/custom-hooks/useUserSession";

export default function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const { loading, session } = useUserSession();

    if (loading) {
        return (<aside
            className={`fixed left-2 top-15 bg-background w-75 rounded-lg h-[90vh] p-2 overflow-y-auto scrollbar-hide transform  lg:translate-x-0 z-30 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}>
            <h2 className="text-2xl text-white text-center ">Nalaganje...</h2>
        </aside>);
    }


    return (
        <>
        {session ? (
                <div>
            <aside
                className={`fixed left-2 top-15 bg-background w-75 rounded-lg h-[90vh] p-2 overflow-y-auto transition-transform duration-500 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between p-2 mb-4 text-primary-text">
                    <h2 className="font-bold text-xl">
                        Dodane Pesmi
                    </h2>

                    <Link
                        href="upload-song"
                        className="p-2 rounded-full hover:bg-hover flex items-center justify-center"
                    >
                        <LuPlus size={30} />
                    </Link>
                </div>

                <div>
                    <div className="relative flex gap-2 items-center cursor-pointer mb-4 p-2 rounded-lg hover:bg-hover group">

                        <button className="text-secondary-text absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer hidden group-hover:block">
                            <FaTrash />
                        </button>
                        <Image src="/images/graduation.jpg" alt="slika pesmi" width={300} height={300} className="w-8 h-8 rounded-md" />
                        <div>
                            <p className="text-primary-text font-semibold">Graduation</p>
                            <p className="text-secondary-text text-sm">Kanye West</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex gap-2 items-center cursor-pointer mb-4 p-2 rounded-lg hover:bg-hover">
                        <Image src="/images/graduation.jpg" alt="slika pesmi" width={300} height={300} className="w-8 h-8 rounded-md" />
                        <div>
                            <p className="text-primary-text font-semibold">Graduation</p>
                            <p className="text-secondary-text text-sm">Kanye West</p>
                        </div>
                    </div>
                </div>


            </aside>

            <button
                className="fixed bottom-5 left-5 bg-background w-12 h-12 grid place-items-center text-white rounded-full z-50 cursor-pointer hover:bg-hover lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <MdOutlineLibraryMusic />
            </button>
        </div>
    ) : (
                <div>
            <aside
                className={`fixed left-2 top-15 bg-background w-75 rounded-lg h-[90vh] p-2 overflow-y-auto transition-transform duration-500 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}>
            
                        <div className="py-8 text-center">
                            <Link href="/login" className="bg-white px-6 py-2 rounded-full font-semibold hover:bg-text-secondary-text">Prijavite se</Link>
                            <p className="mt-4 text-white">Prijavi se da vidiš svoje pesmi</p>
                        </div>

            </aside>

            <button
                className="fixed bottom-5 left-5 bg-background w-12 h-12 grid place-items-center text-white rounded-full z-50 cursor-pointer hover:bg-hover lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <MdOutlineLibraryMusic />
            </button>
        </div>
    )}
    </>
    );
}
