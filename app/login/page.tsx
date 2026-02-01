"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/SupabaseClient";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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

  if (loading) return null;

  return <LoginForm onSuccess={() => router.push("/")} />;
}
