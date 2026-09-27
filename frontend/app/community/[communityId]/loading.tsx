export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="bg-header">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="h-4 w-24 bg-white/10 rounded animate-pulse mb-3" />
          <div className="h-7 w-48 bg-white/10 rounded animate-pulse" />
        </div>
      </div>
      <section className="max-w-5xl mx-auto px-6 py-10">
        <p className="text-sm text-muted">Loading tenders…</p>
      </section>
    </main>
  );
}