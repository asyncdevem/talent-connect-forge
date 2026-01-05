import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Briefcase,
  LayoutDashboard,
  User,
  FileText,
  Building,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  Bell,
  Search,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

const studentNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/student/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'Browse Jobs', href: '/student/jobs', icon: <Briefcase className="h-5 w-5" /> },
  { label: 'My Applications', href: '/student/applications', icon: <FileText className="h-5 w-5" /> },
  { label: 'Profile', href: '/student/profile', icon: <User className="h-5 w-5" /> },
  { label: 'Settings', href: '/student/settings', icon: <Settings className="h-5 w-5" /> },
];

const recruiterNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/recruiter/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'Job Postings', href: '/recruiter/jobs', icon: <Briefcase className="h-5 w-5" /> },
  { label: 'Applications', href: '/recruiter/applications', icon: <FileText className="h-5 w-5" /> },
  { label: 'Company Profile', href: '/recruiter/profile', icon: <Building className="h-5 w-5" /> },
  { label: 'Settings', href: '/recruiter/settings', icon: <Settings className="h-5 w-5" /> },
];

const adminNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'Users', href: '/admin/users', icon: <Users className="h-5 w-5" /> },
  { label: 'Jobs', href: '/admin/jobs', icon: <Briefcase className="h-5 w-5" /> },
  { label: 'Companies', href: '/admin/companies', icon: <Building className="h-5 w-5" /> },
  { label: 'Settings', href: '/admin/settings', icon: <Settings className="h-5 w-5" /> },
];

const getNavItems = (role: UserRole): NavItem[] => {
  switch (role) {
    case 'student': return studentNavItems;
    case 'recruiter': return recruiterNavItems;
    case 'admin': return adminNavItems;
    default: return [];
  }
};

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (!user) {
    return null;
  }

  const navItems = getNavItems(user.role);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300",
          sidebarCollapsed ? "w-16" : "w-64",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
            {!sidebarCollapsed && (
              <Link to="/" className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
                  <Briefcase className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-sidebar-foreground">JobPortal</span>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-sidebar-foreground hover:bg-sidebar-accent hidden md:flex"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <ChevronLeft className={cn("h-5 w-5 transition-transform", sidebarCollapsed && "rotate-180")} />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-colors",
                  location.pathname === item.href
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "hover:bg-sidebar-accent"
                )}
              >
                {item.icon}
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="border-t border-sidebar-border p-4">
            <div className={cn("flex items-center gap-3", sidebarCollapsed && "justify-center")}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-foreground">
                <User className="h-5 w-5" />
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-sidebar-foreground">{user.name}</p>
                  <p className="truncate text-xs text-sidebar-foreground/70 capitalize">{user.role}</p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              className={cn(
                "mt-3 w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent",
                sidebarCollapsed && "justify-center px-0"
              )}
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              {!sidebarCollapsed && <span className="ml-3">Logout</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-foreground/20 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={cn("transition-all duration-300", sidebarCollapsed ? "md:ml-16" : "md:ml-64")}>
        {/* Top Header */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-card/95 backdrop-blur px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="h-10 w-64 rounded-lg border bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
