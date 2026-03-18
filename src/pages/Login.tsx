import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login(email, password);
    navigate("/dashboard");
  };

  return (
    <Layout>
      <div className="py-20 md:py-32 flex justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-1">{t("auth.login_title")}</h1>
            <p className="text-sm text-muted-foreground">{t("auth.login_subtitle")}</p>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">{t("auth.email")}</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} className="bg-secondary border-border" placeholder="you@example.com" type="email" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">{t("auth.password")}</label>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} className="bg-secondary border-border" type="password" placeholder="••••••••" />
            </div>
            <Button onClick={handleLogin} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold active:scale-[0.97] transition-transform" size="lg">
              {t("auth.login")}
            </Button>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            {t("auth.no_account")} <Link to="/signup" className="text-primary hover:underline">{t("nav.signup")}</Link>
          </p>
        </motion.div>
      </div>
    </Layout>
  );
}