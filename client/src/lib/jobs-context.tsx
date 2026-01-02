import React, { createContext, useContext, useState, useEffect } from 'react';

export type JobStatus = 'Applied' | 'Under Review' | 'Interview' | 'Offer' | 'Rejected' | 'Interested';

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  dateApplied: string; // ISO date string
  status: JobStatus;
  link?: string;
  notes?: string;
  salary?: string;
  isOpportunity: boolean; // if true, it's in the "Upcoming/New Opportunity" list
}

interface JobsContextType {
  jobs: JobApplication[];
  addJob: (job: Omit<JobApplication, 'id'>) => void;
  updateJob: (id: string, updates: Partial<JobApplication>) => void;
  deleteJob: (id: string) => void;
  moveOpportunityToApplied: (id: string) => void;
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

const SEED_DATA: JobApplication[] = [
  {
    id: '1',
    company: 'TechCorp',
    role: 'Frontend Engineer',
    dateApplied: '2024-05-15',
    status: 'Applied',
    link: 'https://careers.techcorp.com',
    notes: 'Great culture, heavy on React.',
    isOpportunity: false,
  },
  {
    id: '2',
    company: 'InnovateX',
    role: 'UX Developer',
    dateApplied: '2024-05-10',
    status: 'Interview',
    link: 'https://innovatex.io/jobs',
    notes: 'Phone screen passed. Technical round next Tuesday.',
    salary: '$120k - $140k',
    isOpportunity: false,
  },
  {
    id: '3',
    company: 'StartupGrid',
    role: 'Full Stack Dev',
    dateApplied: '2024-05-01',
    status: 'Rejected',
    notes: 'They wanted more Java experience.',
    isOpportunity: false,
  },
  {
    id: '4',
    company: 'NextLevel Systems',
    role: 'Product Designer',
    dateApplied: '2024-05-18',
    status: 'Interested',
    link: 'https://nextlevel.com/careers',
    notes: 'Need to update portfolio before applying.',
    isOpportunity: true,
  },
  {
    id: '5',
    company: 'CloudScale',
    role: 'React Native Engineer',
    dateApplied: '2024-05-20',
    status: 'Interested',
    isOpportunity: true,
  },
];

export function JobsProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<JobApplication[]>(SEED_DATA);

  const addJob = (job: Omit<JobApplication, 'id'>) => {
    const newJob = { ...job, id: Math.random().toString(36).substr(2, 9) };
    setJobs((prev) => [newJob, ...prev]);
  };

  const updateJob = (id: string, updates: Partial<JobApplication>) => {
    setJobs((prev) => prev.map((job) => (job.id === id ? { ...job, ...updates } : job)));
  };

  const deleteJob = (id: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const moveOpportunityToApplied = (id: string) => {
    updateJob(id, { 
      isOpportunity: false, 
      status: 'Applied', 
      dateApplied: new Date().toISOString().split('T')[0] 
    });
  };

  return (
    <JobsContext.Provider value={{ jobs, addJob, updateJob, deleteJob, moveOpportunityToApplied }}>
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
}
