"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const categories = [
  "Water",
  "Roads",
  "Electricity",
  "Sanitation",
  "Health",
  "Education",
  "Other",
];

export default function ReportIssue() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // No backend yet — this just simulates the submission.
    // Once Tiyiselani's POST /reports endpoint exists, replace this
    // with an actual fetch() call matching docs/api-contract.md.
    console.log({
      project_id: projectId,
      description,
      category,
      contact,
      status: "pending",
      created_at: new Date().toISOString(),
    });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-md text-center bg-surface border border-border rounded-md p-8">
          <h1 className="font-serif text-xl font-semibold text-foreground mb-2">
            Report submitted
          </h1>
          <p className="text-sm text-muted mb-6">
            You&apos;ll be notified when it&apos;s reviewed.
          </p>
          <Link
            href={`/project/${projectId}`}
            className="text-sm text-accent hover:underline"
          >
            ← Back to project
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="max-w-2xl mx-auto px-6 py-6">
          <Link href={`/project/${projectId}`} className="text-sm text-accent hover:underline">
            ← Back to project
          </Link>
          <h1 className="font-serif text-2xl font-semibold text-foreground mt-3">
            Report an issue
          </h1>
          <p className="text-sm text-muted mt-1">Tender {projectId}</p>
        </div>
      </header>

      <section className="max-w-2xl mx-auto px-6 py-10">
        <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-md p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Category
            </label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Describe the problem
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What did you observe?"
              className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Photo <span className="text-muted font-normal">(optional)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
              className="w-full text-sm text-muted file:mr-3 file:py-2 file:px-3 file:rounded-md file:border file:border-border file:bg-background file:text-foreground file:text-sm"
            />
            {photo && <p className="text-xs text-muted mt-1">{photo.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Your name or contact <span className="text-muted font-normal">(optional, not public)</span>
            </label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Name, phone, or email"
              className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <button
            type="submit"
            className="bg-accent text-white text-sm font-medium px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity"
          >
            Submit report
          </button>
        </form>
      </section>
    </main>
  );
}