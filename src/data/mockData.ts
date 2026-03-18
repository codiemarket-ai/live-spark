export interface Instructor {
  id: string;
  name: string;
  nameAr: string;
  avatar: string;
  bio: string;
  bioAr: string;
  expertise: string[];
  coursesCount: number;
  studentsCount: number;
  status: "approved" | "pending" | "rejected";
}

export interface Session {
  id: string;
  courseId: string;
  title: string;
  titleAr: string;
  date: string;
  time: string;
  duration: number;
  status: "live" | "upcoming" | "recorded";
}

export interface Course {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  instructorId: string;
  price: number;
  thumbnail: string;
  category: string;
  type: "live" | "recorded" | "hybrid";
  studentsCount: number;
  sessionsCount: number;
  status: "approved" | "pending" | "rejected";
  sessions: Session[];
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  message: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  type: "session_reminder" | "application_approved" | "new_recording";
  message: string;
  messageAr: string;
  read: boolean;
  timestamp: string;
}

export const instructors: Instructor[] = [
  {
    id: "i1",
    name: "Sarah Mitchell",
    nameAr: "سارة ميتشل",
    avatar: "SM",
    bio: "Full-stack developer with 10+ years of experience. Former lead at Stripe.",
    bioAr: "مطورة Full-stack مع أكثر من 10 سنوات خبرة. قائدة سابقة في Stripe.",
    expertise: ["React", "TypeScript", "Node.js"],
    coursesCount: 3,
    studentsCount: 245,
    status: "approved",
  },
  {
    id: "i2",
    name: "Omar Khalid",
    nameAr: "عمر خالد",
    avatar: "OK",
    bio: "UI/UX designer and design systems expert. Worked with Fortune 500 companies.",
    bioAr: "مصمم UI/UX وخبير أنظمة التصميم. عمل مع شركات Fortune 500.",
    expertise: ["Figma", "Design Systems", "UX Research"],
    coursesCount: 2,
    studentsCount: 189,
    status: "approved",
  },
  {
    id: "i3",
    name: "Lina Farouk",
    nameAr: "لينا فاروق",
    avatar: "LF",
    bio: "Data scientist specializing in machine learning and Python.",
    bioAr: "عالمة بيانات متخصصة في التعلم الآلي وPython.",
    expertise: ["Python", "ML", "Data Analysis"],
    coursesCount: 2,
    studentsCount: 156,
    status: "approved",
  },
  {
    id: "i4",
    name: "James Cooper",
    nameAr: "جيمس كوبر",
    avatar: "JC",
    bio: "Mobile app developer with expertise in React Native and Flutter.",
    bioAr: "مطور تطبيقات جوال خبير في React Native و Flutter.",
    expertise: ["React Native", "Flutter"],
    coursesCount: 0,
    studentsCount: 0,
    status: "pending",
  },
];

const now = new Date();
const addDays = (days: number) => new Date(now.getTime() + days * 86400000).toISOString().split("T")[0];
const addMinutes = (min: number) => {
  const d = new Date(now.getTime() + min * 60000);
  return d.toTimeString().slice(0, 5);
};

