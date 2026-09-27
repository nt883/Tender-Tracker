import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectCard from "@/components/ProjectCard";
import { communities, projects } from "@/lib/mockData";

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ communityId: string }>;
}) {
  const { communityId } = await params;
  const community = communities.find((c) => c.id === communityId);
  if (!community) notFound();

  const communityProjects = projects.filter((p) => p.communityId === communityId);

  return (
    <main className="min-h-screen bg-background">
      <header className="bg-header">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <Link href="/" className="text-sm text-white/70 hover:underline">
            ← All communities
          </Link>
          <h1 className="font-serif text-2xl font-semibold text-white mt-3">
            {community.name}
          </h1>
          <p className="text-sm text-white/60 mt-0.5">{community.description}</p>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="font-serif text-lg font-semibold text-foreground mb-4">
          Active Tenders
        </h2>

        {communityProjects.length === 0 ? (
          <p className="text-sm text-muted">
            No tracked tenders yet in {community.name}.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {communityProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}