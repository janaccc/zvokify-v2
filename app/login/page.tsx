import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center pt-20">
            <div className="bg-background rounded-2xl w-full max-w-md p-8 shadow-lg">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <Image
                        src="/images/zvokifylogo.png"
                        alt="Zvokify logo"
                        width={50}
                        height={50}
                    />
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-center text-primary-text mb-6">
                    Prijava
                </h1>

                {/* Form */}
                <form className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Ime"
                        className="h-11 px-4 rounded-lg bg-black text-white outline-none placeholder:text-primary-text border border-hover focus:border-white"
                    />

                    <input
                        type="password"
                        placeholder="Geslo"
                        className="h-11 px-4 rounded-lg bg-black text-white outline-none placeholder:text-primary-text border border-hover focus:border-white"
                    />

                    <button
                        type="submit"
                         className="h-11 mt-2 bg-white text-gray-950 rounded-full font-bold hover:bg-secondary-text transition cursor-pointer"
                    >
                        Prijava
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-hover" />
                    <span className="text-primary-text text-sm">ali</span>
                    <div className="flex-1 h-px bg-hover" />
                </div>

                {/* Register */}
                <p className="text-center text-primary-text text-sm">
                    Nimaš računa?{" "}
                    <Link href="/register" className="font-bold hover:text-white">
                        Registracija
                    </Link>
                </p>
            </div>
        </div>
    );
}