export const courses: Course[] = [
  {
    id: "c1",
    title: "Advanced React Patterns",
    titleAr: "أنماط React المتقدمة",
    description: "Master advanced React patterns including compound components, render props, and custom hooks. Build production-grade UI libraries.",
    descriptionAr: "أتقن أنماط React المتقدمة بما في ذلك المكونات المركبة وprops التقديمية والhooks المخصصة.",
    instructorId: "i1",
    price: 0,
    thumbnail: "",
    category: "Development",
    type: "live",
    studentsCount: 87,
    sessionsCount: 8,
    status: "approved",
    sessions: [
      { id: "s1", courseId: "c1", title: "Compound Components", titleAr: "المكونات المركبة", date: addDays(0), time: addMinutes(15), duration: 90, status: "live" },
      { id: "s2", courseId: "c1", title: "Render Props Deep Dive", titleAr: "تعمق في Render Props", date: addDays(3), time: "18:00", duration: 90, status: "upcoming" },
      { id: "s3", courseId: "c1", title: "Custom Hooks Mastery", titleAr: "إتقان Custom Hooks", date: addDays(7), time: "18:00", duration: 90, status: "upcoming" },
      { id: "s4", courseId: "c1", title: "State Machines in React", titleAr: "آلات الحالة في React", date: addDays(-3), time: "18:00", duration: 90, status: "recorded" },
    ],
  },
  {
    id: "c2",
    title: "Design Systems from Scratch",
    titleAr: "أنظمة التصميم من الصفر",
    description: "Learn to build scalable design systems with Figma, tokens, and component libraries that teams actually use.",
    descriptionAr: "تعلم بناء أنظمة تصميم قابلة للتوسع مع Figma والرموز ومكتبات المكونات.",
    instructorId: "i2",
    price: 0,
    thumbnail: "",
    category: "Design",
    type: "live",
    studentsCount: 64,
    sessionsCount: 6,
    status: "approved",
    sessions: [
      { id: "s5", courseId: "c2", title: "Token Architecture", titleAr: "هندسة الرموز", date: addDays(1), time: "16:00", duration: 60, status: "upcoming" },
      { id: "s6", courseId: "c2", title: "Component API Design", titleAr: "تصميم واجهة المكونات", date: addDays(4), time: "16:00", duration: 60, status: "upcoming" },
    ],
  },
  {
    id: "c3",
    title: "Python for Data Science",
    titleAr: "Python لعلوم البيانات",
    description: "Hands-on Python course covering pandas, numpy, and visualization. Real datasets, real analysis.",
    descriptionAr: "دورة Python عملية تغطي pandas و numpy والتصور البصري. بيانات حقيقية، تحليل حقيقي.",
    instructorId: "i3",
    price: 0,
    thumbnail: "",
    category: "Data Science",
    type: "hybrid",
    studentsCount: 112,
    sessionsCount: 10,
    status: "approved",
    sessions: [
      { id: "s7", courseId: "c3", title: "Pandas Fundamentals", titleAr: "أساسيات Pandas", date: addDays(2), time: "19:00", duration: 75, status: "upcoming" },
      { id: "s8", courseId: "c3", title: "Data Cleaning", titleAr: "تنظيف البيانات", date: addDays(-1), time: "19:00", duration: 75, status: "recorded" },
    ],
  },
  {
    id: "c4",
    title: "TypeScript Masterclass",
    titleAr: "دورة TypeScript الشاملة",
    description: "From basic types to advanced generics, mapped types, and conditional types. Become a TypeScript expert.",
    descriptionAr: "من الأنواع الأساسية إلى الأنواع المتقدمة والأنواع الشرطية. كن خبيراً في TypeScript.",
    instructorId: "i1",
    price: 0,
    thumbnail: "",
    category: "Development",
    type: "recorded",
    studentsCount: 203,
    sessionsCount: 12,
    status: "approved",
    sessions: [
      { id: "s9", courseId: "c4", title: "Advanced Generics", titleAr: "الأنواع العامة المتقدمة", date: addDays(-5), time: "17:00", duration: 60, status: "recorded" },
      { id: "s10", courseId: "c4", title: "Mapped Types", titleAr: "الأنواع المعينة", date: addDays(-2), time: "17:00", duration: 60, status: "recorded" },
    ],
  },
  {
    id: "c5",
    title: "UX Research Methods",
    titleAr: "أساليب بحث تجربة المستخدم",
    description: "Learn practical UX research techniques: interviews, usability testing, surveys, and synthesis.",
    descriptionAr: "تعلم تقنيات بحث UX العملية: المقابلات واختبار قابلية الاستخدام والاستطلاعات.",
    instructorId: "i2",
    price: 0,
    thumbnail: "",
    category: "Design",
    type: "live",
    studentsCount: 45,
    sessionsCount: 5,
    status: "approved",
    sessions: [
      { id: "s11", courseId: "c5", title: "User Interviews", titleAr: "مقابلات المستخدمين", date: addDays(5), time: "15:00", duration: 90, status: "upcoming" },
    ],
  },
  {
    id: "c6",
    title: "Machine Learning Fundamentals",
    titleAr: "أساسيات التعلم الآلي",
    description: "Build ML models from scratch. Regression, classification, clustering, and neural networks basics.",
    descriptionAr: "ابنِ نماذج التعلم الآلي من الصفر. الانحدار والتصنيف والتجميع وأساسيات الشبكات العصبية.",
    instructorId: "i3",
    price: 0,
    thumbnail: "",
    category: "Data Science",
    type: "live",
    studentsCount: 78,
    sessionsCount: 8,
    status: "approved",
    sessions: [
      { id: "s12", courseId: "c6", title: "Linear Regression", titleAr: "الانحدار الخطي", date: addDays(1), time: "20:00", duration: 90, status: "upcoming" },
    ],
  },
  {
    id: "c7",
    title: "Mobile App Development",
    titleAr: "تطوير تطبيقات الجوال",
    description: "Build cross-platform mobile apps with React Native. From setup to App Store deployment.",
    descriptionAr: "ابنِ تطبيقات جوال عبر المنصات مع React Native. من الإعداد إلى النشر.",
    instructorId: "i4",
    price: 0,
    thumbnail: "",
    category: "Development",
    type: "live",
    studentsCount: 0,
    sessionsCount: 0,
    status: "pending",
    sessions: [],
  },
];

export const chatMessages: ChatMessage[] = [
  { id: "m1", userId: "u1", userName: "Ahmed H.", avatar: "AH", message: "Great explanation! Can you show the code again?", timestamp: "2 min ago" },
  { id: "m2", userId: "u2", userName: "Nora S.", avatar: "NS", message: "How does this compare to the factory pattern?", timestamp: "1 min ago" },
  { id: "m3", userId: "u3", userName: "Mark T.", avatar: "MT", message: "This is exactly what I needed for my project 🔥", timestamp: "30s ago" },
  { id: "m4", userId: "u4", userName: "Fatima A.", avatar: "FA", message: "Could you share the repo link?", timestamp: "Just now" },
];

export const notifications: Notification[] = [
  { id: "n1", type: "session_reminder", message: "Advanced React Patterns starts in 10 minutes", messageAr: "أنماط React المتقدمة تبدأ بعد 10 دقائق", read: false, timestamp: "2 min ago" },
  { id: "n2", type: "application_approved", message: "Your instructor application was approved!", messageAr: "تم قبول طلبك كمدرب!", read: false, timestamp: "1 hour ago" },
  { id: "n3", type: "new_recording", message: "New recording: State Machines in React", messageAr: "تسجيل جديد: آلات الحالة في React", read: true, timestamp: "Yesterday" },
];

export const getInstructor = (id: string) => instructors.find((i) => i.id === id);
export const getCourse = (id: string) => courses.find((c) => c.id === id);
export const getCourseSessions = (courseId: string) => courses.find((c) => c.id === courseId)?.sessions ?? [];
export const getApprovedCourses = () => courses.filter((c) => c.status === "approved");
export const getLiveSessions = () => courses.flatMap((c) => c.sessions).filter((s) => s.status === "live");
export const getUpcomingSessions = () => courses.flatMap((c) => c.sessions).filter((s) => s.status === "upcoming");