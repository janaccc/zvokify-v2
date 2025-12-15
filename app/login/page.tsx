import Image from "next/image";
import Link from "next/link";

export default function Page(){
    return(
        <div className="h-screen flex justify-center items-center w-full bg-hover">
                <div className="bg-background flex flex-col items-center px-6 lg:px-12 py-6 rounded-md max-w-[400px] w-[90%]">
                    <Image src="/images/zvokifylogo.png" width={500} height={500} alt="logo image" className="h-11 w-11"/>
                    <h2 className="text-2xl font-bold text-white my-2 mb-8 text-center">Prijava</h2>
                    <form>
                        <input type="text" placeholder="Vnesi uporabniško ime" className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-neutral-600 mb-6 focus:text-secondary-text"/>
                        <input type="text" placeholder="Vnesi geslo" className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-neutral-600 mb-6 focus:text-secondary-text"/>
                        <button className="bg-primary py-3 rounded-full w-full font-bold cursor-pointer">Prijava</button>
                        <div className="text-secondary-text text-center my-6">
                            <span>Nimaš računa?</span>
                            <Link href="register" className="ml-2 text-white underline hover:text-primary">Registriraj se</Link>
                        </div>
                    </form>
                </div>
        </div>
    )
}