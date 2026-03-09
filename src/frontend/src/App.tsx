import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Download,
  Flame,
  Loader2,
  LogOut,
  MapPin,
  Shield,
  Swords,
  Trash2,
  Trophy,
  Users,
  Wifi,
} from "lucide-react";
import { AnimatePresence, type Transition, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "./hooks/useInternetIdentity";

type Page = "home" | "register" | "admin" | "panel";

interface Team {
  teamName: string;
  leaderName: string;
}

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const pageTransition: Transition = { duration: 0.3, ease: "easeOut" };

// ── CyberButton ────────────────────────────────────────────────────────────────
function CyberButton({
  children,
  variant = "cyan",
  className = "",
  onClick,
  disabled,
  type = "button",
  dataOcid,
}: {
  children: React.ReactNode;
  variant?: "cyan" | "orange" | "red" | "green" | "ghost";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  dataOcid?: string;
}) {
  const variants = {
    cyan: "bg-primary/10 hover:bg-primary/20 text-primary border border-primary/40 hover:border-primary/80 hover:shadow-glow-cyan",
    orange:
      "bg-accent/10 hover:bg-accent/20 text-accent border border-accent/40 hover:border-accent/80 hover:shadow-glow-orange",
    red: "bg-destructive/10 hover:bg-destructive/20 text-destructive border border-destructive/40 hover:border-destructive/80 hover:shadow-glow-red",
    green:
      "bg-success/10 hover:bg-success/20 text-success border border-success/40 hover:border-success/80 hover:shadow-glow-green",
    ghost:
      "bg-transparent hover:bg-white/5 text-muted-foreground hover:text-foreground border border-border hover:border-border",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-ocid={dataOcid}
      className={`
        inline-flex items-center justify-center gap-2 px-5 py-2.5
        font-display font-semibold text-sm tracking-wider uppercase
        clip-corner-sm transition-all duration-200
        disabled:opacity-40 disabled:cursor-not-allowed
        ${variants[variant]} ${className}
      `}
    >
      {children}
    </button>
  );
}

// ── StatBadge ──────────────────────────────────────────────────────────────────
function StatBadge({
  icon: Icon,
  label,
  value,
}: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-border rounded-sm">
      <Icon className="w-4 h-4 text-primary" />
      <div className="text-left">
        <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono">
          {label}
        </div>
        <div className="text-sm font-display font-semibold text-foreground">
          {value}
        </div>
      </div>
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────
function Navbar({
  currentPage,
  onNavigate,
}: { currentPage: Page; onNavigate: (p: Page) => void }) {
  const navLinks: { page: Page; label: string; ocid: string }[] = [
    { page: "home", label: "Home", ocid: "nav.home.link" },
    { page: "register", label: "Register", ocid: "nav.register.link" },
    { page: "admin", label: "Admin", ocid: "nav.admin.link" },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 bg-primary/10 border border-primary/40 flex items-center justify-center clip-corner-sm group-hover:shadow-glow-cyan transition-all duration-200">
            <Swords className="w-4 h-4 text-primary" />
          </div>
          <div className="font-display font-black tracking-widest text-sm sm:text-base uppercase">
            <span className="text-primary text-glow-cyan">RDX</span>
            <span className="text-foreground"> ESPORTS</span>
          </div>
        </button>

        {/* Links */}
        <div className="flex items-center gap-1">
          {navLinks.map(({ page, label, ocid }) => (
            <button
              type="button"
              key={page}
              onClick={() => onNavigate(page)}
              data-ocid={ocid}
              className={`
                px-3 py-1.5 text-xs font-display font-semibold tracking-widest uppercase
                transition-all duration-200
                ${
                  currentPage === page
                    ? "text-primary border-b border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ── HomePage ───────────────────────────────────────────────────────────────────
function HomePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <motion.main
      key="home"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="min-h-screen"
    >
      {/* Hero */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('/assets/generated/hero-inferno-bg.dim_1920x1080.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Layered overlays */}
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-grid-pattern" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        {/* Decorative corner accents */}
        <div className="absolute top-20 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/30" />
        <div className="absolute top-20 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/30" />
        <div className="absolute bottom-20 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/30" />
        <div className="absolute bottom-20 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/30" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-accent/10 border border-accent/40 text-accent text-xs font-mono tracking-widest uppercase"
          >
            <Flame className="w-3.5 h-3.5 animate-pulse-glow" />
            Free Fire Esports Tournament
            <Flame className="w-3.5 h-3.5 animate-pulse-glow" />
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-display font-black text-6xl sm:text-7xl md:text-8xl uppercase tracking-tight leading-none mb-6"
          >
            <span className="block text-foreground">INFERNO</span>
            <span className="block text-primary text-glow-cyan">'26</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-muted-foreground text-lg mb-10 font-body max-w-md mx-auto"
          >
            Forge your legacy. Fight for supremacy. Only the strongest survive.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            <StatBadge icon={Trophy} label="Prize Pool" value="₹50,000" />
            <StatBadge icon={Users} label="Max Teams" value="64 Squads" />
            <StatBadge icon={Calendar} label="Date" value="Mar 26, 2026" />
            <StatBadge icon={MapPin} label="Format" value="Online" />
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <CyberButton
              variant="cyan"
              className="text-base px-8 py-4 shadow-glow-cyan"
              onClick={() => onNavigate("register")}
              dataOcid="home.register.primary_button"
            >
              <ChevronRight className="w-5 h-5" />
              Register Team
            </CyberButton>
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
              <Wifi className="w-3 h-3 text-success" />
              <span>Registration Open</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Info strip */}
      <section className="bg-card border-y border-border py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-xl font-bold text-foreground mb-2">
            About <span className="text-accent">INFERNO'26</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            RDX Esports presents INFERNO'26 — the most intense Free Fire squad
            tournament of 2026. Compete against top teams, climb the ranks, and
            claim your glory. Registration is free. Winners take everything.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4 text-center text-xs text-muted-foreground font-mono">
        <p>
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors"
          >
            Built with ♥ using caffeine.ai
          </a>
        </p>
      </footer>
    </motion.main>
  );
}

// ── RegisterPage ───────────────────────────────────────────────────────────────
function RegisterPage({
  onNavigate,
  onRegister,
}: {
  onNavigate: (p: Page) => void;
  onRegister: (team: Team) => void;
}) {
  const [teamName, setTeamName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!teamName.trim() || !leaderName.trim()) return;

      setSubmitting(true);
      // Simulate a brief submit delay for UX polish
      setTimeout(() => {
        onRegister({
          teamName: teamName.trim(),
          leaderName: leaderName.trim(),
        });
        toast.success("Team registered successfully!", {
          description: `${teamName.trim()} has been added to INFERNO'26.`,
        });
        setTeamName("");
        setLeaderName("");
        setSubmitting(false);
      }, 600);
    },
    [teamName, leaderName, onRegister],
  );

  return (
    <motion.main
      key="register"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="min-h-screen pt-14 flex flex-col"
    >
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Back */}
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-xs font-mono tracking-wider mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </button>

          {/* Card */}
          <div className="bg-card border border-border shadow-panel clip-corner overflow-hidden">
            {/* Card header strip */}
            <div className="h-1 bg-gradient-to-r from-primary via-primary/60 to-transparent" />

            <div className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary/10 border border-primary/40 flex items-center justify-center clip-corner-sm">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">
                    Team Registration
                  </h1>
                  <p className="text-xs text-muted-foreground font-mono">
                    INFERNO'26 — Free Fire Tournament
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="team-name"
                    className="text-xs font-mono tracking-widest uppercase text-muted-foreground"
                  >
                    Team Name
                  </Label>
                  <Input
                    id="team-name"
                    type="text"
                    placeholder="e.g. Shadow Wolves"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    required
                    autoComplete="off"
                    data-ocid="register.team_name.input"
                    className="bg-input/50 border-border focus:border-primary focus:ring-primary/30 font-body placeholder:text-muted-foreground/40 clip-corner-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="leader-name"
                    className="text-xs font-mono tracking-widest uppercase text-muted-foreground"
                  >
                    Leader Name
                  </Label>
                  <Input
                    id="leader-name"
                    type="text"
                    placeholder="e.g. Arjun XD"
                    value={leaderName}
                    onChange={(e) => setLeaderName(e.target.value)}
                    required
                    autoComplete="off"
                    data-ocid="register.leader_name.input"
                    className="bg-input/50 border-border focus:border-primary focus:ring-primary/30 font-body placeholder:text-muted-foreground/40 clip-corner-sm"
                  />
                </div>

                <div className="pt-2">
                  <CyberButton
                    type="submit"
                    variant="cyan"
                    className="w-full py-3 text-sm shadow-glow-cyan"
                    disabled={
                      submitting || !teamName.trim() || !leaderName.trim()
                    }
                    dataOcid="register.submit_button"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Registering…
                      </>
                    ) : (
                      <>
                        <ChevronRight className="w-4 h-4" />
                        Register Team
                      </>
                    )}
                  </CyberButton>
                </div>
              </form>

              <p className="mt-6 text-center text-xs text-muted-foreground font-mono">
                Registration is <span className="text-success">free</span>.
                Limited spots available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}

