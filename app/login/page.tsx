"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { supabase } from "@/lib/SupabaseClient";
import loginUser from "@/lib/auth/loginUser";

/**
 * Login page
 * - Redirects authenticated users to homepage
 * - Handles user login with email & password
 */
export default function LoginPage() {
  const router = useRouter();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI state
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  /**
   * Checks if the user already has an active session.
   * Authenticated users are redirected to the homepage.
   */
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        router.push("/");
      } else {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  /**
   * Displays a temporary message to the user
   */
  const showMessage = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  /**
   * Handles login form submission
   */
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      showMessage("Izpolni vsa polja!");
      return;
    }

    const result = await loginUser(email, password);

    if (result?.error) {
      showMessage(result.error);
      return;
    }

    showMessage("Prijava uspešna.");
    router.push("/");
  };

  // Prevent UI flicker while checking auth session
  if (loading) return null;

  return (
    <div className="h-screen flex justify-center items-center w-full bg-hover">
      <div className="bg-background flex flex-col items-center px-6 lg:px-12 py-6 rounded-md max-w-[400px] w-[90%]">
        <Image
          src="/images/zvokifylogo.png"
          width={500}
          height={500}
          alt="Zvokify logo"
          className="h-11 w-11"
        />

        <h2 className="text-2xl font-bold text-white my-2 mb-8 text-center">
          Prijava
        </h2>

        <form onSubmit={handleLogin}>
          {message && (
            <p className="font-semibold text-center mb-4 py-1 rounded-full text-red-600">
              {message}
            </p>
          )}

          <input
            type="email"
            placeholder="Vnesi E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-neutral-600 mb-6 focus:text-secondary-text"
          />

          <input
            type="password"
            placeholder="Vnesi geslo"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-neutral-600 mb-6 focus:text-secondary-text"
          />

          <button className="bg-primary py-3 rounded-full w-full font-bold cursor-pointer">
            Prijava
          </button>

          <div className="text-secondary-text text-center my-6">
            <span>Nimaš računa?</span>
            <Link
              href="/register"
              className="ml-2 text-white underline hover:text-primary"
            >
              Registriraj se
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
//Bug fix (to si LAHKO zapišeš!)

//Bug:

//uporabnik lahko klikne login večkrat in dobi več timeout redirectov

//Rešitev:

//centraliziran showMessage

//takojšnji redirect po uspehu

