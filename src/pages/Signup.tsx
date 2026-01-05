import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Briefcase, GraduationCap, Building, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Signup() {
  const [searchParams] = useSearchParams();
  const defaultRole = (searchParams.get('role') as UserRole) || 'student';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>(defaultRole);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      await signup(name, email, password, role);
      toast({
        title: 'Account created!',
        description: 'Welcome to JobPortal.',
      });
      navigate(role === 'student' ? '/student/dashboard' : role === 'recruiter' ? '/recruiter/dashboard' : '/admin/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    { value: 'student', label: 'Student', icon: GraduationCap, description: 'Looking for jobs and internships' },
    { value: 'recruiter', label: 'Recruiter', icon: Building, description: 'Hiring for your company' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-12">
        <div className="max-w-md text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">Start your journey today</h2>
          <p className="text-lg opacity-90">
            Create your account and get access to thousands of opportunities. Whether you're a student or recruiter, we've got you covered.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-primary-foreground/10">
              <div className="text-2xl font-bold">2,500+</div>
              <div className="text-sm opacity-80">Active Jobs</div>
            </div>
            <div className="p-4 rounded-lg bg-primary-foreground/10">
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm opacity-80">Placement Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">JobPortal</span>
            </Link>
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-muted-foreground mt-2">Join our platform to get started</p>
          </div>

          <Tabs value={role} onValueChange={(v) => setRole(v as UserRole)} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              {roleOptions.map((option) => (
                <TabsTrigger key={option.value} value={option.value} className="flex items-center gap-2">
                  <option.icon className="h-4 w-4" />
                  {option.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {roleOptions.map((option) => (
              <TabsContent key={option.value} value={option.value}>
                <p className="text-sm text-muted-foreground text-center mt-2 mb-4">
                  {option.description}
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{role === 'recruiter' ? 'Company Name' : 'Full Name'}</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder={role === 'recruiter' ? 'Acme Inc.' : 'John Doe'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? 'Creating account...' : 'Create account'}
                  </Button>
                </form>
              </TabsContent>
            ))}
          </Tabs>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
