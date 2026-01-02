import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import type { JobApplication } from "@/lib/jobs-context";
import { Calendar, ExternalLink, MapPin, DollarSign, MoreHorizontal, Briefcase, Trash2, Edit2, ArrowUpRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface JobCardProps {
  job: JobApplication;
  onEdit: (job: JobApplication) => void;
  onDelete: (id: string) => void;
  onMoveToApplied?: (id: string) => void;
}

export function JobCard({ job, onEdit, onDelete, onMoveToApplied }: JobCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow group animate-in fade-in slide-in-from-bottom-2 duration-500">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1.5">
          <CardTitle className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
            {job.role}
          </CardTitle>
          <CardDescription className="text-sm font-medium text-foreground/80 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-muted-foreground" />
            {job.company}
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={job.status} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" data-testid={`menu-${job.id}`}>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(job)}>
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              {job.isOpportunity && onMoveToApplied && (
                 <DropdownMenuItem onClick={() => onMoveToApplied(job.id)}>
                   <ArrowUpRight className="w-4 h-4 mr-2" />
                   Move to Applied
                 </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onDelete(job.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pb-3">
        <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>{job.isOpportunity ? 'Added: ' : 'Applied: '}{job.dateApplied}</span>
          </div>
          {job.salary && (
            <div className="flex items-center gap-2 text-foreground/80">
              <DollarSign className="w-3.5 h-3.5" />
              <span>{job.salary}</span>
            </div>
          )}
          {job.notes && (
             <p className="line-clamp-2 mt-1 text-xs bg-muted/50 p-2 rounded-md italic">
               "{job.notes}"
             </p>
          )}
        </div>
      </CardContent>
      {job.link && (
        <CardFooter className="pt-0">
          <Button variant="link" size="sm" className="h-auto p-0 text-xs text-primary/80 hover:text-primary" asChild>
            <a href={job.link} target="_blank" rel="noopener noreferrer">
              View Job Posting <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
