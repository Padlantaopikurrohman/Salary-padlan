"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login gagal");

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
      
      {/* Background Orbs - Membuat kedalaman visual */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] animate-pulse delay-700" />
      </div>

      <main className="relative w-full max-w-[460px] z-10">
        {/* Card dengan Efek Glassmorphism & Putih Soft */}
        <div className="rounded-[32px] bg-white/[0.03] backdrop-blur-xl p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-white/[0.08] relative overflow-hidden">
          
          {/* Accent Line di bagian atas card */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

          {/* Logo Section */}
          <div className="flex flex-col items-center mb-10">
            <div className="h-16 w-20 rounded-2xl bg-gradient-to-tr from-[#00bcd4] to-white/20 flex items-center justify-center pr-1 text-white text-3xl mb-6 shadow-[0_0_30px_rgba(0,188,212,0.3)] border border-white/20 font-black italic">
              S
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-white italic">
              SALARY<span className="text-[#00bcd4] not-italic">.</span><span className="text-[20px] ml-1 opacity-80 not-italic uppercase tracking-[4px]">App</span>
            </h1>
            <p className="text-slate-400 mt-3 font-medium text-sm tracking-wide">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Input Email */}
            <div className="space-y-2">
              <label className="block text-[11px] font-black uppercase tracking-[2px] text-slate-400 ml-1">Email Address</label>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="admin@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all font-medium"
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="block text-[11px] font-black uppercase tracking-[2px] text-slate-400">Password</label>
                <button type="button" className="text-[10px] font-black uppercase tracking-wider text-[#00bcd4] hover:text-cyan-300 transition-colors">Forgot?</button>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all font-medium"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[12px] py-3 px-4 rounded-xl font-bold flex items-center gap-2 animate-shake">
                <span className="text-lg">×</span> {error}
              </div>
            )}

            {/* Submit Button - Putih Soft & Cyan Glow */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-2xl bg-[#00bcd4] py-4 text-slate-950 font-black text-sm uppercase tracking-widest transition-all hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(0,188,212,0.4)] disabled:opacity-50 active:scale-[0.98] mt-4"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <div className="h-5 w-5 border-[3px] border-slate-900/30 border-t-slate-950 rounded-full animate-spin" />
                ) : (
                  "Access Dashboard"
                )}
              </span>
            </button>

            {/* Footer Text */}
            <div className="text-center mt-10 pt-6 border-t border-white/5">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                New on our platform?{" "}
                <button 
                  type="button"
                  onClick={() => router.push("/sign-up")}
                  className="text-[#00bcd4] hover:text-cyan-300 transition-colors ml-1"
                >
                  Create Account
                </button>
              </p>
            </div>
          </form>
        </div>
        
        {/* Footer Credit */}
        <p className="text-center text-slate-600 text-[10px] mt-8 font-bold tracking-[4px] uppercase">
          &copy; 2024 Salary App Terminal
        </p>
      </main>
    </div>
  );
}   