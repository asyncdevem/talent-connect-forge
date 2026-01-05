import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Building, Briefcase, TrendingUp, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Total Students', value: '2,450', icon: Users, color: 'text-primary', change: '+12%' },
  { label: 'Total Recruiters', value: '156', icon: Building, color: 'text-accent', change: '+8%' },
  { label: 'Active Jobs', value: '324', icon: Briefcase, color: 'text-success', change: '+15%' },
  { label: 'Placements', value: '892', icon: TrendingUp, color: 'text-warning', change: '+22%' },
];

const pendingApprovals = [
  { id: 1, type: 'Recruiter', name: 'TechStart Inc.', email: 'hr@techstart.com', submitted: '2 hours ago' },
  { id: 2, type: 'Job', name: 'Senior Developer at CloudSoft', company: 'CloudSoft', submitted: '5 hours ago' },
  { id: 3, type: 'Recruiter', name: 'Innovation Labs', email: 'careers@innovlabs.com', submitted: '1 day ago' },
];

const recentPlacements = [
  { id: 1, student: 'Ankit Verma', company: 'Google', role: 'Software Engineer', package: '₹45 LPA' },
  { id: 2, student: 'Sneha Reddy', company: 'Microsoft', role: 'Product Manager', package: '₹38 LPA' },
  { id: 3, student: 'Karan Singh', company: 'Amazon', role: 'SDE-1', package: '₹32 LPA' },
];

const placementsByBranch = [
  { branch: 'Computer Science', placed: 245, total: 280, percentage: 87.5 },
  { branch: 'Electronics', placed: 180, total: 220, percentage: 81.8 },
  { branch: 'Mechanical', placed: 120, total: 180, percentage: 66.7 },
  { branch: 'Civil', placed: 80, total: 150, percentage: 53.3 },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of the placement portal.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-success">{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle>Pending Approvals</CardTitle>
                  <span className="h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                    {pendingApprovals.length}
                  </span>
                </div>
              </div>
              <CardDescription>Recruiters and jobs awaiting approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((item) => (
                  <div key={item.id} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.type === 'Recruiter' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'
                        }`}>
                          {item.type}
                        </span>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{item.submitted}</span>
                      </div>
                    </div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.email || item.company}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="bg-success hover:bg-success/90">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Placements */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Placements</CardTitle>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <CardDescription>Latest student placements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPlacements.map((placement) => (
                  <div key={placement.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                        {placement.student.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{placement.student}</p>
                        <p className="text-sm text-muted-foreground">{placement.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{placement.company}</p>
                      <p className="text-sm text-success font-semibold">{placement.package}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Placements by Branch */}
        <Card>
          <CardHeader>
            <CardTitle>Placements by Branch</CardTitle>
            <CardDescription>Current placement statistics across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {placementsByBranch.map((branch) => (
                <div key={branch.branch} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{branch.branch}</span>
                    <span className="text-muted-foreground">{branch.placed}/{branch.total} ({branch.percentage}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full gradient-primary transition-all duration-500"
                      style={{ width: `${branch.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