// ── AdminLoginPage ─────────────────────────────────────────────────────────────
function AdminLoginPage({
  onNavigate,
}: {
  onNavigate: (p: Page) => void;
}) {
  const {
    identity,
    login,
    isLoggingIn,
    isInitializing,
    isLoginError,
    loginError,
  } = useInternetIdentity();

  // Auto-redirect when authenticated
  useEffect(() => {
    if (identity && !identity.getPrincipal().isAnonymous()) {
      onNavigate("panel");
    }
  }, [identity, onNavigate]);

  return (
    <motion.main
      key="admin"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="min-h-screen pt-14 flex flex-col items-center justify-center px-4"
    >
      <div className="w-full max-w-sm">
        {/* Back */}
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-xs font-mono tracking-wider mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Home
        </button>

        {/* Login card */}
        <div className="bg-card border border-border shadow-panel clip-corner overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-accent via-accent/60 to-transparent" />

          <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-accent/10 border border-accent/40 flex items-center justify-center clip-corner-sm">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h1 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">
                  Admin Access
                </h1>
                <p className="text-xs text-muted-foreground font-mono">
                  Secure authentication required
                </p>
              </div>
            </div>

            {isInitializing ? (
              <div
                data-ocid="admin.login.loading_state"
                className="flex flex-col items-center gap-3 py-6"
              >
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-sm text-muted-foreground font-mono">
                  Initializing…
                </p>
              </div>
            ) : isLoggingIn ? (
              <div
                data-ocid="admin.login.loading_state"
                className="flex flex-col items-center gap-3 py-6"
              >
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-sm text-muted-foreground font-mono">
                  Connecting to Internet Identity…
                </p>
                <p className="text-xs text-muted-foreground/60 font-mono text-center">
                  A popup window will appear. Please complete login there.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  Use{" "}
                  <span className="text-primary font-semibold">
                    Internet Identity
                  </span>{" "}
                  to securely access the admin panel and manage tournament
                  registrations.
                </p>

                {isLoginError && (
                  <div className="p-3 bg-destructive/10 border border-destructive/30 text-destructive text-xs font-mono">
                    {loginError?.message ?? "Login failed. Please try again."}
                  </div>
                )}

                <CyberButton
                  variant="cyan"
                  className="w-full py-3 shadow-glow-cyan"
                  onClick={login}
                  dataOcid="admin.login.primary_button"
                >
                  <Shield className="w-4 h-4" />
                  Login with Internet Identity
                </CyberButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.main>
  );
}

// ── AdminPanelPage ─────────────────────────────────────────────────────────────
function AdminPanelPage({
  teams,
  onDelete,
  onNavigate,
}: {
  teams: Team[];
  onDelete: (index: number) => void;
  onNavigate: (p: Page) => void;
}) {
  const { identity, clear } = useInternetIdentity();

  // Guard: redirect if not authenticated
  useEffect(() => {
    if (!identity || identity.getPrincipal().isAnonymous()) {
      onNavigate("admin");
    }
  }, [identity, onNavigate]);

  const handleLogout = useCallback(() => {
    clear();
    onNavigate("home");
  }, [clear, onNavigate]);

  const handleDownload = useCallback(() => {
    const rows = [
      "Team Name,Leader Name",
      ...teams.map((t) => `"${t.teamName}","${t.leaderName}"`),
    ];
    const csv = rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `inferno26-teams-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("CSV downloaded!", {
      description: `${teams.length} team(s) exported.`,
    });
  }, [teams]);

  const handleDelete = useCallback(
    (index: number, teamName: string) => {
      onDelete(index);
      toast.error(`${teamName} removed.`, { duration: 2500 });
    },
    [onDelete],
  );

  const principalStr = identity?.getPrincipal().toString();
  const shortPrincipal = principalStr
    ? `${principalStr.slice(0, 8)}…${principalStr.slice(-6)}`
    : "";

  return (
    <motion.main
      key="panel"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="min-h-screen pt-14 px-4 pb-16"
    >
      <div className="max-w-5xl mx-auto py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 bg-primary/10 border border-primary/40 flex items-center justify-center clip-corner-sm">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-foreground uppercase tracking-tight">
                Registered Teams
              </h1>
              <Badge className="bg-primary/20 text-primary border-primary/30 font-mono text-xs">
                {teams.length}
              </Badge>
            </div>
            {shortPrincipal && (
              <p className="text-xs text-muted-foreground font-mono ml-12">
                Logged in as{" "}
                <span className="text-primary/80">{shortPrincipal}</span>
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <CyberButton
              variant="green"
              onClick={handleDownload}
              disabled={teams.length === 0}
              dataOcid="panel.download.button"
            >
              <Download className="w-4 h-4" />
              Download CSV
            </CyberButton>
            <CyberButton
              variant="ghost"
              onClick={handleLogout}
              dataOcid="panel.logout.button"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </CyberButton>
          </div>
        </div>

        {/* Table card */}
        <div className="bg-card border border-border shadow-panel clip-corner overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-primary via-primary/60 to-transparent" />

          {teams.length === 0 ? (
            <div
              data-ocid="panel.teams.empty_state"
              className="py-20 flex flex-col items-center justify-center gap-4"
            >
              <div className="w-16 h-16 bg-muted/50 border border-border flex items-center justify-center clip-corner">
                <Users className="w-7 h-7 text-muted-foreground/40" />
              </div>
              <div className="text-center">
                <p className="font-display font-semibold text-muted-foreground uppercase tracking-wider text-sm">
                  No Teams Registered
                </p>
                <p className="text-xs text-muted-foreground/60 font-mono mt-1">
                  Teams will appear here once they register.
                </p>
              </div>
              <CyberButton
                variant="cyan"
                onClick={() => onNavigate("register")}
                className="mt-2"
              >
                <ChevronRight className="w-4 h-4" />
                Open Registration
              </CyberButton>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table data-ocid="panel.teams.table">
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="w-12 text-xs font-mono tracking-widest text-muted-foreground uppercase py-4 pl-6">
                      #
                    </TableHead>
                    <TableHead className="text-xs font-mono tracking-widest text-muted-foreground uppercase py-4">
                      Team Name
                    </TableHead>
                    <TableHead className="text-xs font-mono tracking-widest text-muted-foreground uppercase py-4">
                      Leader
                    </TableHead>
                    <TableHead className="text-xs font-mono tracking-widest text-muted-foreground uppercase py-4 pr-6 text-right">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teams.map((team, i) => (
                    <TableRow
                      key={`${team.teamName}-${i}`}
                      data-ocid={`panel.team.row.${i + 1}`}
                      className="border-border hover:bg-white/3 transition-colors"
                    >
                      <TableCell className="font-mono text-xs text-muted-foreground pl-6 py-4">
                        {String(i + 1).padStart(2, "0")}
                      </TableCell>
                      <TableCell className="font-display font-semibold text-foreground py-4">
                        {team.teamName}
                      </TableCell>
                      <TableCell className="text-foreground/80 font-body text-sm py-4">
                        {team.leaderName}
                      </TableCell>
                      <TableCell className="py-4 pr-6 text-right">
                        <CyberButton
                          variant="red"
                          className="py-1.5 px-3 text-xs"
                          onClick={() => handleDelete(i, team.teamName)}
                          dataOcid={`panel.team.delete_button.${i + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </CyberButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground/40 font-mono">
          {teams.length > 0
            ? `${teams.length} team${teams.length !== 1 ? "s" : ""} registered for INFERNO'26`
            : ""}
        </p>
      </div>
    </motion.main>
  );
}

// ── App Root ───────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [teams, setTeams] = useState<Team[]>([]);
  const { identity } = useInternetIdentity();

  const handleNavigate = useCallback(
    (p: Page) => {
      // If trying to access panel without auth, redirect to admin login
      if (p === "panel") {
        if (!identity || identity.getPrincipal().isAnonymous()) {
          setPage("admin");
          return;
        }
      }
      setPage(p);
    },
    [identity],
  );

  const handleRegister = useCallback((team: Team) => {
    setTeams((prev) => [...prev, team]);
  }, []);

  const handleDelete = useCallback((index: number) => {
    setTeams((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          classNames: {
            toast: "bg-card border-border text-foreground font-body text-sm",
            title: "font-display",
          },
        }}
      />

      <Navbar currentPage={page} onNavigate={handleNavigate} />

      <AnimatePresence mode="wait">
        {page === "home" && <HomePage key="home" onNavigate={handleNavigate} />}
        {page === "register" && (
          <RegisterPage
            key="register"
            onNavigate={handleNavigate}
            onRegister={handleRegister}
          />
        )}
        {page === "admin" && (
          <AdminLoginPage key="admin" onNavigate={handleNavigate} />
        )}
        {page === "panel" && (
          <AdminPanelPage
            key="panel"
            teams={teams}
            onDelete={handleDelete}
            onNavigate={handleNavigate}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
