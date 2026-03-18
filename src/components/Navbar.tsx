import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell, Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { notifications } from "@/data/mockData";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user, logout, role } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const isRTL = i18n.language === "ar";
  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleLang = () => {
    const next = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(next);
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = next;
  };

  const dashboardPath = role === "admin" ? "/admin" : role === "instructor" ? "/instructor" : "/dashboard";

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/courses", label: t("nav.courses") },
    ...(isAuthenticated ? [{ to: dashboardPath, label: t("nav.dashboard") }] : []),
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-surface border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">SF</span>
          </div>
          <span className="font-bold text-lg text-foreground">SkillForge</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.to ? "text-primary" : "text-muted-foreground"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={toggleLang} className="p-2 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
            <Globe className="w-4 h-4" />
            <span className="ml-1 text-xs">{isRTL ? "EN" : "AR"}</span>
          </button>

          {isAuthenticated && (
            <div className="relative">
              <button onClick={() => setNotifOpen(!notifOpen)} className="p-2 rounded-md hover:bg-secondary transition-colors relative text-muted-foreground hover:text-foreground">
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-live text-[10px] font-bold flex items-center justify-center text-foreground">
                    {unreadCount}
                  </span>
                )}
              </button>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-12 w-80 glass-surface rounded-lg shadow-xl border border-border p-2"
                >
                  {notifications.map((n) => (
                    <div key={n.id} className={`p-3 rounded-md text-sm ${n.read ? "text-muted-foreground" : "text-foreground bg-secondary/50"}`}>
                      <p>{isRTL ? n.messageAr : n.message}</p>
                      <span className="text-xs text-muted-foreground">{n.timestamp}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                {user?.avatar}
              </div>
              <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground">
                {t("nav.login")}
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">{t("nav.login")}</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">{t("nav.signup")}</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-foreground">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="md:hidden glass-surface border-t border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary py-2">
                {link.label}
              </Link>
            ))}
            <button onClick={toggleLang} className="text-sm text-muted-foreground py-2 text-left">
              {isRTL ? "English" : "العربية"}
            </button>
            {!isAuthenticated && (
              <div className="flex gap-2 pt-2">
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" size="sm">{t("nav.login")}</Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="bg-primary text-primary-foreground">{t("nav.signup")}</Button>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}