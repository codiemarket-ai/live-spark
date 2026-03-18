import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Clock, Users, Calendar, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/Layout";
import { SessionCard } from "@/components/SessionCard";
import { getCourse, getInstructor } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const course = getCourse(id || "");
  const instructor = course ? getInstructor(course.instructorId) : null;

  if (!course) {
    return (
      <Layout>
        <div className="py-20 text-center text-muted-foreground">Course not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 md:py-20">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <Badge className="mb-4 bg-primary/20 text-primary">{course.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {isRTL ? course.titleAr : course.title}
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                {isRTL ? course.descriptionAr : course.description}
              </p>

              <div className="flex items-center gap-6 mt-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="w-4 h-4" />{course.studentsCount} {t("courses.students")}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{course.sessionsCount} {t("courses.sessions")}</span>
              </div>
            </div>

            {/* Instructor */}
            {instructor && (
              <div className="p-6 rounded-lg bg-card border border-border">
                <h3 className="text-sm font-semibold text-muted-foreground mb-4">{t("courses.about_instructor")}</h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {instructor.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{isRTL ? instructor.nameAr : instructor.name}</p>
                    <p className="text-sm text-muted-foreground">{isRTL ? instructor.bioAr : instructor.bio}</p>
                    <div className="flex gap-2 mt-2">
                      {instructor.expertise.map((e) => (
                        <Badge key={e} variant="secondary" className="text-[10px]">{e}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sessions */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">{t("courses.schedule")}</h3>
              <div className="space-y-3">
                {course.sessions.map((session) => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    showJoin
                    onJoin={() => navigate(`/classroom/${session.id}`)}
                  />
                ))}
                {course.sessions.length === 0 && (
                  <p className="text-muted-foreground text-sm">No sessions scheduled yet</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Sticky CTA */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div className="sticky top-24 p-6 rounded-lg bg-card border border-border space-y-6">
              <div className="text-3xl font-bold text-primary">
                {course.price === 0 ? t("courses.free") : `$${course.price}`}
              </div>

              {course.sessions.find((s) => s.status === "upcoming" || s.status === "live") && (
                <div className="p-3 rounded-md bg-primary/10 border border-primary/20">
                  <p className="text-xs text-muted-foreground">{t("courses.next_session")}</p>
                  <p className="text-sm font-medium text-foreground mt-1">
                    {course.sessions.find((s) => s.status === "upcoming" || s.status === "live")?.date}
                    {" · "}
                    {course.sessions.find((s) => s.status === "upcoming" || s.status === "live")?.time}
                  </p>
                </div>
              )}

              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold forge-glow active:scale-[0.97] transition-transform" size="lg">
                {t("courses.enroll")}
              </Button>

              <div className="text-xs text-muted-foreground text-center">
                Free enrollment · No payment required
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}