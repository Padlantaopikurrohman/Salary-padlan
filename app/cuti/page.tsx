"use client";

import Sidebar from "@/components/layout/Sidebar";
import React from "react";

const CutiPage = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />

      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Header - White Glossy (Identik dengan Divisi & Presensi) */}
        <header className="flex h-20 items-center justify-between px-10 border-b border-slate-100 bg-white/80 backdrop-blur-md shrink-0 sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-black text-slate-800 tracking-tight uppercase">Cuti</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[2px]">Leave Management</p>
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
          <div className="mb-10 flex justify-between items-end">
            <div>
              <h2 className="text-[28px] font-black text-slate-900 tracking-tighter">Permohonan Cuti</h2>
              <p className="text-slate-500 font-medium text-sm">Review, approve, or decline employee leave requests.</p>
            </div>
            <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[2px] hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95 flex items-center gap-2">
              <span className="text-lg leading-none">+</span> Pengajuan Baru
            </button>
          </div>

          {/* Stats Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            {[
              { label: "Total Pengajuan", value: "12", color: "text-slate-800" },
              { label: "Menunggu", value: "05", color: "text-amber-500" },
              { label: "Disetujui", value: "06", color: "text-emerald-500" },
              { label: "Ditolak", value: "01", color: "text-rose-500" },
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-slate-200/60 p-6 rounded-[28px] shadow-sm hover:shadow-md transition-all">
                <p className="text-[10px] font-black uppercase tracking-[2px] text-slate-400 mb-2">
                  {stat.label}
                </p>
                <h2 className={`text-3xl font-black ${stat.color} tracking-tighter`}>
                  {stat.value}
                </h2>
              </div>
            ))}
          </div>

          {/* Table Container */}
          <div className="bg-white border border-slate-200/60 rounded-[32px] overflow-hidden shadow-sm">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white/50">
              <h3 className="text-[12px] font-black text-slate-700 uppercase tracking-[2px]">Daftar Pengajuan Cuti</h3>
              <div className="flex gap-2">
                 <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                   Filter: All Status
                 </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-[2px] text-slate-400 border-b border-slate-100">
                    <th className="px-8 py-6">Karyawan</th>
                    <th className="px-6 py-6 text-center">Tipe Cuti</th>
                    <th className="px-6 py-6 text-center">Durasi</th>
                    <th className="px-6 py-6 text-center">Status</th>
                    <th className="px-8 py-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-slate-800 uppercase tracking-tight">Padlan Rahman</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Product Designer</p>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">Cuti Tahunan</span>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <p className="text-sm font-black text-slate-700">3 Hari</p>
                      <p className="text-[10px] text-slate-400 font-medium">12 Mar - 14 Mar</p>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className="px-4 py-1.5 bg-amber-50 text-amber-600 text-[9px] font-black uppercase tracking-[1px] rounded-xl border border-amber-100">
                        Pending
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-end gap-2">
                        <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                          ✓
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Contoh baris yang sudah disetujui */}
                  <tr className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-slate-800 uppercase tracking-tight">Jane Smith</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">HR Manager</p>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">Cuti Sakit</span>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <p className="text-sm font-black text-slate-700">1 Hari</p>
                      <p className="text-[10px] text-slate-400 font-medium">10 Mar</p>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-[1px] rounded-xl border border-emerald-100">
                        Approved
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-end">
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">No Action Needed</span>
                      </div>
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

export default CutiPage;