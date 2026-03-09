"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Sub-komponen NavItem - Dioptimalkan untuk Dropdown Header
const NavItem = ({ 
  label, 
  iconPath, 
  href, 
  isDropdown = false, 
  isOpen = false, 
  onClick 
}: { 
  label: string; 
  iconPath: string; 
  href?: string; 
  isDropdown?: boolean; 
  isOpen?: boolean; 
  onClick?: () => void 
}) => {
  const pathname = usePathname();
  const isActive = href ? pathname === href : false;

  const content = (
    <div 
      onClick={onClick}
      className={`flex items-center justify-between gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300 group relative ${
        isActive 
          ? "bg-white/[0.12] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/5" 
          : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
      }`}
    >
      <div className="flex items-center gap-4">
        <svg
          className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
            isActive ? "text-[#00bcd4] drop-shadow-[0_0_8px_rgba(0,188,212,0.4)]" : "opacity-40 group-hover:opacity-100"
          }`}
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
        </svg>
        <span className={`font-bold text-[14px] tracking-tight ${isActive ? "text-white" : ""}`}>{label}</span>
      </div>
      
      {isDropdown && (
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-500 opacity-40 ${isOpen ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      )}
    </div>
  );

  return href ? <Link href={href} className="no-underline">{content}</Link> : content;
};

// Sub-komponen SubItem - Style lebih modern & minimalis
const SubItem = ({ label, href }: { label: string; href: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="no-underline">
      <div className={`flex items-center gap-3 px-4 py-2.5 transition-all duration-200 border-l-2 ml-8 ${
        isActive 
          ? "border-[#00bcd4] text-white bg-[#00bcd4]/5" 
          : "border-slate-800 text-slate-500 hover:text-slate-200 hover:border-slate-600"
      }`}>
        <span className="text-[11px] font-black uppercase tracking-[2px]">{label}</span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({
    master: true,
    presensi: false,
    cuti: false,
    gaji: false,
  });

  const toggleMenu = (menu: keyof typeof openMenus) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <aside className="w-[280px] h-screen bg-[#0f172a] bg-gradient-to-b from-white/[0.02] to-transparent flex flex-col py-8 px-5 shrink-0 overflow-hidden border-r border-white/[0.05]">
      
      {/* Brand Logo - More Elegant Font */}
      <div className="flex items-center gap-4 px-2 mb-12">
        <div className="w-11 h-11 bg-gradient-to-tr from-[#00bcd4] to-white/20 rounded-2xl flex items-center justify-center font-black text-white text-2xl shadow-[0_8px_20px_-6px_rgba(0,188,212,0.3)] border border-white/10">
          S
        </div>
        <div className="flex flex-col"> 
          <span className="font-black text-xl text-white tracking-tighter leading-none italic">
            SALARY<span className="text-[#00bcd4] not-italic"> . </span>
          </span>
          <span className="text-[9px] text-slate-500 font-black tracking-[4px] uppercase mt-1">App</span>
        </div>
      </div>

      <nav className="flex flex-col gap-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <p className="px-4 text-[9px] font-black text-slate-600 uppercase tracking-[3px] mb-2">Main Menu</p>
        
        <NavItem
          href="/dashboard"
          label="Dashboard"
          iconPath="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />

        {/* Master Section */}
        <div className="mt-2">
          <NavItem 
            label="Data Master" 
            iconPath="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7z" 
            isDropdown 
            isOpen={openMenus.master} 
            onClick={() => toggleMenu("master")} 
          />
          <div className={`flex flex-col gap-1 overflow-hidden transition-all duration-300 ${openMenus.master ? "max-h-80 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
            <SubItem href="/divisi" label="Divisi" />
            <SubItem href="/jabatan" label="Jabatan" />
            <SubItem href="/karyawan" label="Karyawan" />
            <SubItem href="/user" label="User" />
            <SubItem href="/konfigurasi" label="Konfigurasi" />
          </div>
        </div>

        {/* Presensi Section */}
        <div className="mt-1">
          <NavItem 
            label="Presensi" 
            iconPath="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 012 2z" 
            isDropdown 
            isOpen={openMenus.presensi} 
            onClick={() => toggleMenu("presensi")} 
          />
          <div className={`flex flex-col gap-1 overflow-hidden transition-all duration-300 ${openMenus.presensi ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
            <SubItem href="/presensi" label="Report Presensi" />
          </div>
        </div>

        {/* Cuti Section */}
        <div className="mt-1">
          <NavItem 
            label="Cuti" 
            iconPath="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
            isDropdown 
            isOpen={openMenus.cuti} 
            onClick={() => toggleMenu("cuti")} 
          />
          <div className={`flex flex-col gap-1 overflow-hidden transition-all duration-300 ${openMenus.cuti ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
            <SubItem href="/cuti" label="Report Cuti" />
          </div>
        </div>

        {/* Gaji Section */}
        <div className="mt-1">
          <NavItem 
            label="Gaji" 
            iconPath="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" 
            isDropdown 
            isOpen={openMenus.gaji} 
            onClick={() => toggleMenu("gaji")} 
          />
          <div className={`flex flex-col gap-1 overflow-hidden transition-all duration-300 ${openMenus.gaji ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
            <SubItem href="/proses-gaji" label="Proses Gaji" />
            <SubItem href="/report-gaji" label="Report Gaji" />
          </div>
        </div>
      </nav>

      {/* Logout - Stay Clean */}
      <div className="mt-auto pt-6 border-t border-white/[0.05]">
        <Link href="/sign-in" className="flex items-center gap-4 px-4 py-3 rounded-2xl text-rose-400 hover:bg-rose-500/[0.08] group transition-all duration-300">
          <div className="p-2 rounded-xl bg-rose-500/5 group-hover:bg-rose-500/10 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <span className="font-black text-[12px] uppercase tracking-[2px]">Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;