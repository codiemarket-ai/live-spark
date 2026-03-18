import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Users, Plus, Radio } from "lucide-react";
import { Layout } from "@/components/Layout";
import { courses, instructors } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function InstructorDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"courses" | "sessions" | "students">("courses");
  const [showCreateCourse, setShowCreateCourse] = useState(false);

  const myCourses = courses.filter((c) => c.instructorId === "i1");
  const mySessions = myCourses.flatMap((c) => c.sessions);
  const instructor = instructors[0];

  const tabs = [
    { key: "courses" as const, label: t("instructor.my_courses"), icon: BookOpen },
    { key: "sessions" as const, label: t("instructor.my_sessions"), icon: Calendar },
    { key: "students" as const, label: t("instructor.my_students"), icon: Users },
  ];

  return (
    <Layout>
      <div className="py-12 md:py-20 pb-24 md:pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t("instructor.dashboard")}</h1>
              <p className="text-muted-foreground mt-1">{instructor.name} · {instructor.coursesCount} courses · {instructor.studentsCount} students</p>
            </div>
            <Button onClick={() => setShowCreateCourse(true)} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />{t("instructor.create_course")}
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-8 p-1 bg-card rounded-lg border border-border w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />{tab.label}
              </button>
            ))}
          </div>

          {/* Courses Tab */}
          {activeTab === "courses" && (
            <div className="space-y-4">
              {myCourses.map((course) => (
                <div key={course.id} className="p-5 rounded-lg bg-card border border-border flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-foreground">{course.title}</h3>
                      <Badge variant={course.status === "approved" ? "default" : "secondary"} className="text-[10px]">
                        {course.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{course.studentsCount} students · {course.sessionsCount} sessions</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate(`/courses/${course.id}`)}>View</Button>
                </div>
              ))}
            </div>
          )}

          {/* Sessions Tab */}
          {activeTab === "sessions" && (
            <div className="space-y-3">
              {mySessions.map((session) => {
                const course = myCourses.find((c) => c.id === session.courseId);
                return (
                  <div key={session.id} className="p-4 rounded-lg bg-card border border-border flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">{course?.title}</p>
                      <p className="font-medium text-foreground text-sm">{session.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{session.date} · {session.time} · {session.duration}m</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={session.status === "live" ? "border-live text-live" : ""}>
                        {session.status === "live" && <Radio className="w-3 h-3 mr-1 live-pulse" />}
                        {session.status}
                      </Badge>
                      {(session.status === "upcoming" || session.status === "live") && (
                        <Button
                          size="sm"
                          className="bg-primary text-primary-foreground"
                          onClick={() => navigate(`/classroom/${session.id}`)}
                        >
                          {session.status === "live" ? "Join" : t("instructor.start_session")}
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Students Tab */}
          {activeTab === "students" && (
            <div className="rounded-lg bg-card border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-secondary">
                  <tr>
                    <th className="text-left p-3 text-muted-foreground font-medium">Student</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Course</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Enrolled</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Ahmed Hassan", course: "Advanced React Patterns", date: "Mar 1, 2026" },
                    { name: "Nora Saleh", course: "Advanced React Patterns", date: "Mar 5, 2026" },
                    { name: "Mark Thompson", course: "TypeScript Masterclass", date: "Feb 28, 2026" },
                    { name: "Fatima Ali", course: "Advanced React Patterns", date: "Mar 10, 2026" },
                  ].map((s) => (
                    <tr key={s.name} className="border-t border-border hover:bg-secondary/50 transition-colors">
                      <td className="p-3 text-foreground">{s.name}</td>
                      <td className="p-3 text-muted-foreground">{s.course}</td>
                      <td className="p-3 text-muted-foreground">{s.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Create Course Modal */}
          {showCreateCourse && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg bg-card border border-border rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-bold text-foreground">{t("instructor.create_course")}</h2>
                <Input placeholder="Course Title" className="bg-secondary border-border" />
                <Textarea placeholder="Description" className="bg-secondary border-border" rows={3} />
                <div className="flex gap-3">
                  <select className="flex-1 rounded-md bg-secondary border border-border text-foreground p-2 text-sm">
                    <option>Live</option>
                    <option>Recorded</option>
                    <option>Hybrid</option>
                  </select>
                  <Input placeholder="Price (0 = free)" type="number" className="flex-1 bg-secondary border-border" />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="ghost" onClick={() => setShowCreateCourse(false)}>Cancel</Button>
                  <Button onClick={() => setShowCreateCourse(false)} className="bg-primary text-primary-foreground">{t("instructor.create_course")}</Button>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}