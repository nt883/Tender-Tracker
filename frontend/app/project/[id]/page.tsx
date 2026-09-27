import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/mockData";
import { Expense, Milestone } from "@/lib/types";

const milestoneStyles: Record<Milestone["status"], { label: string; text: string; bg: string }> = {
  done: { label: "Done", text: "text-success", bg: "bg-success-bg" },
  in_progress: { label: "In Progress", text: "text-accent", bg: "bg-accent/10" },
  pending: { label: "Pending", text: "text-muted", bg: "bg-border/40" },
};

function ExpenseRow({ expense }: { expense: Expense }) {
  return (
    <tr className="border-b border-border last:border-b-0">
      <td className="py-3 pr-4 text-sm text-foreground">{expense.item}</td>
      <td className="py-3 pr-4 text-sm text-muted">{expense.quantity.toLocaleString()}</td>
      <td className="py-3 pr-4 text-sm text-muted">R{expense.unitPrice.toLocaleString()}</td>
      <td className="py-3 pr-4 text-sm text-muted">{expense.supplier}</td>
      <td className="py-3 pr-4 text-sm text-foreground">R{expense.total.toLocaleString()}</td>
      <td className="py-3">
        {expense.status === "verified" ? (
          <span className="text-xs font-medium px-2.5 py-1 rounded bg-success-bg text-success">
            Verified
          </span>
        ) : (
          <span className="text-xs font-medium px-2.5 py-1 rounded bg-warning-bg text-warning">
            Flagged for Review
          </span>
        )}
      </td>
    </tr>
  );
}

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  const spentPercent = Math.round((project.spent / project.budget) * 100);
  const flaggedExpenses = project.expenses.filter((e) => e.status === "flagged");

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <Link href="/" className="text-sm text-accent hover:underline">
            ← Back to all tenders
          </Link>
          <p className="text-xs font-medium text-muted tracking-wide mt-3">{project.id}</p>
          <h1 className="font-serif text-2xl font-semibold text-foreground mt-0.5">
            {project.description}
          </h1>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {/* Overview */}
        <div className="grid sm:grid-cols-2 gap-6 bg-surface border border-border rounded-md p-6">
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-muted text-xs">Contractor</p>
              <p className="text-foreground">{project.contractor}</p>
            </div>
            <div>
              <p className="text-muted text-xs">Recorded by (official)</p>
              <p className="text-foreground">{project.official}</p>
            </div>
            <div>
              <p className="text-muted text-xs">Budget</p>
              <p className="text-foreground">R{project.budget.toLocaleString()}</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-muted mb-1">
              <span>
                R{project.spent.toLocaleString()} of R{project.budget.toLocaleString()} spent
              </span>
              <span>{spentPercent}%</span>
            </div>
            <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: `${spentPercent}%` }} />
            </div>

            {flaggedExpenses.length > 0 && (
              <div className="mt-4 bg-warning-bg border border-warning/30 rounded-md p-3">
                <p className="text-xs font-medium text-warning">
                  {flaggedExpenses.length} expense{flaggedExpenses.length > 1 ? "s" : ""} flagged for review
                </p>
                <p className="text-xs text-warning/90 mt-1">{flaggedExpenses[0].flagReason}</p>
              </div>
            )}
          </div>
        </div>

        {/* Official vs Community status */}
        <div>
          <h2 className="font-serif text-lg font-semibold text-foreground mb-3">Status</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-surface border border-border rounded-md p-4">
              <p className="text-xs text-muted mb-1">Official status</p>
              <p className="text-sm font-medium text-foreground">{project.officialStatus}</p>
            </div>
            <div className="bg-surface border border-border rounded-md p-4">
              <p className="text-xs text-muted mb-1">
                Community status
                {project.communityVotePercent && (
                  <span className="ml-2 text-accent">
                    · {project.communityVotePercent}% of residents confirm
                  </span>
                )}
              </p>
              <p className="text-sm font-medium text-foreground">{project.communityStatus}</p>
            </div>
          </div>
        </div>

        {/* Expenditure Ledger */}
        <div>
          <h2 className="font-serif text-lg font-semibold text-foreground mb-3">Expenditure Ledger</h2>
          <div className="bg-surface border border-border rounded-md overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-3 px-4 text-xs font-medium text-muted">Item</th>
                  <th className="py-3 px-4 text-xs font-medium text-muted">Qty</th>
                  <th className="py-3 px-4 text-xs font-medium text-muted">Unit Price</th>
                  <th className="py-3 px-4 text-xs font-medium text-muted">Supplier</th>
                  <th className="py-3 px-4 text-xs font-medium text-muted">Total</th>
                  <th className="py-3 px-4 text-xs font-medium text-muted">Status</th>
                </tr>
              </thead>
              <tbody className="px-4">
                {project.expenses.map((expense, i) => (
                  <ExpenseRow key={i} expense={expense} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Milestones */}
        <div>
          <h2 className="font-serif text-lg font-semibold text-foreground mb-3">Milestones</h2>
          <div className="flex flex-wrap gap-3">
            {project.milestones.map((m) => (
              <span
                key={m.name}
                className={`text-sm px-3 py-1.5 rounded-md ${milestoneStyles[m.status].bg} ${milestoneStyles[m.status].text}`}
              >
                {m.name} — {milestoneStyles[m.status].label}
              </span>
            ))}
          </div>
        </div>

        {/* Report CTA */}
        <div className="border-t border-border pt-6">
          <Link
            href={`/project/${project.id}/report`}
            className="inline-block bg-accent text-white text-sm font-medium px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity"
          >
            Report an issue with this project
          </Link>
        </div>
      </section>
    </main>
  );
}