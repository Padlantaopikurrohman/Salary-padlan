"use client";

import Sidebar from "@/components/layout/Sidebar";
import React from "react";

const ReportGajiPage = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />

      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Header - White Soft Glassmorphism */}
        <header className="flex h-20 items-center justify-between px-10 border-b border-slate-100 bg-white/80 backdrop-blur-md shrink-0 sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-black text-slate-800 tracking-tight uppercase">Report Gaji</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[2px]">Payroll Reports & History</p>
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
          {/* Filter Section */}
          <div className="mb-10 flex flex-wrap justify-between items-end gap-6">
            <div>
              <h2 className="text-[28px] font-black text-slate-900 tracking-tighter uppercase">Laporan Penggajian</h2>
              <p className="text-slate-500 font-medium text-sm">Arsip dan rekapitulasi pembayaran gaji karyawan.</p>
            </div>
            
            <div className="flex gap-3">
              <div className="bg-white border border-slate-200 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-sm">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bulan:</span>
                <select className="bg-transparent text-sm font-black text-slate-800 focus:outline-none cursor-pointer">
                  <option>Maret 2026</option>
                  <option>Februari 2026</option>
                  <option>Januari 2026</option>
                </select>
              </div>
              <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[2px] hover:bg-[#00bcd4] transition-all flex items-center gap-2 shadow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                Export PDF
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white border border-slate-200/60 rounded-[32px] overflow-hidden shadow-sm">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white/50">
              <h3 className="text-[12px] font-black text-slate-700 uppercase tracking-[2px]">Rekap Gaji Periode Maret</h3>
              <span className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-100">
                Completed
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-[2px] text-slate-400 border-b border-slate-100">
                    <th className="px-10 py-6">Karyawan</th>
                    <th className="px-6 py-6 text-center">Metode</th>
                    <th className="px-6 py-6 text-center">Tanggal Bayar</th>
                    <th className="px-6 py-6 text-right">Total Netto</th>
                    <th className="px-10 py-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-10 py-7">
                      <p className="text-sm font-black text-slate-800 uppercase tracking-tight">Padlan Taopikurrohman</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider italic">ID: EMP-001</p>
                    </td>
                    <td className="px-6 py-7 text-center">
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg uppercase tracking-widest">Transfer Bank</span>
                    </td>
                    <td className="px-6 py-7 text-center">
                      <p className="text-sm font-bold text-slate-700">25 Mar 2026</p>
                    </td>
                    <td className="px-6 py-7 text-right">
                      <span className="text-base font-black text-slate-900 tracking-tighter uppercase">Rp 9.550.000</span>
                    </td>
                    <td className="px-10 py-7 text-right">
                      <button className="text-[10px] font-black text-[#00bcd4] hover:text-slate-900 uppercase tracking-widest transition-colors border-b-2 border-transparent hover:border-[#00bcd4]">
                        Detail Slip
                      </button>
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

export default ReportGajiPage;