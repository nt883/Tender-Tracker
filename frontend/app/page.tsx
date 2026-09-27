import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/mockData";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between gap-6">
          <div>
            <h1 className="font-serif text-2xl font-semibold text-foreground">
              Tender Tracker
            </h1>
            <p className="text-sm text-muted mt-0.5">
              Your money. Your right to know.
            </p>
          </div>
          <input
            type="text"
            placeholder="Search tenders, contractors, or locations..."
            className="w-full max-w-xs border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="font-serif text-lg font-semibold text-foreground mb-4">
          Active Tenders
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}