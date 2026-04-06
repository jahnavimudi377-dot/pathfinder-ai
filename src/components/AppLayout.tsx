import { ReactNode, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Compass, LayoutDashboard, MessageCircle, User, Settings, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Compass, label: "Explore", path: "/onboarding" },
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: MessageCircle, label: "Chat", path: "/chat" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const AppLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Hide sidebar on landing and onboarding
  const hideSidebar = location.pathname === "/" || location.pathname === "/onboarding";

  if (hideSidebar) return <>{children}</>;

  return (
    <div className="flex min-h-screen w-full">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card p-4 gap-2">
        <div className="flex items-center gap-2 px-3 py-4 mb-4">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Compass size={18} className="text-primary-foreground" />
          </div>
          <span className="font-bold text-lg">CareerAI</span>
        </div>
        {navItems.map((item) => {
          // Redirect explore to careers if onboarding complete
          const path = item.path === "/onboarding" && user.completedOnboarding ? "/careers" : item.path;
          const label = item.path === "/onboarding" && user.completedOnboarding ? "Explore" : item.label;
          const isActive = location.pathname === path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(path)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "gradient-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <item.icon size={18} />
              {label}
            </button>
          );
        })}
        {user.name && (
          <div className="mt-auto pt-4 border-t border-border">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium">{user.name}</span>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
            <Compass size={14} className="text-primary-foreground" />
          </div>
          <span className="font-bold">CareerAI</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur pt-16 p-4 animate-fade-in">
          <div className="space-y-2">
            {navItems.map((item) => {
              const path = item.path === "/onboarding" && user.completedOnboarding ? "/careers" : item.path;
              const label = item.path === "/onboarding" && user.completedOnboarding ? "Explore" : item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    navigate(path);
                    setMobileOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium ${
                    location.pathname === path
                      ? "gradient-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent"
                  }`}
                >
                  <item.icon size={20} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:pt-0 pt-14 overflow-y-auto">{children}</main>
    </div>
  );
};

export default AppLayout;
