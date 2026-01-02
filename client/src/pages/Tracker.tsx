import { useState } from "react";
import { useJobs, JobApplication } from "@/lib/jobs-context";
import { JobCard } from "@/components/JobCard";
import { JobModal } from "@/components/JobModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Tracker() {
  const { jobs, addJob, updateJob, deleteJob } = useJobs();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobApplication | undefined>(undefined);

  const filteredJobs = jobs
    .filter((j) => !j.isOpportunity)
    .filter((j) => {
      const matchesSearch = 
        j.company.toLowerCase().includes(search.toLowerCase()) || 
        j.role.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || j.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

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
      addJob({ ...data, isOpportunity: false });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading">Application Tracker</h1>
          <p className="text-muted-foreground">Manage your active job applications.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="w-full md:w-auto">
          <Plus className="w-4 h-4 mr-2" /> Add Application
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center bg-card p-4 rounded-lg border shadow-sm">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search company or role..." 
            className="pl-9" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full md:w-[200px]">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
             <SelectTrigger>
               <div className="flex items-center gap-2">
                 <Filter className="w-4 h-4 text-muted-foreground" />
                 <SelectValue placeholder="Filter by Status" />
               </div>
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="all">All Statuses</SelectItem>
               <SelectItem value="Applied">Applied</SelectItem>
               <SelectItem value="Under Review">Under Review</SelectItem>
               <SelectItem value="Interview">Interview</SelectItem>
               <SelectItem value="Offer">Offer</SelectItem>
               <SelectItem value="Rejected">Rejected</SelectItem>
             </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <JobCard 
            key={job.id} 
            job={job} 
            onEdit={handleEdit} 
            onDelete={deleteJob} 
          />
        ))}
        {filteredJobs.length === 0 && (
           <div className="col-span-full py-12 text-center text-muted-foreground">
             <p>No applications found matching your criteria.</p>
           </div>
        )}
      </div>

      <JobModal 
        open={isModalOpen} 
        onOpenChange={handleModalClose}
        onSubmit={handleFormSubmit}
        defaultValues={editingJob}
        isOpportunity={false}
      />
    </div>
  );
}
