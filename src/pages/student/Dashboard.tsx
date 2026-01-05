import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Briefcase, FileText, CheckCircle, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Applied Jobs', value: 12, icon: FileText, color: 'text-primary' },
  { label: 'Under Review', value: 5, icon: Clock, color: 'text-warning' },
  { label: 'Shortlisted', value: 3, icon: TrendingUp, color: 'text-accent' },
  { label: 'Offers', value: 1, icon: CheckCircle, color: 'text-success' },
];

const recentApplications = [
  { id: 1, job: 'Software Engineer', company: 'Tech Corp', status: 'Under Review', date: '2 days ago' },
  { id: 2, job: 'Frontend Developer', company: 'StartupX', status: 'Shortlisted', date: '5 days ago' },
  { id: 3, job: 'Data Analyst', company: 'DataWorks', status: 'Applied', date: '1 week ago' },
];

const recommendedJobs = [
  { id: 1, title: 'Backend Developer', company: 'CloudTech', location: 'Remote', match: 92 },
  { id: 2, title: 'Full Stack Engineer', company: 'InnoSoft', location: 'Bangalore', match: 88 },
  { id: 3, title: 'Software Intern', company: 'DevLabs', location: 'Hyderabad', match: 85 },
];

export default function StudentDashboard() {
  const profileCompletion = 75;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Student!</h1>
          <p className="text-muted-foreground">Here's what's happening with your applications.</p>
        </div>

        {/* Profile Completion */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Profile Completion</CardTitle>
              <span className="text-2xl font-bold text-primary">{profileCompletion}%</span>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={profileCompletion} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              Complete your profile to increase visibility to recruiters.
            </p>
            <Button variant="outline" size="sm" className="mt-3" asChild>
              <Link to="/student/profile">Complete Profile</Link>
            </Button>
          </CardContent>
        </Card>

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
          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Applications</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/student/applications">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">{app.job}</p>
                      <p className="text-sm text-muted-foreground">{app.company}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        app.status === 'Shortlisted' ? 'bg-success/10 text-success' :
                        app.status === 'Under Review' ? 'bg-warning/10 text-warning' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {app.status}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">{app.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Jobs */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recommended Jobs</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/student/jobs">Browse All</Link>
                </Button>
              </div>
              <CardDescription>Based on your skills and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{job.title}</p>
                        <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-success">{job.match}% match</span>
                      <Button size="icon" variant="ghost">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
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
