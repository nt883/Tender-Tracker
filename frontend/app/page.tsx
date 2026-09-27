"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCommunities } from "@/lib/api";
import { Community } from "@/lib/types";

const RECENT_KEY = "tender-tracker-recent-communities";

function getRecentCommunities(allCommunities: Community[]): Community[] {
  if (typeof window === "undefined") return [];
  try {
    const ids: string[] = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
    return ids
      .map((id) => allCommunities.find((c) => c.id === id))
      .filter((c): c is Community => Boolean(c));
  } catch {
    return [];
  }
}

function recordRecentCommunity(id: string) {
  try {
    const ids: string[] = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
    const updated = [id, ...ids.filter((existing) => existing !== id)].slice(0, 3);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  } catch {
    // localStorage unavailable — fail silently, this is a convenience feature only
  }
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<Community[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    getCommunities().then((data) => {
      setCommunities(data);
      setRecent(getRecentCommunities(data));
      setLoading(false);
    });
  }, []);

  const filtered = communities.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-background">
      <header className="bg-header">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <h1 className="font-serif text-2xl font-semibold text-white">
            Tender Tracker
          </h1>
          <p className="text-sm text-white/60 mt-0.5">
            Your money. Your right to know.
          </p>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="font-serif text-lg font-semibold text-foreground mb-1">
          Choose a community
        </h2>
        <p className="text-sm text-muted mb-4">
          Select a community to view its public tenders and spending.
        </p>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search communities..."
          className="w-full max-w-md border border-border rounded-md px-3 py-2 text-sm bg-surface text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent mb-8"
        />

                {loading && (
          <p className="text-sm text-muted mb-8">Loading communities…</p>
        )}

        {recent.length > 0 && query === "" && (
          <div className="mb-8">
            <p className="text-xs font-medium text-muted uppercase tracking-wide mb-3">
              Recently viewed
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {recent.map((community) => (
                <Link
                  key={community.id}
                  href={`/community/${community.id}`}
                  onClick={() => recordRecentCommunity(community.id)}
                  className="block border border-border bg-surface rounded-md p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-serif text-base font-semibold text-foreground">
                    {community.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}

        <p className="text-xs font-medium text-muted uppercase tracking-wide mb-3">
          {query ? `Results for "${query}"` : "All communities"}
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {filtered.map((community) => (
            <Link
              key={community.id}
              href={`/community/${community.id}`}
              onClick={() => recordRecentCommunity(community.id)}
              className="block border border-border bg-surface rounded-md p-5 hover:shadow-md transition-shadow"
            >
              <h3 className="font-serif text-lg font-semibold text-foreground">
                {community.name}
              </h3>
              <p className="text-sm text-muted mt-1.5">{community.description}</p>
            </Link>
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-muted col-span-3">No communities match your search.</p>
          )}
        </div>
      </section>
    </main>
  );
}