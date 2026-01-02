import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useJobs } from "@/lib/jobs-context";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Briefcase, CheckCircle2, XCircle, Clock, Star } from "lucide-react";

export default function Dashboard() {
  const { jobs } = useJobs();
  
  const appliedJobs = jobs.filter(j => !j.isOpportunity);
  const opportunities = jobs.filter(j => j.isOpportunity);
  
  const stats = {
    total: appliedJobs.length,
    interview: appliedJobs.filter(j => j.status === 'Interview').length,
    offer: appliedJobs.filter(j => j.status === 'Offer').length,
    rejected: appliedJobs.filter(j => j.status === 'Rejected').length,
    opportunities: opportunities.length
  };

  const chartData = [
    { name: 'Applied', count: appliedJobs.filter(j => j.status === 'Applied').length, color: 'hsl(var(--primary))' },
    { name: 'Review', count: appliedJobs.filter(j => j.status === 'Under Review').length, color: 'hsl(47, 95%, 49%)' },
    { name: 'Interview', count: appliedJobs.filter(j => j.status === 'Interview').length, color: 'hsl(270, 60%, 55%)' },
    { name: 'Offer', count: appliedJobs.filter(j => j.status === 'Offer').length, color: 'hsl(160, 84%, 39%)' },
    { name: 'Rejected', count: appliedJobs.filter(j => j.status === 'Rejected').length, color: 'hsl(340, 82%, 52%)' },
  ].filter(d => d.count > 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-heading">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your job search progress.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applied</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.interview}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offers</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.offer}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Opportunities</CardTitle>
            <Star className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.opportunities}</div>
            <p className="text-xs text-muted-foreground">Saved for later</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                />
                <YAxis 
                   tickLine={false} 
                   axisLine={false} 
                   allowDecimals={false}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity / Quick List */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appliedJobs.slice(0, 4).map((job) => (
                <div key={job.id} className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{job.company}</p>
                    <p className="text-xs text-muted-foreground">{job.role}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${
                      job.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                      job.status === 'Offer' ? 'bg-emerald-100 text-emerald-700' :
                      job.status === 'Interview' ? 'bg-purple-100 text-purple-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                </div>
              ))}
              {appliedJobs.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No applications yet. Start applying!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
