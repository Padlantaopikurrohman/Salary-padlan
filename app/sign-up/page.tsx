"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Register gagal");

      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f172a] relative overflow-hidden p-6">
      
      {/* Background Decorative Orbs - Animasi halus untuk kedalaman */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] animate-pulse delay-700" />
      </div>

      <main className="relative w-full max-w-[480px] z-10">
        {/* Card Glassmorphism */}
        <div className="rounded-[32px] bg-white/[0.03] backdrop-blur-xl p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-white/[0.08] relative overflow-hidden">
          
          {/* Accent Top Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00bcd4]/50 to-transparent" />

          {/* Brand Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr pr-1  from-[#00bcd4] to-white/20 flex items-center justify-center text-white text-2xl mb-5 shadow-[0_0_30px_rgba(0,188,212,0.3)] border border-white/20 font-black italic">
              S
            </div>
            <h1 className="text-3xl font-black tracking-tighter text-white">
                <span className="italic text-[#00bcd4]">Salary.</span>App
            </h1>
            <p className="text-slate-400 mt-2 font-medium text-sm text-center tracking-wide">
              Create an account to start managing payroll.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* FULL NAME */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-[2px] text-slate-400 ml-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all font-medium"
                required
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-[2px] text-slate-400 ml-1">Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all font-medium"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-[2px] text-slate-400 ml-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all font-medium"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[12px] py-3 px-4 rounded-xl font-bold flex items-center gap-2 animate-pulse">
                <span>⚠️</span> {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-2xl bg-[#00bcd4] py-4 text-slate-950 font-black text-sm uppercase tracking-widest transition-all hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(0,188,212,0.4)] disabled:opacity-50 active:scale-[0.98] mt-4"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <div className="h-5 w-5 border-[3px] border-slate-900/30 border-t-slate-950 rounded-full animate-spin" />
                ) : (
                  "Create Account"
                )}
              </span>
            </button>

            {/* Footer Navigation */}
            <div className="text-center mt-8 pt-6 border-t border-white/5">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                Already part of the team?{" "}
                <button 
                  type="button"
                  onClick={() => router.push("/sign-in")}
                  className="text-[#00bcd4] hover:text-cyan-300 transition-colors ml-1"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* System Credit */}
        <p className="text-center text-slate-600 text-[10px] mt-8 font-bold tracking-[4px] uppercase">
          Salary App v2.0 &bull; Secure Terminal
        </p>
      </main>
    </div>
  );
} 