"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";

interface Karyawan {
  uuid: string;
  nik: string;
  nama: string;
  email: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat: string;
  id_jabatan: number;
  status_aktif: boolean;
  jabatan?: { jabatan: string };
}

interface Jabatan {
  id: number;
  jabatan: string;
}

const KaryawanPage = () => {
  const [dataKaryawan, setDataKaryawan] = useState<Karyawan[]>([]);
  const [dataJabatan, setDataJabatan] = useState<Jabatan[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingUuid, setEditingUuid] = useState<string | null>(null);
  
  // State Baru untuk Detail
  const [showDetail, setShowDetail] = useState<Karyawan | null>(null);

  const [form, setForm] = useState({
    nik: "",
    nama: "",
    email: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    alamat: "",
    id_jabatan: "",
    status_aktif: "true",
  });

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const fetchData = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const headers = { Authorization: `Bearer ${token}` };
      const [resKaryawan, resJabatan] = await Promise.all([
        fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan", { headers }),
        fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan", { headers }),
      ]);
      const jsonKaryawan = await resKaryawan.json();
      const jsonJabatan = await resJabatan.json();
      setDataKaryawan(jsonKaryawan.data || jsonKaryawan);
      setDataJabatan(jsonJabatan.data || jsonJabatan);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    const method = editingUuid ? "PATCH" : "POST";
    const url = editingUuid 
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan/${editingUuid}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          ...form,
          id_jabatan: parseInt(form.id_jabatan),
          status_aktif: form.status_aktif === "true",
        }),
      });

      if (res.ok) {
        alert(editingUuid ? "Data Berhasil Diperbarui!" : "Data Berhasil Disimpan!");
        resetForm();
        fetchData();
      } else {
        const errData = await res.json();
        alert(errData.message || "Terjadi kesalahan");
      }
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (uuid: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan/${uuid}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchData();
    } catch (err) { console.error(err); }
  };

  const handleEdit = (item: Karyawan) => {
    setEditingUuid(item.uuid);
    setForm({
      nik: item.nik, nama: item.nama, email: item.email,
      tempat_lahir: item.tempat_lahir, tanggal_lahir: item.tanggal_lahir,
      alamat: item.alamat, id_jabatan: item.id_jabatan.toString(),
      status_aktif: item.status_aktif.toString(),
    });
  };

  const resetForm = () => {
    setEditingUuid(null);
    setForm({
      nik: "", nama: "", email: "", tempat_lahir: "",
      tanggal_lahir: "", alamat: "", id_jabatan: "", status_aktif: "true"
    });
  };

  return (
    <div className="w-full h-screen flex bg-[#f8fafc] text-slate-800 transition-colors duration-500 overflow-hidden relative">
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
            <div className="h-11 w-11 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 font-bold">A</div>
          </div>
        </header>

        <main className="p-10 max-w-[1600px] mx-auto w-full">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Management Karyawan</h2>
            <p className="text-slate-400 mt-1 font-medium">Manage employee records and information.</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* Form */}
            <div className="xl:col-span-4 bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
               <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center text-[#00bcd4]">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2.5" strokeLinecap="round"/></svg>
                </div>
                <h3 className="font-black text-slate-800 tracking-tight">{editingUuid ? "Edit Karyawan" : "Tambah Karyawan"}</h3>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-1">NIK</label>
                    <input type="text" value={form.nik} onChange={(e) => setForm({...form, nik: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none text-sm" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Nama</label>
                    <input type="text" value={form.nama} onChange={(e) => setForm({...form, nama: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none text-sm" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none text-sm" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Tempat Lahir</label>
                    <input type="text" value={form.tempat_lahir} onChange={(e) => setForm({...form, tempat_lahir: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Tanggal Lahir</label>
                    <input type="date" value={form.tanggal_lahir} onChange={(e) => setForm({...form, tanggal_lahir: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none text-sm text-slate-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Alamat</label>
                  <textarea value={form.alamat} onChange={(e) => setForm({...form, alamat: e.target.value})} rows={2} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none text-sm resize-none"></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Jabatan</label>
                  <select value={form.id_jabatan} onChange={(e) => setForm({...form, id_jabatan: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none text-sm text-slate-500" required>
                    <option value="">Pilih Jabatan</option>
                    {dataJabatan.map((jab) => <option key={jab.id} value={jab.id}>{jab.jabatan}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Status Aktif</label>
                  <select value={form.status_aktif} onChange={(e) => setForm({...form, status_aktif: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none text-sm text-slate-500">
                    <option value="true">Aktif</option>
                    <option value="false">Non-Aktif</option>
                  </select>
                </div>
                <button type="submit" className="w-full py-4 bg-[#00bcd4] hover:bg-[#00acc1] text-white rounded-2xl font-black text-sm transition-all uppercase tracking-widest">
                    {editingUuid ? "Update Data" : "Simpan Data"}
                </button>
              </form>
            </div>

            {/* Tabel */}
            <div className="xl:col-span-8 bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
                <h3 className="font-black text-slate-800 tracking-tight">Data Karyawan</h3>
                <span className="bg-sky-50 text-[#00bcd4] text-[10px] font-bold px-4 py-1.5 rounded-full border border-sky-100">● {dataKaryawan.length} Items</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama</th>
                      <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Jabatan</th>
                      <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {loading ? (
                        <tr><td colSpan={4} className="p-10 text-center font-bold text-slate-400">Loading...</td></tr>
                    ) : (
                      dataKaryawan.map((row) => (
                        <tr key={row.uuid} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-8 py-5 text-sm font-black text-slate-700">
                              <div>{row.nama}</div>
                              <div className="text-[10px] text-slate-400 font-medium">{row.nik}</div>
                          </td>
                          <td className="px-8 py-5">
                            <span className="px-4 py-1.5 rounded-lg bg-slate-100 text-slate-500 text-[11px] font-bold">{row.jabatan?.jabatan || "N/A"}</span>
                          </td>
                          <td className="px-8 py-5 text-center">
                            <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black border ${row.status_aktif ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                              {row.status_aktif ? "AKTIF" : "NON-AKTIF"}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-center">
                            <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                               {/* Tombol Info / Detail */}
                               <button onClick={() => setShowDetail(row)} className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-400 hover:text-emerald-500 transition-all" title="Detail">
                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2"/></svg>
                               </button>
                               <button onClick={() => handleEdit(row)} className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-400 hover:text-[#00bcd4] transition-all" title="Edit">
                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeWidth="2"/></svg>
                               </button>
                               <button onClick={() => handleDelete(row.uuid)} className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-400 hover:text-red-500 transition-all" title="Hapus">
                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2"/></svg>
                               </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>

        {/* MODAL DETAIL KARYAWAN */}
        {showDetail && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowDetail(null)}></div>
            <div className="relative bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Detail Karyawan</h3>
                <button onClick={() => setShowDetail(null)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                  <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2"/></svg>
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">NIK</p>
                    <p className="text-sm font-bold text-slate-700">{showDetail.nik}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Jabatan</p>
                    <span className="px-3 py-1 bg-[#00bcd4]/10 text-[#00bcd4] rounded-lg text-[11px] font-bold">{showDetail.jabatan?.jabatan || "N/A"}</span>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Nama Lengkap</p>
                    <p className="text-base font-black text-slate-800">{showDetail.nama}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email</p>
                    <p className="text-sm font-bold text-slate-600">{showDetail.email}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tempat Lahir</p>
                    <p className="text-sm font-bold text-slate-700">{showDetail.tempat_lahir || "-"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tanggal Lahir</p>
                    <p className="text-sm font-bold text-slate-700">{showDetail.tanggal_lahir || "-"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Alamat</p>
                    <p className="text-sm font-medium text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100 italic">"{showDetail.alamat || "Tidak ada alamat"}"</p>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-slate-50/50 flex justify-end">
                <button onClick={() => setShowDetail(null)} className="px-8 py-3 bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-700 transition-all">Tutup</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KaryawanPage;