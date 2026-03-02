"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";

// Sub-komponen Card Statistik - Dibuat lebih lembut dengan border halus
const StatCard = ({ label, value, trend, icon, trendClass }: any) => (
  <div className="rounded-[24px] bg-white p-6 border border-slate-100 hover:shadow-md hover:translate-y-[-2px] transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl">
        {icon}
      </div>
      <span className={`text-[11px] font-bold px-3 py-1 rounded-lg ${trendClass}`}>
        {trend}
      </span>
    </div>
    <p className="text-xs font-bold tracking-wider uppercase text-slate-400">{label}</p>
    <p className="text-2xl font-extrabold mt-1 text-slate-800">{value}</p>
  </div>
);

const DashboardPage = () => {
  return (
    // Background utama menggunakan warna Slate 50 (Sangat putih lembut)
    <div className="w-full h-screen flex bg-[#f8fafc] text-slate-800 transition-colors duration-500 overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-y-auto bg-[#f8fafc]">
        {/* Header - White Glossy */}
        <header className="flex h-20 items-center justify-between px-10 border-b border-slate-100 shrink-0 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-black text-slate-800 tracking-tight">DASHBOARD</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[2px]">Overview System</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold leading-tight text-slate-800">Administrator</p>
              <p className="text-[11px] text-[#00bcd4] font-medium">Super User</p>
            </div>
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-slate-100 to-white flex items-center justify-center text-slate-400 border border-slate-200 font-bold shadow-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </header>

        <main className="p-10 max-w-7xl mx-auto w-full">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">
              Selamat Datang, <span className="text-[#00bcd4]">Admin</span>
            </h2>
            <p className="text-slate-400 mt-1 font-medium">Ringkasan aktivitas penggajian Anda hari ini.</p>
          </div>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
            <StatCard label="Total Karyawan" value="124" trend="+12%" icon="👥" trendClass="bg-emerald-50 text-emerald-600 border border-emerald-100" />
            <StatCard label="Divisi" value="8" trend="Stable" icon="🏢" trendClass="bg-blue-50 text-blue-600 border border-blue-100" />
            <StatCard label="Payroll" value="Rp 450M" trend="+5%" icon="💰" trendClass="bg-emerald-50 text-emerald-600 border border-emerald-100" />
            <StatCard label="Pending" value="12" trend="-2" icon="⏳" trendClass="bg-orange-50 text-orange-600 border border-orange-100" />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Recent Activities - Mengambil 2 kolom */}
            <div className="lg:col-span-2 rounded-[32px] bg-white p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-3">
                  Aktivitas Terbaru
                </h3>
                <button className="text-xs font-bold text-[#00bcd4] hover:underline">Lihat Semua</button>
              </div>
              <div className="space-y-5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-white transition-colors">
                        <span className="text-sm">📝</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-700">Pembaruan Data Divisi "IT Support"</p>
                        <p className="text-[11px] text-slate-400 font-medium">Oleh Administrator • 2 Jam yang lalu</p>
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                ))}
              </div>
            </div>

            {/* Coming Soon Section - Lebih Elegan */}
            <div className="rounded-[32px] bg-gradient-to-b from-white to-slate-50 border border-slate-100 flex flex-col items-center justify-center p-8 text-center shadow-sm">
              <div className="h-20 w-20 bg-white rounded-3xl shadow-xl shadow-slate-200/50 flex items-center justify-center mb-6 text-3xl animate-bounce">
                🚀
              </div>
              <h4 className="text-lg font-bold text-slate-800">Laporan Baru</h4>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed font-medium">Kami sedang menyiapkan fitur analitik mendalam untuk mempermudah pekerjaan Anda.</p>
              <div className="mt-6 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-[#00bcd4] rounded-full"></div>
              </div>
              <p className="text-[10px] mt-2 font-bold text-slate-300">65% DEVELOPMENT</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;