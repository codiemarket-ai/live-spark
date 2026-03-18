import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function InstructorApplication() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <Layout>
        <div className="py-20 md:py-32 flex flex-col items-center text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-success" />
          </motion.div>
          <h1 className="text-2xl font-bold text-foreground mb-2">{t("instructor.pending")}</h1>
          <p className="text-muted-foreground">We'll review your application and get back to you soon.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 md:py-20 max-w-xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t("instructor.application_title")}</h1>
            <p className="text-muted-foreground">{t("instructor.application_subtitle")}</p>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border space-y-5">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">{t("auth.name")}</label>
              <Input className="bg-secondary border-border" placeholder="Your full name" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">{t("auth.email")}</label>
              <Input className="bg-secondary border-border" placeholder="you@example.com" type="email" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">{t("instructor.bio")}</label>
              <Textarea className="bg-secondary border-border" placeholder="Tell us about yourself and your teaching experience..." rows={4} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">{t("instructor.expertise")}</label>
              <Input className="bg-secondary border-border" placeholder="e.g., React, Python, UX Design" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">{t("instructor.sample_content")}</label>
              <Input className="bg-secondary border-border" placeholder="https://..." />
            </div>
            <Button
              onClick={() => setSubmitted(true)}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold active:scale-[0.97] transition-transform"
              size="lg"
            >
              {t("instructor.submit_application")}
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}