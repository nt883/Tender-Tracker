"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md text-center bg-surface border border-border rounded-md p-8">
        <h1 className="font-serif text-xl font-semibold text-foreground mb-2">
          Couldn&apos;t load this project
        </h1>
        <p className="text-sm text-muted mb-6">
          Something went wrong while fetching this page. This is a fake network
          delay for now — once real data is connected, this covers an actual
          failed request.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="bg-accent text-white text-sm font-medium px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
          >
            Try again
          </button>
          <Link href="/" className="text-sm text-accent hover:underline">
            ← All communities
          </Link>
        </div>
      </div>
    </main>
  );
}