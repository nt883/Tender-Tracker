import Link from "next/link";
import { Project } from "@/lib/types";

const statusStyles: Record<
  Project["status"],
  { label: string; text: string; bg: string; border: string; bar: string }
> = {
  in_progress: {
    label: "In Progress",
    text: "text-accent",
    bg: "bg-accent-bg",
    border: "border-l-accent",
    bar: "bg-accent",
  },
  complete: {
    label: "Complete",
    text: "text-success",
    bg: "bg-success-bg",
    border: "border-l-success",
    bar: "bg-success",
  },
  flagged: {
    label: "Flagged for Review",
    text: "text-warning",
    bg: "bg-warning-bg",
    border: "border-l-warning",
    bar: "bg-warning",
  },
};

export default function ProjectCard({
  project,
  contractorName,
  officialName,
}: {
  project: Project;
  contractorName: string;
  officialName: string;
}) {
  const spentPercent = Math.round((project.spent / project.budget) * 100);
  const style = statusStyles[project.status];

  return (
    <Link
      href={`/project/${project.id}`}
            className={`block border border-border ${style.border} border-l-4 bg-surface rounded-md hover:shadow-md transition-shadow`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-muted tracking-wide">{project.id}</p>
            <h3 className="font-serif text-lg font-semibold text-foreground mt-0.5">
              {project.description}
            </h3>
          </div>
          <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded ${style.bg} ${style.text}`}>
            {style.label}
          </span>
        </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted text-xs">Contractor</p>
            <p className="text-foreground">{contractorName}</p>
          </div>
          <div>
            <p className="text-muted text-xs">Official</p>
            <p className="text-foreground">{officialName}</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-xs text-muted mb-1">
            <span>
              R{project.spent.toLocaleString()} of R{project.budget.toLocaleString()} spent
            </span>
            <span>{spentPercent}%</span>
          </div>
          <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                        <div
              className={`h-full ${style.bar} rounded-full`}
              style={{ width: `${spentPercent}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}