import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { JobStatus } from "@/lib/jobs-context";

const statusConfig: Record<JobStatus, { color: string; label: string }> = {
  Applied: { color: "bg-blue-100 text-blue-700 border-blue-200", label: "Applied" },
  "Under Review": { color: "bg-amber-100 text-amber-700 border-amber-200", label: "Under Review" },
  Interview: { color: "bg-purple-100 text-purple-700 border-purple-200", label: "Interview" },
  Offer: { color: "bg-emerald-100 text-emerald-700 border-emerald-200", label: "Offer" },
  Rejected: { color: "bg-rose-100 text-rose-700 border-rose-200", label: "Rejected" },
  Interested: { color: "bg-slate-100 text-slate-700 border-slate-200", label: "Interested" },
};

export function StatusBadge({ status }: { status: JobStatus }) {
  const config = statusConfig[status] || statusConfig.Applied;
  
  return (
    <Badge 
      variant="outline" 
      className={cn("font-normal border px-2.5 py-0.5 rounded-full", config.color)}
      data-testid={`status-${status}`}
    >
      {config.label}
    </Badge>
  );
}
