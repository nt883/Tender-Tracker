export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="border-b border-border bg-surface">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="h-4 w-32 bg-border rounded animate-pulse mb-4" />
          <div className="h-7 w-64 bg-border rounded animate-pulse" />
        </div>
      </div>
      <section className="max-w-5xl mx-auto px-6 py-10">
        <p className="text-sm text-muted">Loading project details…</p>
      </section>
    </main>
  );
}