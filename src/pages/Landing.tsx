import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Users, Radio } from "lucide-react";
import { Layout } from "@/components/Layout";
import { CourseCard } from "@/components/CourseCard";
import { getApprovedCourses } from "@/data/mockData";
import { Button } from "@/components/ui/button";

export default function Landing() {
  const { t } = useTranslation();
  const courses = getApprovedCourses().slice(0, 6);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 md:py-36 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8">
            <Radio className="w-3 h-3 live-pulse" />
            <span>Live sessions happening now</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
            {t("landing.hero_title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            {t("landing.hero_subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 forge-glow active:scale-[0.97] transition-transform">
                {t("landing.cta")} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/apply">
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary active:scale-[0.97] transition-transform">
                {t("nav.become_instructor")}
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="relative z-10 grid grid-cols-3 gap-8 mt-20 text-center">
          {[
            { icon: Zap, value: "500+", label: "Live Sessions" },
            { icon: Users, value: "2,400+", label: "Active Learners" },
            { icon: Radio, value: "50+", label: "Expert Instructors" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2">
              <stat.icon className="w-5 h-5 text-primary" />
              <span className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 md:py-24">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t("landing.featured")}</h2>
          <Link to="/courses" className="text-sm text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      </section>
    </Layout>
  );
}