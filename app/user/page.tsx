"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UserPage = () => {
  // --- State Data ---
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // --- State Modal Detail ---
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- State Form ---
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  // ===============================
  // FETCH DATA
  // ===============================
  const fetchData = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      setUsers(json.data || json);
    } catch (err) {
      console.error("Gagal mengambil data user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  // ===============================
  // SIMPAN / UPDATE
  // ===============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    const method = editingId ? "PATCH" : "POST";
    const url = editingId
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user";

    const payload = { ...form };
    if (editingId && !payload.password) {
      delete (payload as any).password;
    }

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert(editingId ? "User berhasil diperbarui!" : "User berhasil ditambahkan!");
        resetForm();
        fetchData();
      } else {
        const errData = await res.json();
        alert(errData.message || "Terjadi kesalahan");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ===============================
  // AKSI (EDIT, DELETE, INFO)
  // ===============================
  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus user ini?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setForm({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role.toLowerCase(),
    });
    // Scroll ke form jika di mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetail = (user: User) => {
    setViewingUser(user);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ name: "", email: "", password: "", role: "user" });
  };

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
            <div className="h-11 w-11 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 font-bold">A</div>
          </div>
        </header>

        <main className="p-10 max-w-[1600px] mx-auto w-full">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Management User</h2>
            <p className="text-slate-400 mt-1 font-medium">Control system access and user permissions.</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* Form Input */}
            <div className="xl:col-span-4 bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2.5" strokeLinecap="round"/></svg>
                </div>
                <h3 className="font-black text-slate-800 tracking-tight">
                    {editingId ? "Edit User" : "Tambah User"}
                </h3>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Nama</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Nama Lengkap" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none text-sm focus:border-[#00bcd4] transition-all" required />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="email@example.com" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none text-sm focus:border-[#00bcd4] transition-all" required />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase ml-1">
                    Password {editingId && <span className="text-[9px] text-amber-500 normal-case">(Kosongkan jika tidak diubah)</span>}
                  </label>
                  <input type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none text-sm focus:border-[#00bcd4] transition-all" required={!editingId} />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Role</label>
                  <select value={form.role} onChange={(e) => setForm({...form, role: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none text-sm text-slate-500 cursor-pointer">
                    <option value="user">User / Karyawan</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                    <button type="submit" className="w-full py-4 bg-[#07476e] hover:bg-[#0a5a8a] text-white rounded-2xl font-black text-sm shadow-lg transition-all active:scale-[0.98] uppercase tracking-widest">
                        {editingId ? "Update User" : "Simpan User"}
                    </button>
                    {editingId && (
                        <button type="button" onClick={resetForm} className="w-full py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-sm uppercase tracking-widest">
                            Batal
                        </button>
                    )}
                </div>
              </form>
            </div>

            {/* Tabel Data */}
            <div className="xl:col-span-8 bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
                <h3 className="font-black text-slate-800 tracking-tight">Data User</h3>
                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-4 py-1.5 rounded-full border border-emerald-100 tracking-tighter">
                  ● {users.length} Items Total
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
                    {loading ? (
                        <tr><td colSpan={5} className="p-10 text-center font-bold text-slate-400 italic">Memuat data...</td></tr>
                    ) : (
                      users.map((row, index) => (
                        <tr key={row.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-8 py-6 text-sm font-bold text-[#07476e]">{index + 1}</td>
                          <td className="px-8 py-6 text-sm font-black text-slate-700">{row.name}</td>
                          <td className="px-8 py-6 text-sm font-medium text-slate-400">{row.email}</td>
                          <td className="px-8 py-6 text-center">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border uppercase ${
                                row.role === 'admin' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                                row.role === 'superadmin' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                'bg-slate-100 text-slate-600 border-slate-200'
                            }`}>
                              {row.role}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-center">
                            <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button onClick={() => handleViewDetail(row)} className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-300 hover:text-indigo-500 transition-all">
                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2.5"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2.5"/></svg>
                               </button>
                               <button onClick={() => handleEdit(row)} className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-300 hover:text-[#00bcd4] transition-all">
                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeWidth="2.5"/></svg>
                               </button>
                               <button onClick={() => handleDelete(row.id)} className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-300 hover:text-red-500 transition-all">
                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2.5"/></svg>
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

      {/* MODAL DETAIL USER */}
      {isModalOpen && viewingUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h3 className="font-black text-slate-800 tracking-tight">Informasi User</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="3" strokeLinecap="round"/></svg>
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex flex-col items-center mb-4">
                <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center text-3xl font-black text-slate-400 border-4 border-white shadow-sm mb-3 uppercase">
                  {viewingUser.name.charAt(0)}
                </div>
                <span className={`px-4 py-1 rounded-full text-[10px] font-black border uppercase ${
                  viewingUser.role === 'admin' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                  viewingUser.role === 'superadmin' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                  'bg-slate-100 text-slate-600 border-slate-200'
                }`}>
                  {viewingUser.role}
                </span>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Nama Lengkap</p>
                  <p className="text-sm font-bold text-slate-700">{viewingUser.name}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Alamat Email</p>
                  <p className="text-sm font-bold text-slate-700">{viewingUser.email}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ID Sistem</p>
                  <p className="text-sm font-mono font-bold text-[#00bcd4]">#USR-{viewingUser.id}</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-50/50">
              <button onClick={() => setIsModalOpen(false)} className="w-full py-4 bg-white border border-slate-200 text-slate-500 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-all">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;