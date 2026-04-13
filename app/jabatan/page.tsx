"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";

interface Jabatan {
  id: number;
  jabatan: string;
  id_divisi: number;
  gaji_pokok: number;
  divisi?: { nama: string };
}

interface Divisi {
  id: number;
  nama: string;
}

export default function JabatanPage() {
  const [dataJabatan, setDataJabatan] = useState<Jabatan[]>([]);
  const [dataDivisi, setDataDivisi] = useState<Divisi[]>([]);
  const [loading, setLoading] = useState(false);
  
  // State Form & Edit Mode
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    jabatan: "",
    id_divisi: "",
    gaji_pokok: ""
  });

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  // ===============================
  // FETCH DATA
  // ===============================
  const fetchData = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const resJabatan = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const resDivisi = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const jsonJabatan = await resJabatan.json();
      const jsonDivisi = await resDivisi.json();

      setDataJabatan(jsonJabatan.data || jsonJabatan);
      setDataDivisi(jsonDivisi.data || jsonDivisi);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [token]);

  // ===============================
  // SIMPAN / UPDATE DATA
  // ===============================
  const handleSimpan = async () => {
    if (!form.jabatan || !form.id_divisi || !form.gaji_pokok) {
      return alert("Mohon lengkapi semua field");
    }

    const url = editingId 
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan";
    
    const method = editingId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          jabatan: form.jabatan.toUpperCase(),
          id_divisi: parseInt(form.id_divisi),
          gaji_pokok: parseInt(form.gaji_pokok)
        })
      });

      if (res.ok) {
        setForm({ jabatan: "", id_divisi: "", gaji_pokok: "" });
        setEditingId(null);
        fetchData();
        alert(editingId ? "Jabatan Berhasil Diperbarui!" : "Jabatan Berhasil Disimpan!");
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Gagal memproses data");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ===============================
  // FUNGSI EDIT (SET KE FORM)
  // ===============================
  const handleEdit = (item: Jabatan) => {
    setEditingId(item.id);
    setForm({
      jabatan: item.jabatan,
      id_divisi: item.id_divisi.toString(),
      gaji_pokok: item.gaji_pokok.toString()
    });
    // Scroll ke atas agar user tahu form terisi
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ===============================
  // FUNGSI DELETE
  // ===============================
  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus jabatan ini?")) return;

    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        fetchData();
        alert("Jabatan berhasil dihapus");
      } else {
        alert("Gagal menghapus jabatan");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-screen flex bg-[#f8fafc] text-slate-800 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-y-auto">
        <header className="flex h-20 items-center justify-between px-10 border-b border-slate-100 bg-white/80 backdrop-blur-md shrink-0 sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-black text-slate-800 tracking-tight uppercase">Jabatan</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[2px]">Position Settings</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="h-11 w-11 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 font-bold">A</div>
          </div>
        </header>

        <main className="p-10 max-w-[1600px] mx-auto w-full">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Management Jabatan</h2>
            <p className="text-slate-400 mt-1 font-medium text-lg">Configure positions and salary structures.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Input */}
            <div className="lg:col-span-4">
              <div className="rounded-[32px] bg-white p-8 border border-slate-100 shadow-sm">
                <h3 className="text-lg font-black text-slate-800 mb-8">
                  {editingId ? "Edit Jabatan" : "Tambah Jabatan"}
                </h3>

                <div className="space-y-5">
                  <div>
                    <label className="block text-[11px] font-black text-slate-500 uppercase mb-2 ml-1">Nama Jabatan</label>
                    <input 
                      type="text" 
                      value={form.jabatan}
                      onChange={(e) => setForm({...form, jabatan: e.target.value})}
                      placeholder="Contoh: Manager IT"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-[#00bcd4] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-500 uppercase mb-2 ml-1">Pilih Divisi</label>
                    <select 
                      value={form.id_divisi}
                      onChange={(e) => setForm({...form, id_divisi: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm outline-none cursor-pointer"
                    >
                      <option value="">Pilih Divisi</option>
                      {dataDivisi.map((div) => (
                        <option key={div.id} value={div.id}>{div.nama || (div as any).divisi}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-500 uppercase mb-2 ml-1">Gaji Pokok</label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">Rp</span>
                      <input 
                        type="number" 
                        value={form.gaji_pokok}
                        onChange={(e) => setForm({...form, gaji_pokok: e.target.value})}
                        placeholder="0"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 py-3.5 text-sm outline-none"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={handleSimpan}
                      className={`w-full ${editingId ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#00bcd4] hover:bg-[#00acc1]'} text-white font-black py-4 rounded-2xl shadow-lg transition-all uppercase tracking-widest text-sm`}
                    >
                      {editingId ? "Update Jabatan" : "Simpan Jabatan"}
                    </button>
                    {editingId && (
                      <button 
                        onClick={() => { setEditingId(null); setForm({ jabatan: "", id_divisi: "", gaji_pokok: "" }); }}
                        className="w-full bg-slate-100 text-slate-500 font-black py-4 rounded-2xl transition-all uppercase tracking-widest text-sm"
                      >
                        Batal Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabel Data */}
            <div className="lg:col-span-8">
              <div className="rounded-[32px] bg-white border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                  <h3 className="text-lg font-black text-slate-800">Data Jabatan</h3>
                  <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter">
                    ● {dataJabatan.length} Total
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-slate-400 text-[10px] font-black uppercase tracking-[2px] bg-slate-50/50">
                        <th className="px-8 py-6">No</th>
                        <th className="px-8 py-6">Jabatan</th>
                        <th className="px-8 py-6">Gaji Pokok</th>
                        <th className="px-8 py-6 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {loading ? (
                        <tr><td colSpan={4} className="p-10 text-center font-bold text-slate-400">Loading data...</td></tr>
                      ) : (
                        dataJabatan.map((item, index) => (
                          <tr key={item.id} className="group hover:bg-slate-50/50 transition-all">
                            <td className="px-8 py-6 text-sm font-bold text-slate-400">{index + 1}</td>
                            <td className="px-8 py-6 text-sm font-black text-slate-700 uppercase">{item.jabatan}</td>
                            <td className="px-8 py-6 text-sm font-black text-emerald-600">
                              Rp {Number(item.gaji_pokok).toLocaleString("id-ID")}
                            </td>
                            <td className="px-8 py-6 text-right">
                              <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                <button 
                                  onClick={() => handleEdit(item)}
                                  className="p-2 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-500 hover:text-white transition-all shadow-sm"
                                  title="Edit"
                                >
                                  ✏️
                                </button>
                                <button 
                                  onClick={() => handleDelete(item.id)}
                                  className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                                  title="Hapus"
                                >
                                  🗑️
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
          </div>
        </main>
      </div>
    </div>
  );
}