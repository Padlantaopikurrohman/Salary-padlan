"use client";

import Sidebar from "@/components/layout/Sidebar";
import React from "react";

const ProsesGajiPage = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />

      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Header - White Soft Glassmorphism */}
        <header className="flex h-20 items-center justify-between px-10 border-b border-slate-100 bg-white/80 backdrop-blur-md shrink-0 sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-black text-slate-800 tracking-tight uppercase">Proses Gaji</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[2px]">Payroll Management System</p>
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

        {/* Main Content */}
        <main className="flex-1 p-10 overflow-y-auto">
          <div className="mb-10 flex justify-between items-end">
            <div>
              <h2 className="text-[28px] font-black text-slate-900 tracking-tighter uppercase">Rincian Penggajian</h2>
              <p className="text-slate-500 font-medium text-sm">Kelola dan hitung gaji karyawan secara akurat.</p>
            </div>
            <button className="bg-[#00bcd4] text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[2px] shadow-[0_8_20_rgba(0,188,212,0.3)] hover:scale-105 transition-all">
              Generate Payroll
            </button>
          </div>

          {/* Table Container */}
          <div className="bg-white border border-slate-200/60 rounded-[32px] overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-[2px] text-slate-400 border-b border-slate-100">
                  <th className="px-8 py-6">Nama Karyawan</th>
                  <th className="px-6 py-6 text-center">Gaji Pokok</th>
                  <th className="px-6 py-6 text-center">Potongan</th>
                  <th className="px-8 py-6 text-right">Total Akhir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-slate-800 tracking-tight uppercase">Padlan Taopikurrohman</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Developer</p>
                  </td>
                  <td className="px-6 py-6 text-center font-bold text-slate-600">Rp 8.000.000</td>
                  <td className="px-6 py-6 text-center font-bold text-rose-400">- Rp 200.000</td>
                  <td className="px-8 py-6 text-right">
                    <span className="text-base font-black text-[#00bcd4] tracking-tighter">Rp 7.800.000</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProsesGajiPage;