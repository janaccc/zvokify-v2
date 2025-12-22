import Image from "next/image";
import Link from "next/link";
import { GoSearch } from "react-icons/go";
import { MdHomeFilled } from "react-icons/md";
import Navbar from "@/components/Navbar"
import { Main } from "next/document";
import Sidebar from "@/components/Sidebar";
import Songs from "@/components/Songs";
import MusicPlayer from "@/components/MusicPlayer";


export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Sidebar />
        <Songs/>
        <MusicPlayer/>
      </main>
    </div>
  );
}