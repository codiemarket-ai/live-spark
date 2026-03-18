import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Clock, CheckCircle } from "lucide-react";
import { Layout } from "@/components/Layout";
import { courses, getInstructor } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

export default function Recording() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const session = courses.flatMap((c) => c.sessions).find((s) => s.id === sessionId);
  const course = courses.find((c) => c.sessions.some((s) => s.id === sessionId));
  const instructor = course ? getInstructor(course.instructorId) : null;
  const relatedSessions = course?.sessions.filter((s) => s.id !== sessionId && s.status === "recorded") || [];

  if (!session || !course) {
    return <Layout><div className="py-20 text-center text-muted-foreground">Recording not found</div></Layout>;
  }

  return (
    <Layout>
      <div className="py-12 md:py-20">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="aspect-video bg-card rounded-lg border border-border flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-card to-primary/5" />
              <button className="relative z-10 w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
                <Play className="w-8 h-8 text-primary ml-1" />
              </button>
            </div>

            <div>
              <Badge className="mb-3 bg-muted text-muted-foreground">{t("landing.recorded_badge")}</Badge>
              <h1 className="text-2xl font-bold text-foreground">{isRTL ? session.titleAr : session.title}</h1>
              <p className="text-sm text-muted-foreground mt-2">
                {isRTL ? course.titleAr : course.title} · {instructor && (isRTL ? instructor.nameAr : instructor.name)}
              </p>
              <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{session.duration}m</span>
                <span>{session.date}</span>
              </div>
            </div>

            {/* Progress */}
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{t("recording.progress")}</span>
                <span className="text-xs text-muted-foreground">45%</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "45%" }} />
              </div>
            </div>

            {/* Notes */}
            <div className="p-4 rounded-lg bg-card border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">{t("recording.notes")}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><CheckCircle className="w-3 h-3 text-success mt-1 flex-shrink-0" />Covered compound component pattern with context</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-3 h-3 text-success mt-1 flex-shrink-0" />Live coding: Built a custom Tabs component</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-3 h-3 text-success mt-1 flex-shrink-0" />Q&A: When to use render props vs hooks</li>
              </ul>
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">{t("recording.related")}</h3>
            {relatedSessions.map((s) => (
              <button
                key={s.id}
                onClick={() => navigate(`/recordings/${s.id}`)}
                className="w-full p-3 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors text-left"
              >
                <p className="text-sm font-medium text-foreground">{isRTL ? s.titleAr : s.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.date} · {s.duration}m</p>
              </button>
            ))}
            {relatedSessions.length === 0 && <p className="text-sm text-muted-foreground">No related recordings</p>}
          </div>
        </div>
      </div>
    </Layout>
  );
}