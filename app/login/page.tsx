"use client"
import loginUser from "@/lib/auth/loginUser";
import { supabase } from "@/lib/SupabaseClient";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page(){
    const router = useRouter(); 
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [message, setMessage] = useState("");

            const [loading, setLoading] = useState(true);
        
            useEffect(() => {
                supabase.auth.getSession().then(({ data}) => {
                    if (data.session) {
                        router.push("/");
                    }else{
                        setLoading(false);
                    }
                });
            }, []); 

        const handleLogin = async (e : React.FormEvent) => {
                e.preventDefault();

                if(!email.trim() || !password.trim()){
            setMessage("Izpolni vsa polja!");
            return;
        }
        const result = await loginUser(email, password);

        if(result?.error){
            setMessage(result.error);
        }else{
            setMessage("Prijava uspešna.");
            setTimeout(() => {
                router.push("/");
            }, 3000);

        }
     }

     if(loading) return null; 
     

    return(
        <div className="h-screen flex justify-center items-center w-full bg-hover">
                <div className="bg-background flex flex-col items-center px-6 lg:px-12 py-6 rounded-md max-w-[400px] w-[90%]">
                    <Image src="/images/zvokifylogo.png" width={500} height={500} alt="logo image" className="h-11 w-11"/>
                    <h2 className="text-2xl font-bold text-white my-2 mb-8 text-center">Prijava</h2>
                    <form onSubmit={handleLogin}>
                        {message && <p className="font-semibold text-center mb-4 py-1 rounded-full text-red-600">{message}</p>}
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Vnesi E-Mail" className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-neutral-600 mb-6 focus:text-secondary-text"/>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="text" placeholder="Vnesi geslo" className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-neutral-600 mb-6 focus:text-secondary-text"/>
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