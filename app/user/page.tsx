"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";

const UserPage = () => {
  return (
    <div className="w-full h-screen flex bg-[#f8fafc] text-slate-800 transition-colors duration-500 overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-y-auto bg-[#f8fafc]">
        {/* Header */}
        <header className="flex h-20 items-center justify-between px-10 border-b border-slate-100 shrink-0 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-black text-slate-800 tracking-tight uppercase">User</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[2px]">System Access</p>
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
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Management User</h2>
            <p className="text-slate-400 mt-1 font-medium">Control system access and user permissions.</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* Form Tambah User (Sisi Kiri) sesuai Gambar */}
            <div className="xl:col-span-4 bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2.5" strokeLinecap="round"/></svg>
                </div>
                <h3 className="font-black text-slate-800 tracking-tight">Tambah User</h3>
              </div>

              <form className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Nama</label>
                  <input type="text" placeholder="Nama Lengkap" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-[#00bcd4] outline-none transition-all text-sm" />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Email</label>
                  <input type="email" placeholder="email@example.com" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-[#00bcd4] outline-none transition-all text-sm" />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-[#00bcd4] outline-none transition-all text-sm" />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Role</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-[#00bcd4] outline-none transition-all text-sm text-slate-500 appearance-none cursor-pointer">
                    <option>User / Karyawan</option>
                    <option>Admin</option>
                    <option>Super Admin</option>
                  </select>
                </div>

                <button type="submit" className="w-full py-4 bg-[#07476e] hover:bg-[#0a5a8a] text-white rounded-2xl font-black text-sm shadow-lg shadow-blue-100 transition-all active:scale-[0.98] mt-4 uppercase tracking-widest">
                  Simpan
                </button>
              </form>
            </div>

            {/* Tabel Data User (Sisi Kanan) sesuai Gambar */}
            <div className="xl:col-span-8 bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
                <h3 className="font-black text-slate-800 tracking-tight">Data User</h3>
                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-4 py-1.5 rounded-full border border-emerald-100 tracking-tighter">
                  ● 3 Items Total
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest w-16">No</th>
                      <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama</th>
                      <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</th>
                      <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                      <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { id: 1, nama: "Admin HRD", email: "hrd@mail.com", role: "ADMIN", roleColor: "bg-amber-50 text-amber-600 border-amber-100" },
                      { id: 2, nama: "John Doe", email: "john@mail.com", role: "USER", roleColor: "bg-slate-100 text-slate-600 border-slate-200" },
                      { id: 3, nama: "Jane Smith", email: "jane@mail.com", role: "USER", roleColor: "bg-slate-100 text-slate-600 border-slate-200" },
                    ].map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-6 text-sm font-bold text-[#07476e]">{row.id}</td>
                        <td className="px-8 py-6 text-sm font-black text-slate-700">{row.nama}</td>
                        <td className="px-8 py-6 text-sm font-medium text-slate-400">{row.email}</td>
                        <td className="px-8 py-6 text-center">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border ${row.roleColor}`}>
                            {row.role}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-300 hover:text-[#00bcd4] transition-all">
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeWidth="2.5"/></svg>
                             </button>
                             <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-300 hover:text-red-500 transition-all">
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2.5"/></svg>
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

export default UserPage;