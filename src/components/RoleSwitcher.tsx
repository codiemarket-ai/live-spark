import { useAuth, type UserRole } from "@/contexts/AuthContext";

export function RoleSwitcher() {
  const { role, setRole } = useAuth();

  const roles: { value: UserRole; label: string }[] = [
    { value: null, label: "Guest" },
    { value: "student", label: "Student" },
    { value: "instructor", label: "Instructor" },
    { value: "admin", label: "Admin" },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-[100] md:bottom-20 glass-surface rounded-lg p-2 border border-border shadow-xl">
      <p className="text-[10px] text-muted-foreground mb-1 px-1">Demo Role</p>
      <div className="flex gap-1">
        {roles.map((r) => (
          <button
            key={r.value ?? "guest"}
            onClick={() => setRole(r.value)}
            className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
              role === r.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}