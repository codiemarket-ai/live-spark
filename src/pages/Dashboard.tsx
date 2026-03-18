import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { CourseCard } from "@/components/CourseCard";
import { SessionCard } from "@/components/SessionCard";
import { courses, getUpcomingSessions, getLiveSessions } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const liveSessions = getLiveSessions();
  const upcomingSessions = getUpcomingSessions().slice(0, 3);
  const myCourses = courses.filter((c) => c.status === "approved").slice(0, 4);

  return (
    <Layout>
      <div className="py-12 md:py-20 pb-24 md:pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t("dashboard.welcome")}, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-muted-foreground mb-10">Here's what's happening today</p>

          {/* Live Now */}
          {liveSessions.length > 0 && (
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-live live-pulse" />
                Live Now
              </h2>
              <div className="space-y-3">
                {liveSessions.map((session) => {
                  const course = courses.find((c) => c.id === session.courseId);
                  return (
                    <SessionCard
                      key={session.id}
                      session={session}
                      courseName={course?.title}
                      showJoin
                      onJoin={() => navigate(`/classroom/${session.id}`)}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Upcoming Sessions */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-4">{t("dashboard.upcoming_sessions")}</h2>
            {upcomingSessions.length > 0 ? (
              <div className="space-y-3">
                {upcomingSessions.map((session) => {
                  const course = courses.find((c) => c.id === session.courseId);
                  return (
                    <SessionCard
                      key={session.id}
                      session={session}
                      courseName={course?.title}
                      showJoin
                      onJoin={() => navigate(`/classroom/${session.id}`)}
                    />
                  );
                })}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">{t("dashboard.no_upcoming")}</p>
            )}
          </div>

          {/* My Courses */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">{t("dashboard.my_courses")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {myCourses.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}