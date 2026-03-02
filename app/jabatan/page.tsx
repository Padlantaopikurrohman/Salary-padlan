"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function JabatanPage() {
  // Data dummy sesuai gambar referensi
  const dataJabatan = [
    { id: 1, jabatan: "STAFF", divisi: "INFORMATION TECHNOLOGY", gaji: "Rp 3.000.000" },
    { id: 2, jabatan: "HEAD OF", divisi: "HRD", gaji: "Rp 5.000.000" },
  ];

  return (
    <div className="w-full h-screen flex bg-black text-white overflow-hidden font-sans">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-y-auto bg-black">
        {/* Header */}
        <header className="flex h-16 items-center justify-between px-8 border-b border-white/5 shrink-0">
          <h1 className="text-xl font-bold">Jabatan</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold leading-tight">Administrator</p>
              <p className="text-xs text-slate-500">Payroll Management</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-white/10 font-bold">
              A
            </div>
          </div>
        </header>

        <main className="p-8">
          <div className="mb-10">
            <h2 className="text-4xl font-extrabold tracking-tight">Management Jabatan</h2>
            <p className="text-slate-400 mt-2 text-lg">Configure positions and salary structures.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Tambah Jabatan */}
            <div className="lg:col-span-4">
              <div className="rounded-[32px] bg-[#0f0f0f] p-8 border border-white/5 shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-cyan-400 text-xl font-bold">
                    +
                  </div>
                  <h3 className="text-xl font-bold">Tambah Jabatan</h3>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2 ml-1">Nama Jabatan</label>
                    <input 
                      type="text" 
                      placeholder="Contoh: Manager IT"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2 ml-1">Pilih Divisi</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-slate-400 focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer">
                      <option>Pilih Divisi</option>
                      <option>INFORMATION TECHNOLOGY</option>
                      <option>HRD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2 ml-1">Gaji Pokok</label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 font-bold">Rp</span>
                      <input 
                        type="number" 
                        placeholder="0"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all"
                      />
                    </div>
                  </div>
                  
                  <button className="w-full bg-[#005a8d] hover:bg-[#0077b6] text-white font-bold py-4 rounded-2xl shadow-lg transition-all mt-4">
                    Simpan
                  </button>
                </div>
              </div>
            </div>

            {/* Tabel Data Jabatan */}
            <div className="lg:col-span-8">
              <div className="rounded-[32px] bg-[#0f0f0f] border border-white/5 shadow-2xl overflow-hidden">
                <div className="p-8 flex items-center justify-between border-b border-white/5">
                  <h3 className="text-xl font-bold">Data Jabatan</h3>
                  <span className="bg-cyan-500/10 text-cyan-400 text-[11px] font-bold px-3 py-1 rounded-full border border-cyan-500/20">
                    ● {dataJabatan.length} Items Total
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-slate-500 text-[12px] uppercase tracking-widest">
                        <th className="px-6 py-6 font-bold">No</th>
                        <th className="px-6 py-6 font-bold">Jabatan</th>
                        <th className="px-6 py-6 font-bold">Divisi</th>
                        <th className="px-6 py-6 font-bold">Gaji Pokok</th>
                        <th className="px-6 py-6 font-bold text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {dataJabatan.map((item, index) => (
                        <tr key={item.id} className="group hover:bg-white/[0.03] transition-all duration-300">
                          <td className="px-6 py-6 font-bold text-slate-500">{index + 1}</td>
                          <td className="px-6 py-6 font-bold text-slate-200 uppercase">{item.jabatan}</td>
                          <td className="px-6 py-6">
                            <span className="bg-white/5 border border-white/10 text-[10px] font-bold px-3 py-1.5 rounded-full text-slate-400 uppercase">
                              {item.divisi}
                            </span>
                          </td>
                          <td className="px-6 py-6 font-bold text-emerald-400">{item.gaji}</td>
                          <td className="px-6 py-6">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <button className="p-2 rounded-lg bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-white transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </button>
                              <button className="p-2 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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