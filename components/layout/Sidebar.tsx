"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Sub-komponen NavItem - Warna diubah menjadi Putih Soft & Glassmorphism
const NavItem = ({ label, iconPath, href }: { label: string; iconPath: string; href: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="no-underline">
      <div className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300 group relative ${
        isActive 
          ? "bg-white/[0.12] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/5" 
          : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
      }`}>
        <svg
          className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
            isActive ? "text-[#00bcd4] drop-shadow-[0_0_8px_rgba(0,188,212,0.4)]" : "opacity-40 group-hover:opacity-100"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
        </svg>
        <span className={`font-semibold text-[15px] tracking-wide ${isActive ? "text-white" : ""}`}>{label}</span>
      </div>
    </Link>
  );
};

// Sub-komponen SubItem - Warna border & background lebih halus
const SubItem = ({ label, iconPath, href }: { label: string; iconPath: string; href: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="no-underline">
      <div className={`flex items-center gap-3 px-4 py-2.5 transition-all duration-200 border-l-2 ml-7 ${
        isActive 
          ? "border-white/40 text-white bg-white/[0.05]" 
          : "border-slate-800 text-slate-500 hover:text-slate-200 hover:border-slate-600"
      }`}>
        <svg
          className={`w-4 h-4 ${isActive ? "opacity-100" : "opacity-30"}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
        </svg>
        <span className="text-[13px] font-bold tracking-widest">{label}</span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const [isMasterOpen, setIsMasterOpen] = useState(true);

  return (
    /* Sidebar Background - Ditambahkan gradasi Putih Soft dari atas */
    <aside className="w-[280px] h-screen bg-[#0f172a] bg-gradient-to-b from-white/[0.02] to-transparent flex flex-col py-8 px-5 shrink-0 overflow-hidden border-r border-white/[0.05]">
      {/* Logo Section - Gradient diubah agar ada elemen putih susu */}
      <div className="flex items-center gap-4 px-2 mb-10">
        <div className="w-11 h-11 bg-gradient-to-tr from-[#00bcd4] to-white/20 rounded-2xl flex items-center justify-center font-black text-white text-2xl shadow-[0_8px_20px_-6px_rgba(255,255,255,0.1)] border border-white/10">
          S
        </div>
        <div className="flex flex-col"> 
          <span className="font-black text-xl text-white tracking-tighter leading-none italic">
            SALARY<span className="text-[#00bcd4] not-italic"> . </span>
          </span>
          <span className="text-[10px] text-slate-500 font-bold tracking-[3px] uppercase p-1">App</span>
        </div>
      </div>

      {/* Navigasi Utama */}
      <nav className="flex flex-col gap-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <NavItem
          href="/dashboard"
          label="Dashboard"
          iconPath="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />

        {/* Master Dropdown */}
        <div className="mt-4">
          <div
            onClick={() => setIsMasterOpen(!isMasterOpen)}
            className="flex items-center justify-between px-4 py-3 text-slate-500 hover:text-white cursor-pointer select-none group transition-colors"
          >
            <div className="flex items-center gap-4">
              {/* Ikon Master - Ditambah sentuhan putih transparan */}
              <div className="rounded-lg bg-white/[0.03] border border-white/5 group-hover:bg-[#00bcd4]/10 transition-all p-1">
                <svg className="w-4 h-4 group-hover:text-[#00bcd4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7zM4 7c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3M4 12c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3" />
                </svg>
              </div>
              <span className="font-bold text-xs uppercase tracking-widest">Master</span>
            </div>
            <svg
              className={`w-4 h-4 transition-transform duration-500 ${isMasterOpen ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <div className={`flex flex-col gap-0.5 overflow-hidden transition-all duration-300 ${isMasterOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
            <SubItem href="/divisi" label="Divisi" iconPath="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5" />
            <SubItem href="/jabatan" label="Jabatan" iconPath="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            <SubItem href="/karyawan" label="Karyawan" iconPath="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" />
            <SubItem href="/user" label="User" iconPath="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v1m-4 0h4" />
          </div>   
        </div>

        {/* Menu Lainnya */}
        <div className="flex flex-col gap-2">
          <NavItem href="/presensi" label="Presensi" iconPath="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 012 2z" />
          <NavItem href="/cuti" label="Cuti" iconPath="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          <NavItem href="/gaji" label="Gaji" iconPath="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </div>
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-6 border-t border-white/[0.05]">
        <Link href="/sign-in" className="flex items-center gap-4 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/[0.08] border border-transparent hover:border-red-500/10 transition-all duration-300 group">
          <div className="p-2 rounded-xl bg-red-500/5 group-hover:bg-red-500/10 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <span className="font-bold text-sm">Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;