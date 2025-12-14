import Image from "next/image";
import Link from "next/link";
import { GoSearch } from "react-icons/go";
import { MdHomeFilled } from "react-icons/md";

export default function Home() {
  return (
    <div className="min-h-screen">
      <nav className="h-15 flex justify-between items-center px-6 fixed top-0 left-0 w-full bg-black z-100">
        <div className="flex gap-6 items-center">
          <Image src="/images/zvokifylogo.png" alt="logo" width={35} height={35}/>
          <Link href="/" className="bg-background w-11 h-11 grid place-items-center text-white rounded-full"> 
          <MdHomeFilled size={20}/>
          </Link>
            <div className="bg-background flex items-center h-11 w-90 px-3 gap-3 text-primary-text rounded-full">
              <GoSearch className="text-primary-text shrink-0"/>
              <input className="height-full w-full outline-none placeholder:text-primary-text" type="text" placeholder="Išči skladbe..."/>
            </div>
        </div>
      </nav>
    </div>
  );
}
