"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setSession } from "@/lib/session";

export default function AuditorLogin() {
  const router = useRouter();
  const [name, setName] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSession({ role: "auditor", userId: "auditor-demo", name: name.trim() });
    router.push("/auditor");
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <Link href="/" className="text-sm text-accent hover:underline">
          ← Back to public site
        </Link>
        <div className="bg-surface border border-border rounded-md p-6 mt-4">
          <h1 className="font-serif text-xl font-semibold text-foreground mb-1">
            Auditor Login
          </h1>
          <p className="text-sm text-muted mb-6">
            Demo login — enter your name to sign in as an auditor.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="w-full bg-accent text-white text-sm font-medium px-4 py-2.5 rounded-md hover:opacity-90 transition-opacity"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}