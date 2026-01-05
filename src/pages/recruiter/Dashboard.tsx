import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, UserCheck, Clock, Plus, ArrowRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Active Jobs', value: 8, icon: Briefcase, color: 'text-primary' },
  { label: 'Total Applicants', value: 156, icon: Users, color: 'text-accent' },
  { label: 'Shortlisted', value: 24, icon: UserCheck, color: 'text-success' },
  { label: 'Pending Review', value: 42, icon: Clock, color: 'text-warning' },
];

const activeJobs = [
  { id: 1, title: 'Software Engineer', applicants: 45, shortlisted: 8, status: 'Active', posted: '3 days ago' },
  { id: 2, title: 'Product Manager', applicants: 32, shortlisted: 5, status: 'Active', posted: '1 week ago' },
  { id: 3, title: 'Data Analyst', applicants: 28, shortlisted: 4, status: 'Active', posted: '2 weeks ago' },
];

const recentApplicants = [
  { id: 1, name: 'Rahul Sharma', job: 'Software Engineer', college: 'IIT Delhi', cgpa: 8.5, applied: '2 hours ago' },
  { id: 2, name: 'Priya Patel', job: 'Product Manager', college: 'IIM Bangalore', cgpa: 8.2, applied: '5 hours ago' },
  { id: 3, name: 'Amit Kumar', job: 'Data Analyst', college: 'NIT Trichy', cgpa: 8.8, applied: '1 day ago' },
];

export default function RecruiterDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
            <p className="text-muted-foreground">Manage your job postings and applications.</p>
          </div>
          <Button asChild>
            <Link to="/recruiter/jobs/new">
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Active Job Postings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Job Postings</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/recruiter/jobs">Manage All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeJobs.map((job) => (
                  <div key={job.id} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{job.title}</h3>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                        {job.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span>{job.applicants} applicants</span>
                      <span>{job.shortlisted} shortlisted</span>
                      <span>{job.posted}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View Applications
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Applicants */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Applicants</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/recruiter/applications">View All</Link>
                </Button>
              </div>
              <CardDescription>Latest applications across all jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplicants.map((applicant) => (
                  <div key={applicant.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {applicant.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{applicant.name}</p>
                        <p className="text-sm text-muted-foreground">{applicant.college} • CGPA: {applicant.cgpa}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{applicant.job}</p>
                      <p className="text-xs text-muted-foreground">{applicant.applied}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
