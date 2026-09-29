"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAllContractors } from "@/lib/api";
import { Contractor } from "@/lib/types";
import { setSession } from "@/lib/session";

export default function ContractorLogin() {
  const router = useRouter();
  const [contractors, setContractors] = useState<Contractor[]>([]);

  useEffect(() => {
    getAllContractors().then(setContractors);
  }, []);

  function handleLogin(contractor: Contractor) {
    setSession({ role: "contractor", userId: contractor.id, name: contractor.name });
    router.push("/contractor");
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <Link href="/" className="text-sm text-accent hover:underline">
          ← Back to public site
        </Link>
        <div className="bg-surface border border-border rounded-md p-6 mt-4">
          <h1 className="font-serif text-xl font-semibold text-foreground mb-1">
            Contractor Login
          </h1>
          <p className="text-sm text-muted mb-6">
            Demo login — select which contractor you are signing in as.
          </p>
          <div className="space-y-2">
            {contractors.map((contractor) => (
              <button
                key={contractor.id}
                onClick={() => handleLogin(contractor)}
                className="w-full text-left border border-border rounded-md px-4 py-3 hover:border-accent transition-colors"
              >
                <p className="text-sm font-medium text-foreground">{contractor.name}</p>
                <p className="text-xs text-muted">Reg: {contractor.registrationNumber}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}