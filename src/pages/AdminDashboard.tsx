import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { instructors, courses } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"instructors" | "courses">("instructors");
  const [instructorStatuses, setInstructorStatuses] = useState<Record<string, string>>({});
  const [courseStatuses, setCourseStatuses] = useState<Record<string, string>>({});

  const getStatus = (id: string, original: string, overrides: Record<string, string>) =>
    overrides[id] || original;

  const statusColor = (status: string) => {
    if (status === "approved") return "bg-success/20 text-success";
    if (status === "rejected") return "bg-live/20 text-live";
    return "bg-primary/20 text-primary";
  };

  return (
    <Layout>
      <div className="py-12 md:py-20 pb-24 md:pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-foreground mb-8">{t("admin.dashboard")}</h1>

          <div className="flex gap-1 mb-8 p-1 bg-card rounded-lg border border-border w-fit">
            <button
              onClick={() => setActiveTab("instructors")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "instructors" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              {t("admin.instructor_applications")}
            </button>
            <button
              onClick={() => setActiveTab("courses")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "courses" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              {t("admin.course_submissions")}
            </button>
          </div>

          {activeTab === "instructors" && (
            <div className="rounded-lg bg-card border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-secondary">
                  <tr>
                    <th className="text-left p-3 text-muted-foreground font-medium">Instructor</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Expertise</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Status</th>
                    <th className="text-right p-3 text-muted-foreground font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {instructors.map((inst) => {
                    const status = getStatus(inst.id, inst.status, instructorStatuses);
                    return (
                      <tr key={inst.id} className="border-t border-border hover:bg-secondary/50 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">{inst.avatar}</div>
                            <div>
                              <p className="text-foreground font-medium">{inst.name}</p>
                              <p className="text-xs text-muted-foreground">{inst.bio.slice(0, 50)}...</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1 flex-wrap">
                            {inst.expertise.map((e) => <Badge key={e} variant="secondary" className="text-[10px]">{e}</Badge>)}
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={`${statusColor(status)} text-[10px]`}>{status}</Badge>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex gap-1 justify-end">
                            <Button size="sm" variant="ghost" className="text-success text-xs h-7"
                              onClick={() => setInstructorStatuses({ ...instructorStatuses, [inst.id]: "approved" })}>
                              {t("admin.approve")}
                            </Button>
                            <Button size="sm" variant="ghost" className="text-live text-xs h-7"
                              onClick={() => setInstructorStatuses({ ...instructorStatuses, [inst.id]: "rejected" })}>
                              {t("admin.reject")}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "courses" && (
            <div className="rounded-lg bg-card border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-secondary">
                  <tr>
                    <th className="text-left p-3 text-muted-foreground font-medium">Course</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Instructor</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Type</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Status</th>
                    <th className="text-right p-3 text-muted-foreground font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => {
                    const status = getStatus(course.id, course.status, courseStatuses);
                    const inst = instructors.find((i) => i.id === course.instructorId);
                    return (
                      <tr key={course.id} className="border-t border-border hover:bg-secondary/50 transition-colors">
                        <td className="p-3 text-foreground font-medium">{course.title}</td>
                        <td className="p-3 text-muted-foreground">{inst?.name}</td>
                        <td className="p-3"><Badge variant="secondary" className="text-[10px]">{course.type}</Badge></td>
                        <td className="p-3"><Badge className={`${statusColor(status)} text-[10px]`}>{status}</Badge></td>
                        <td className="p-3 text-right">
                          <div className="flex gap-1 justify-end">
                            <Button size="sm" variant="ghost" className="text-success text-xs h-7"
                              onClick={() => setCourseStatuses({ ...courseStatuses, [course.id]: "approved" })}>
                              {t("admin.approve")}
                            </Button>
                            <Button size="sm" variant="ghost" className="text-live text-xs h-7"
                              onClick={() => setCourseStatuses({ ...courseStatuses, [course.id]: "rejected" })}>
                              {t("admin.reject")}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}