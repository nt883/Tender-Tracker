"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, clearSession, Session } from "@/lib/session";

export default function ContractorDashboard() {
  const router = useRouter();
  const [session, setSessionState] = useState<Session | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const s = getSession();
    if (!s || s.role !== "contractor") {
      router.push("/contractor/login");
      return;
    }
    setSessionState(s);
    setChecked(true);
  }, [router]);

  function handleLogout() {
    clearSession();
    router.push("/contractor/login");
  }

  if (!checked) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-sm text-muted">Checking session…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="bg-header">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <p className="text-xs text-white/60">Contractor Dashboard</p>
            <h1 className="font-serif text-xl font-semibold text-white">
              Welcome, {session?.name}
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-white/70 hover:text-white hover:underline"
          >
            Logout
          </button>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-10">
        <p className="text-sm text-muted">
          Dashboard content (My Tenders, Submit Expense, Expense History, Milestones, My Trust Score) goes here — next steps.
        </p>
      </section>
    </main>
  );
}