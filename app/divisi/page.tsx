"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar"; // Pastikan path ini benar

interface Divisi {
  id: number;
  divisi: string;
}

export default function DivisiPage() {
  const [namaDivisi, setNamaDivisi] = useState("");
  const [divisiList, setDivisiList] = useState<Divisi[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  // ===============================
  // GET DATA DIVISI
  // ===============================
  const fetchDivisi = async () => {
    try {
      const res = await fetch(
        "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal mengambil data");
      }

      setDivisiList(data.data || data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    fetchDivisi();
  }, [token]);

  // ===============================
  // SIMPAN / UPDATE DIVISI
  // ===============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = editingId
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi";
    
    const method = editingId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          nama_divisi: namaDivisi,
          divisi: namaDivisi,
        }),
      });

      let data;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        throw new Error(`Server returned non-JSON response.`);
      }

      if (!res.ok) {
        throw new Error(data.message || `Gagal memproses divisi`);
      }

      setNamaDivisi("");
      setEditingId(null);
      fetchDivisi(); 
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (divisi: Divisi) => {
    setEditingId(divisi.id);
    setNamaDivisi(divisi.divisi);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus divisi ini?")) return;

    try {
      const res = await fetch(
        `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Gagal menghapus divisi");
      fetchDivisi();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  return (
    // 1. CONTAINER UTAMA: Menggunakan bg-[#f8fafc] (Putih Soft)
    <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc] font-sans text-slate-800">
      
      {/* 2. SIDEBAR */}
      <Sidebar />

      {/* 3. CONTENT AREA */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        
        {/* Header (Opsional, agar konsisten dengan JabatanPage) */}
        <header className="sticky top-0 z-10 flex h-20 shrink-0 items-center justify-between border-b border-slate-100 bg-white/80 px-10 backdrop-blur-md">
          <div>
            <h1 className="text-lg font-black uppercase tracking-tight text-slate-800">Divisi</h1>
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-slate-400">Department Settings</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-2xl border border-slate-200 bg-slate-100 flex items-center justify-center font-bold text-slate-400">A</div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1600px] p-10">
          <div className="mb-10">
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Management Divisi</h2>
            <p className="mt-1 text-lg font-medium text-slate-500">Configure and manage company departments.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            
            {/* FORM CARD */}
            <div className="lg:col-span-4 rounded-[32px] bg-white p-8 border border-slate-100 shadow-sm">
              <div className="mb-8 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#00bcd4] text-xl font-bold">
                  {editingId ? "✏️" : "➕"}
                </div>
                <h3 className="text-lg font-black tracking-tight text-slate-800">
                  {editingId ? "Edit Divisi" : "Tambah Divisi"}
                </h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 ml-1 block text-[11px] font-black uppercase text-slate-500">
                    Nama Divisi
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: IT Support"
                    value={namaDivisi}
                    onChange={(e) => setNamaDivisi(e.target.value)}
                    className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-3.5 text-sm font-medium outline-none transition-all focus:border-[#00bcd4] focus:ring-2 focus:ring-[#00bcd4]/10"
                    required
                  />
                </div>

                {error && (
                  <div className="rounded-xl bg-rose-50 p-3 text-xs font-bold text-rose-600 border border-rose-100">
                    {error}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 rounded-2xl bg-[#00bcd4] hover:bg-[#00acc1] px-4 py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-cyan-100 transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {loading ? "Process..." : editingId ? "Update" : "Simpan"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => { setEditingId(null); setNamaDivisi(""); }}
                      className="rounded-2xl bg-slate-100 px-4 py-4 text-sm font-black uppercase tracking-widest text-slate-600 transition-all hover:bg-slate-200"
                    >
                      Batal
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* TABLE CARD */}
            <div className="lg:col-span-8 rounded-[32px] bg-white border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
                <h3 className="text-lg font-black tracking-tight text-slate-800">Data Divisi</h3>
                <div className="flex items-center gap-2 text-[10px] font-black bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full border border-emerald-100 uppercase">
                  ● {divisiList.length} Items Total
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[2px]">
                      <th className="px-8 py-6">No</th>
                      <th className="px-8 py-6">Nama Divisi</th>
                      <th className="px-8 py-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {divisiList.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-8 py-16 text-center text-slate-400 italic">
                          No departments found.
                        </td>
                      </tr>
                    ) : (
                      divisiList.map((divisi, index) => (
                        <tr key={divisi.id} className="group hover:bg-slate-50/50 transition-all">
                          <td className="px-8 py-6 text-sm font-bold text-slate-400">{index + 1}</td>
                          <td className="px-8 py-6 text-sm font-black text-slate-700 uppercase group-hover:text-[#00bcd4] transition-colors">
                            {divisi.divisi}
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <button
                                onClick={() => handleEdit(divisi)}
                                className="h-9 w-9 flex items-center justify-center text-slate-400 hover:text-[#00bcd4] hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all shadow-sm"
                                title="Edit"
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => handleDelete(divisi.id)}
                                className="h-9 w-9 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all shadow-sm"
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
        </main>
      </div>
    </div>
  );
}