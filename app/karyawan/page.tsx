"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";

const KaryawanPage = () => {
  return (
    <div className="w-full h-screen flex bg-[#f8fafc] text-slate-800 transition-colors duration-500 overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-y-auto bg-[#f8fafc]">
        {/* Header */}
        <header className="flex h-20 items-center justify-between px-10 border-b border-slate-100 shrink-0 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-black text-slate-800 tracking-tight uppercase">Karyawan</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[2px]">Data Management</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold leading-tight text-slate-800">Administrator</p>
              <p className="text-[11px] text-[#00bcd4] font-medium">Payroll Management</p>
            </div>
            <div className="h-11 w-11 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 font-bold">
              A
            </div>
          </div>
        </header>

        <main className="p-10 max-w-[1600px] mx-auto w-full">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Management Karyawan</h2>
            <p className="text-slate-400 mt-1 font-medium">Manage employee records and information.</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* Form Tambah Karyawan (Sisi Kiri) */}
            <div className="xl:col-span-4 bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center text-[#00bcd4]">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2.5" strokeLinecap="round"/></svg>
                </div>
                <h3 className="font-black text-slate-800 tracking-tight">Tambah Karyawan</h3>
              </div>

              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-1">NIK</label>
                    <input type="text" placeholder="NIK" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4] outline-none transition-all text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Nama</label>
                    <input type="text" placeholder="Nama Lengkap" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4] outline-none transition-all text-sm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Email</label>
                  <input type="email" placeholder="email@company.com" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4] outline-none transition-all text-sm" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Tempat Lahir</label>
                    <input type="text" placeholder="Kota" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4] outline-none transition-all text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Tanggal Lahir</label>
                    <input type="date" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4] outline-none transition-all text-sm text-slate-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Alamat</label>
                  <textarea placeholder="Alamat Lengkap" rows={3} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4] outline-none transition-all text-sm resize-none"></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Jabatan</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-[#00bcd4] outline-none transition-all text-sm text-slate-500 appearance-none">
                    <option>Pilih Jabatan</option>
                    <option>Manager IT</option>
                    <option>HR Specialist</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Status Aktif</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-[#00bcd4] outline-none transition-all text-sm text-slate-500 appearance-none">
                    <option>Aktif</option>
                    <option>Non-Aktif</option>
                  </select>
                </div>

                <button type="submit" className="w-full py-4 bg-[#00bcd4] hover:bg-[#00acc1] text-white rounded-2xl font-black text-sm shadow-lg shadow-cyan-200 transition-all active:scale-[0.98] mt-4 uppercase tracking-widest">
                  Simpan Data
                </button>
              </form>
            </div>

            {/* Tabel Data Karyawan (Sisi Kanan) */}
            <div className="xl:col-span-8 bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
                <h3 className="font-black text-slate-800 tracking-tight">Data Karyawan</h3>
                <span className="bg-sky-50 text-[#00bcd4] text-[10px] font-bold px-4 py-1.5 rounded-full border border-sky-100 tracking-tighter">
                  ● 2 Items Total
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">No</th>
                      <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama</th>
                      <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Jabatan</th>
                      <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { id: 1, nama: "Ahmad Fauzi", jabatan: "Manager IT", status: "AKTIF" },
                      { id: 2, nama: "Siti Aminah", jabatan: "HR Specialist", status: "AKTIF" },
                    ].map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-5 text-sm font-bold text-slate-400">{row.id}</td>
                        <td className="px-8 py-5 text-sm font-black text-slate-700">{row.nama}</td>
                        <td className="px-8 py-5">
                          <span className="px-4 py-1.5 rounded-lg bg-slate-100 text-slate-500 text-[11px] font-bold border border-slate-200">
                            {row.jabatan}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-center">
                          <span className="px-4 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-black border border-emerald-100">
                            {row.status}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-center">
                          <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-400 hover:text-[#00bcd4] transition-all">
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeWidth="2"/></svg>
                             </button>
                             <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-400 hover:text-red-500 transition-all">
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2"/></svg>
                             </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default KaryawanPage;