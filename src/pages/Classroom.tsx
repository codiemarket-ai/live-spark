import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hand, MessageCircle, Mic, MicOff, Video, VideoOff, Users,
  Send, Radio, ArrowLeft, SmilePlus, Volume2, VolumeX, LogOut,
} from "lucide-react";
import { chatMessages, courses } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Classroom() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { role, user } = useAuth();
  const isTeacher = role === "instructor";

  const [messages, setMessages] = useState(chatMessages);
  const [newMsg, setNewMsg] = useState("");
  const [handRaised, setHandRaised] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [chatVisible, setChatVisible] = useState(true);
  const [showParticipants, setShowParticipants] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const session = courses.flatMap((c) => c.sessions).find((s) => s.id === sessionId);
  const course = courses.find((c) => c.sessions.some((s) => s.id === sessionId));

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    setMessages([...messages, {
      id: `m${Date.now()}`,
      userId: user?.id || "u0",
      userName: user?.name || "You",
      avatar: user?.avatar || "YO",
      message: newMsg,
      timestamp: "Just now",
    }]);
    setNewMsg("");
  };

  const participants = [
    { name: "Ahmed H.", avatar: "AH", handRaised: false, mic: false },
    { name: "Nora S.", avatar: "NS", handRaised: true, mic: false },
    { name: "Mark T.", avatar: "MT", handRaised: false, mic: true },
    { name: "Fatima A.", avatar: "FA", handRaised: false, mic: false },
  ];

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-screen bg-background flex flex-col">
        {/* Top Bar */}
        <div className="h-14 border-b border-border flex items-center justify-between px-4 glass-surface">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1.5 rounded hover:bg-secondary text-muted-foreground">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <p className="text-sm font-semibold text-foreground">{course?.title}</p>
              <p className="text-xs text-muted-foreground">{session?.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-live/20 text-live border-live/30 text-xs">
              <Radio className="w-3 h-3 mr-1 live-pulse" />
              {t("classroom.live_now")}
            </Badge>
            <Badge variant="outline" className="text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-live mr-1.5 live-pulse" />
              {t("classroom.recording")}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Users className="w-3 h-3" />
              {participants.length + 1}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Video Stage */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 bg-card m-2 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-card via-card to-primary/5" />
              <div className="relative z-10 text-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-primary">SM</span>
                </div>
                <p className="text-foreground font-semibold">Sarah Mitchell</p>
                <p className="text-xs text-muted-foreground mt-1">Presenting</p>
              </div>
            </div>

            {/* Controls */}
            <div className="h-16 border-t border-border flex items-center justify-center gap-3 px-4">
              {!isTeacher && (
                <>
                  <button
                    onClick={() => setHandRaised(!handRaised)}
                    className={`p-3 rounded-full transition-colors ${handRaised ? "bg-primary text-primary-foreground forge-glow" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                  >
                    <Hand className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setMicOn(!micOn)}
                    className={`p-3 rounded-full transition-colors ${micOn ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                  >
                    {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  </button>
                  <button className="p-3 rounded-full bg-secondary text-muted-foreground hover:text-foreground">
                    <SmilePlus className="w-5 h-5" />
                  </button>
                </>
              )}

              {isTeacher && (
                <>
                  <button className="p-3 rounded-full bg-secondary text-muted-foreground hover:text-foreground">
                    <VolumeX className="w-5 h-5" />
                  </button>
                  <button onClick={() => setChatVisible(!chatVisible)} className="p-3 rounded-full bg-secondary text-muted-foreground hover:text-foreground">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                  <button onClick={() => setShowParticipants(!showParticipants)} className="p-3 rounded-full bg-secondary text-muted-foreground hover:text-foreground">
                    <Users className="w-5 h-5" />
                  </button>
                  <button onClick={() => navigate("/instructor")} className="p-3 rounded-full bg-live text-foreground hover:bg-live/80">
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              )}

              <button
                onClick={() => setChatVisible(!chatVisible)}
                className="p-3 rounded-full bg-secondary text-muted-foreground hover:text-foreground md:hidden"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat / Participants Panel */}
          <AnimatePresence>
            {chatVisible && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 320, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="border-l border-border flex flex-col bg-card overflow-hidden hidden md:flex"
              >
                <div className="p-3 border-b border-border flex gap-2">
                  <button
                    onClick={() => setShowParticipants(false)}
                    className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${!showParticipants ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {t("classroom.chat")}
                  </button>
                  <button
                    onClick={() => setShowParticipants(true)}
                    className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${showParticipants ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {t("classroom.participants")} ({participants.length})
                  </button>
                </div>

                {!showParticipants ? (
                  <>
                    <div className="flex-1 overflow-y-auto p-3 space-y-3">
                      {messages.map((msg) => (
                        <div key={msg.id} className="flex gap-2">
                          <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-muted-foreground flex-shrink-0">
                            {msg.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2">
                              <span className="text-xs font-semibold text-foreground">{msg.userName}</span>
                              <span className="text-[10px] text-muted-foreground">{msg.timestamp}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-0.5">{msg.message}</p>
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>
                    <div className="p-3 border-t border-border">
                      <div className="flex gap-2">
                        <Input
                          value={newMsg}
                          onChange={(e) => setNewMsg(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                          placeholder={t("classroom.send_message")}
                          className="bg-secondary border-border text-sm"
                        />
                        <button onClick={sendMessage} className="p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {participants.map((p) => (
                      <div key={p.name} className="flex items-center justify-between p-2 rounded-md hover:bg-secondary transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">
                            {p.avatar}
                          </div>
                          <span className="text-sm text-foreground">{p.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {p.handRaised && <Hand className="w-3 h-3 text-primary" />}
                          {p.mic ? <Mic className="w-3 h-3 text-success" /> : <MicOff className="w-3 h-3 text-muted-foreground" />}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Chat Sheet */}
        <AnimatePresence>
          {chatVisible && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="fixed inset-x-0 bottom-0 h-[60vh] glass-surface border-t border-border md:hidden z-50 flex flex-col"
            >
              <div className="p-3 border-b border-border flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">{t("classroom.chat")}</span>
                <button onClick={() => setChatVisible(false)} className="text-muted-foreground">✕</button>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[9px] font-bold text-muted-foreground flex-shrink-0">
                      {msg.avatar}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-foreground">{msg.userName}</span>
                      <p className="text-sm text-muted-foreground">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-border flex gap-2">
                <Input
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder={t("classroom.send_message")}
                  className="bg-secondary border-border text-sm"
                />
                <button onClick={sendMessage} className="p-2 rounded-md bg-primary text-primary-foreground">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}