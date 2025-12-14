import Image from "next/image";
import Link from "next/link";
import { GoSearch } from "react-icons/go";
import { MdHomeFilled } from "react-icons/md";
import Navbar from "@/components/Navbar"

export default function Home() {
  return (
    <div className="min-h-screen">
        <Navbar/>
    </div>
  );
}

