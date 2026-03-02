"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function JabatanPage() {
  const dataJabatan = [
    { id: 1, jabatan: "STAFF", divisi: "INFORMATION TECHNOLOGY", gaji: "Rp 3.000.000" },
    { id: 2, jabatan: "HEAD OF", divisi: "HRD", gaji: "Rp 5.000.000" },
  ];

  return (
    // Background utama menggunakan warna Slate 50 (Putih Soft)
    <div className="w-full h-screen flex bg-[#f8fafc] text-slate-800 transition-colors duration-500 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-y-auto">
        {/* Header - White Glossy */}
        <header className="flex h-20 items-center justify-between px-10 border-b border-slate-100 bg-white/80 backdrop-blur-md shrink-0 sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-black text-slate-800 tracking-tight uppercase">Jabatan</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[2px]">Position Settings</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold leading-tight text-slate-800">Administrator</p>
              <p className="text-[11px] text-[#00bcd4] font-medium">Payroll Management</p>
            </div>
            <div className="h-11 w-11 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 font-bold shadow-sm">
              A
            </div>
          </div>
        </header>

        <main className="p-10 max-w-[1600px] mx-auto w-full">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Management Jabatan</h2>
            <p className="text-slate-400 mt-1 font-medium text-lg">Configure positions and salary structures.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Tambah Jabatan */}
            <div className="lg:col-span-4">
              <div className="rounded-[32px] bg-white p-8 border border-slate-100 shadow-sm transition-all">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#00bcd4] text-xl font-bold">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2.5" strokeLinecap="round"/></svg>
                  </div>
                  <h3 className="text-lg font-black text-slate-800 tracking-tight">Tambah Jabatan</h3>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-[11px] font-black text-slate-500 uppercase mb-2 ml-1">Nama Jabatan</label>
                    <input 
                      type="text" 
                      placeholder="Contoh: Manager IT"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00bcd4]/10 focus:border-[#00bcd4] transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-500 uppercase mb-2 ml-1">Pilih Divisi</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00bcd4]/10 focus:border-[#00bcd4] transition-all text-sm appearance-none cursor-pointer">
                      <option>Pilih Divisi</option>
                      <option>INFORMATION TECHNOLOGY</option>
                      <option>HRD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-500 uppercase mb-2 ml-1">Gaji Pokok</label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">Rp</span>
                      <input 
                        type="number" 
                        placeholder="0"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 py-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00bcd4]/10 focus:border-[#00bcd4] transition-all text-sm"
                      />
                    </div>
                  </div>
                  
                  <button className="w-full bg-[#00bcd4] hover:bg-[#00acc1] text-white font-black py-4 rounded-2xl shadow-lg shadow-cyan-100 transition-all mt-4 uppercase tracking-widest text-sm">
                    Simpan Jabatan
                  </button>
                </div>
              </div>
            </div>

            {/* Tabel Data Jabatan */}
            <div className="lg:col-span-8">
              <div className="rounded-[32px] bg-white border border-slate-100 shadow-sm overflow-hidden transition-all">
                <div className="p-8 flex items-center justify-between border-b border-slate-50">
                  <h3 className="text-lg font-black text-slate-800 tracking-tight">Data Jabatan</h3>
                  <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-4 py-1.5 rounded-full border border-emerald-100 uppercase tracking-tighter">
                    ● {dataJabatan.length} Total Posisi
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-slate-400 text-[10px] font-black uppercase tracking-[2px] bg-slate-50/50">
                        <th className="px-8 py-6">No</th>
                        <th className="px-8 py-6">Jabatan</th>
                        <th className="px-8 py-6">Divisi</th>
                        <th className="px-8 py-6">Gaji Pokok</th>
                        <th className="px-8 py-6 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {dataJabatan.map((item, index) => (
                        <tr key={item.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                          <td className="px-8 py-6 text-sm font-bold text-slate-400">{index + 1}</td>
                          <td className="px-8 py-6 text-sm font-black text-slate-700 uppercase">{item.jabatan}</td>
                          <td className="px-8 py-6">
                            <span className="bg-slate-100 border border-slate-200 text-[10px] font-bold px-4 py-1.5 rounded-lg text-slate-500 uppercase tracking-tight">
                              {item.divisi}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-sm font-black text-emerald-600">{item.gaji}</td>
                          <td className="px-8 py-6">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <button title="Edit" className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-[#00bcd4] hover:bg-white border border-transparent hover:border-slate-200 transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </button>
                              <button title="Hapus" className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-white border border-transparent hover:border-slate-200 transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
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
          </div>
        </main>
      </div>
    </div>
  );
}       