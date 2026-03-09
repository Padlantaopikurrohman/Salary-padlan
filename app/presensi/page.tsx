"use client";

import Sidebar from "@/components/layout/Sidebar";
import React from "react";

const PresensiPage = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />

      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Header - White Glossy (Identik dengan Divisi) */}
        <header className="flex h-20 items-center justify-between px-10 border-b border-slate-100 bg-white/80 backdrop-blur-md shrink-0 sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-black text-slate-800 tracking-tight uppercase">Presensi</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[2px]">Attendance Management</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold leading-tight text-slate-800">Administrator</p>
              <p className="text-[11px] text-[#00bcd4] font-medium tracking-wide">Payroll Management</p>
            </div>
            <div className="h-11 w-11 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 font-bold shadow-sm">
              A
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-10 overflow-y-auto">
          {/* Section Title Modern */}
          <div className="mb-10">
            <h2 className="text-[28px] font-black text-slate-900 tracking-tighter">Monitoring Kehadiran</h2>
            <p className="text-slate-500 font-medium text-sm">Review and manage daily employee clock-in/out data.</p>
          </div>

          {/* Stats Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {[
              { label: "Hadir Hari Ini", value: "42", color: "text-[#00bcd4]" },
              { label: "Terlambat", value: "03", color: "text-amber-500" },
              { label: "Tanpa Keterangan", value: "00", color: "text-rose-500" },
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-slate-200/60 p-7 rounded-[32px] shadow-sm hover:shadow-md transition-all">
                <p className="text-[10px] font-black uppercase tracking-[2px] text-slate-400 mb-3">
                  {stat.label}
                </p>
                <h2 className={`text-5xl font-black ${stat.color} tracking-tighter`}>
                  {stat.value}
                </h2>
              </div>
            ))}
          </div>

          {/* Table Container */}
          <div className="bg-white border border-slate-200/60 rounded-[32px] overflow-hidden shadow-sm">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white/50">
              <h3 className="text-[12px] font-black text-slate-700 uppercase tracking-[2px]">Log Presensi Harian</h3>
              <button className="bg-[#00bcd4] text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[2px] hover:shadow-lg hover:shadow-cyan-500/20 transition-all active:scale-95">
                Export Report
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-[2px] text-slate-400 border-b border-slate-100">
                    <th className="px-10 py-6">No</th>
                    <th className="px-6 py-6">Nama Lengkap</th>
                    <th className="px-6 py-6 text-center">Jam Masuk</th>
                    <th className="px-6 py-6 text-center">Jam Pulang</th>
                    <th className="px-10 py-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-10 py-7 text-sm font-black text-slate-300 group-hover:text-[#00bcd4] transition-colors">01</td>
                    <td className="px-6 py-7">
                      <p className="text-sm font-black text-slate-800 uppercase tracking-tight">Padlan Taopikurrohman</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Software Engineer</p>
                    </td>
                    <td className="px-6 py-7 text-center">
                      <span className="text-sm font-black text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg tracking-tight">08:00 AM</span>
                    </td>
                    <td className="px-6 py-7 text-center">
                      <span className="text-sm font-black text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg tracking-tight">05:00 PM</span>
                    </td>
                    <td className="px-10 py-7 text-right">
                      <span className="px-4 py-2 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-[1px] rounded-xl border border-emerald-100">
                        Ontime
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>    
    </div>
  );
};

export default PresensiPage;