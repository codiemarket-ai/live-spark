import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Clock, Radio } from "lucide-react";
import { type Session } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

interface SessionCardProps {
  session: Session;
  courseName?: string;
  showJoin?: boolean;
  onJoin?: () => void;
}

export function SessionCard({ session, courseName, showJoin, onJoin }: SessionCardProps) {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar";

  const statusStyles = {
    live: "bg-live/20 text-live border-live/30",
    upcoming: "bg-primary/10 text-primary border-primary/30",
    recorded: "bg-muted text-muted-foreground border-border",
  };

  const statusLabels = {
    live: t("landing.live_badge"),
    upcoming: t("landing.upcoming_badge"),
    recorded: t("landing.recorded_badge"),
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`p-4 rounded-lg border ${statusStyles[session.status]} transition-all`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {courseName && <p className="text-xs text-muted-foreground mb-1">{courseName}</p>}
          <h4 className="font-medium text-foreground text-sm">{isRTL ? session.titleAr : session.title}</h4>
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span>{session.date}</span>
            <span>{session.time}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{session.duration}m</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <Badge variant="outline" className={`text-[10px] ${session.status === "live" ? "border-live text-live live-pulse" : ""}`}>
            {session.status === "live" && <Radio className="w-3 h-3 mr-1" />}
            {statusLabels[session.status]}
          </Badge>
          {showJoin && session.status === "live" && (
            <button
              onClick={onJoin}
              className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors forge-glow"
            >
              {t("dashboard.enter_classroom")}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}