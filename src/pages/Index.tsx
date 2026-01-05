import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  Briefcase,
  Users,
  Building,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Search,
  MapPin,
} from 'lucide-react';

const stats = [
  { label: 'Active Jobs', value: '2,500+', icon: Briefcase },
  { label: 'Companies', value: '500+', icon: Building },
  { label: 'Students Placed', value: '10,000+', icon: Users },
  { label: 'Placement Rate', value: '95%', icon: TrendingUp },
];

const features = [
  {
    title: 'Easy Job Discovery',
    description: 'Browse through thousands of job opportunities filtered by your skills and preferences.',
    icon: Search,
  },
  {
    title: 'Track Applications',
    description: 'Monitor your application status in real-time from applied to selected.',
    icon: CheckCircle,
  },
  {
    title: 'Top Companies',
    description: 'Connect with leading companies actively hiring fresh talent.',
    icon: Building,
  },
];

const featuredJobs = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Tech Corp',
    location: 'Bangalore',
    type: 'Full-time',
    salary: '₹12-18 LPA',
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'StartupX',
    location: 'Mumbai',
    type: 'Full-time',
    salary: '₹15-22 LPA',
  },
  {
    id: 3,
    title: 'Data Analyst Intern',
    company: 'DataWorks',
    location: 'Remote',
    type: 'Internship',
    salary: '₹25K/month',
  },
];

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="gradient-hero py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Launch Your Career with{' '}
              <span className="text-accent">Top Companies</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in">
              Connect with leading recruiters, discover opportunities, and take the next step in your professional journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <Link to="/signup">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/jobs">Browse Jobs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-3">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose JobPortal?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We streamline the placement process for students, recruiters, and administrators.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg gradient-primary text-primary-foreground mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Jobs</h2>
              <p className="text-muted-foreground">Latest opportunities from top companies</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/jobs">View All Jobs</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <div key={job.id} className="p-6 rounded-xl border bg-card hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <p className="text-muted-foreground">{job.company}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    job.type === 'Full-time' ? 'bg-success/10 text-success' : 'bg-accent/10 text-accent'
                  }`}>
                    {job.type}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </span>
                  <span>{job.salary}</span>
                </div>
                <Button className="w-full" variant="outline">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary">
        <div className="container text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students and recruiters already using JobPortal to connect and grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup?role=student">I'm a Student</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/signup?role=recruiter">I'm a Recruiter</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
