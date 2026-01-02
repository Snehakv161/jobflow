import { useState } from "react";
import { useJobs, JobApplication } from "@/lib/jobs-context";
import { JobCard } from "@/components/JobCard";
import { JobModal } from "@/components/JobModal";
import { Button } from "@/components/ui/button";
import { Plus, Star } from "lucide-react";

export default function Opportunities() {
  const { jobs, addJob, updateJob, deleteJob, moveOpportunityToApplied } = useJobs();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobApplication | undefined>(undefined);

  const opportunities = jobs.filter((j) => j.isOpportunity);

  const handleEdit = (job: JobApplication) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const handleModalClose = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) setEditingJob(undefined);
  };

  const handleFormSubmit = (data: any) => {
    if (editingJob) {
      updateJob(editingJob.id, data);
    } else {
      addJob({ ...data, isOpportunity: true });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading flex items-center gap-2">
            <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
            Opportunities
          </h1>
          <p className="text-muted-foreground">Jobs you are interested in but haven't applied to yet.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="w-full md:w-auto bg-amber-600 hover:bg-amber-700">
          <Plus className="w-4 h-4 mr-2" /> Add Opportunity
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map((job) => (
          <JobCard 
            key={job.id} 
            job={job} 
            onEdit={handleEdit} 
            onDelete={deleteJob}
            onMoveToApplied={moveOpportunityToApplied}
          />
        ))}
        {opportunities.length === 0 && (
           <div className="col-span-full py-16 text-center border-2 border-dashed rounded-xl bg-muted/20">
             <Star className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
             <p className="text-lg font-medium text-muted-foreground">No opportunities saved yet.</p>
             <p className="text-sm text-muted-foreground/80">Save jobs here that you want to apply to later.</p>
             <Button variant="outline" className="mt-4" onClick={() => setIsModalOpen(true)}>
               Add Your First Opportunity
             </Button>
           </div>
        )}
      </div>

      <JobModal 
        open={isModalOpen} 
        onOpenChange={handleModalClose}
        onSubmit={handleFormSubmit}
        defaultValues={editingJob}
        isOpportunity={true}
      />
    </div>
  );
}
