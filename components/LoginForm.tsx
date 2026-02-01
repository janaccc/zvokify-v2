"use client";

import { useState } from "react";
import loginUser from "@/lib/auth/loginUser";

export default function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const showMessage = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

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
    onSuccess?.();
  };

  return (
    <form onSubmit={handleLogin}>
      {message && <p>{message}</p>}

      <input
        type="email"
        placeholder="Vnesi E-Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Vnesi geslo"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button>Prijava</button>
    </form>
  );
}
