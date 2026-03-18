import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Calendar } from "lucide-react";
import { type Course, getInstructor } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

interface CourseCardProps {
  course: Course;
  index?: number;
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar";
  const instructor = getInstructor(course.instructorId);

  const nextLive = course.sessions.find((s) => s.status === "live");
  const nextUpcoming = course.sessions.find((s) => s.status === "upcoming");
  const badgeSession = nextLive || nextUpcoming;

  const categoryColors: Record<string, string> = {
    Development: "bg-accent/20 text-accent",
    Design: "bg-primary/20 text-primary",
    "Data Science": "bg-success/20 text-success",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link to={`/courses/${course.id}`}>
        <div className="rounded-lg border border-border bg-card hover:border-primary/30 transition-all duration-300 overflow-hidden">
          {/* Thumbnail */}
          <div className="relative aspect-video bg-secondary flex items-center justify-center overflow-hidden">
            <div className="text-4xl font-bold text-muted-foreground/20">{course.title.charAt(0)}</div>
            {badgeSession && (
              <div className="absolute top-3 left-3">
                <Badge className={`${badgeSession.status === "live" ? "bg-live text-foreground live-pulse" : "bg-primary/20 text-primary"} text-xs`}>
                  {badgeSession.status === "live" ? t("landing.live_badge") : t("courses.live_soon")}
                </Badge>
              </div>
            )}
            <div className={`absolute top-3 right-3 ${categoryColors[course.category] || "bg-secondary text-muted-foreground"} px-2 py-0.5 rounded text-xs font-medium`}>
              {course.category}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {isRTL ? course.titleAr : course.title}
            </h3>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold">
                {instructor?.avatar}
              </div>
              <span className="text-sm text-muted-foreground">{isRTL ? instructor?.nameAr : instructor?.name}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{course.studentsCount} {t("courses.students")}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{course.sessionsCount} {t("courses.sessions")}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-border">
              <span className="text-sm font-bold text-primary">{course.price === 0 ? t("courses.free") : `$${course.price}`}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}