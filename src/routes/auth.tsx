import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In — Maison Oré" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        setInfo("Account created. You can sign in now.");
        setMode("signin");
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <Link to="/" className="font-display text-3xl block text-center mb-2">Maison Oré</Link>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground text-center mb-10">Admin Access</p>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] block mb-2">Email</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-ink py-2 focus:outline-none focus:border-rust"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] block mb-2">Password</label>
            <input
              type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-ink py-2 focus:outline-none focus:border-rust"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
          {info && <p className="text-sm text-rust">{info}</p>}

          <button type="submit" disabled={loading}
            className="w-full bg-ink text-cream py-4 text-xs uppercase tracking-[0.2em] hover:bg-rust transition disabled:opacity-50">
            {loading ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Admin Account"}
          </button>
        </form>

        <button
          onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(null); setInfo(null); }}
          className="w-full text-xs uppercase tracking-[0.2em] text-muted-foreground mt-8 hover:text-ink transition"
        >
          {mode === "signin" ? "First time? Create the admin account →" : "← Back to sign in"}
        </button>

        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-center mt-10 leading-relaxed">
          The first account created becomes site admin.
        </p>
      </div>
    </main>
  );
}
