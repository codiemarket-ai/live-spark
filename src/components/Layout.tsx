import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, LayoutDashboard, Radio, User, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
  fullWidth?: boolean;
}

export function Layout({ children, showNav = true, fullWidth = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {showNav && <Navbar />}
      <main className={`${showNav ? "pt-16" : ""} ${fullWidth ? "" : "container mx-auto px-4"}`}>
        {children}
      </main>
      <MobileBottomNav />
    </div>
  );
}

function MobileBottomNav() {
  const { isAuthenticated, role } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();

  if (!isAuthenticated) return null;

  const links = [
    { to: "/", icon: Home, label: t("nav.home") },
    { to: "/courses", icon: BookOpen, label: t("nav.courses") },
    { to: "/dashboard", icon: LayoutDashboard, label: t("nav.dashboard") },
    ...(role === "instructor" ? [{ to: "/instructor", icon: Radio, label: "Teach" }] : []),
    ...(role === "admin" ? [{ to: "/admin", icon: Settings, label: t("nav.admin") }] : []),
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-surface border-t border-border">
      <div className="flex items-center justify-around h-14">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
              location.pathname === link.to ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <link.icon className="w-5 h-5" />
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}