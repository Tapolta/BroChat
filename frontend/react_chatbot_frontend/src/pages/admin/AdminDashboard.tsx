import { useState, useMemo } from "react";
import { Trash2, ChevronRight, X, Search, User, Clock, ShieldAlert, BarChart2, Download } from "lucide-react";

import Sidebar from "../../components/sidebar/Sidebar";
import SidebarAdmin from "../../components/sidebar/SidebarAdmin";

interface UserDetail {
  id: string;
  name: string;
  email: string;
  lastPrompt: string;
  lastPromptTime: string;
  status: "Active" | "Suspended";
  totalPrompts: number;
  joinedDate: string;
  aiSummaryOutput: string;
  learningTimeDistribution: { pagi: string; siang: string; sore: string; malam: string; };
  learningPhase: { perencanaan: string; pengerjaan: string; refleksi: string; };
  mostAskedSubject: string;
}

const INITIAL_USERS: UserDetail[] = [
  { 
    id: "USR-091", 
    name: "Amir Nasution", 
    email: "amir.nas@domain.com", 
    lastPrompt: "Bagaimana cara integrasi webhook API?", 
    lastPromptTime: "2 menit yang lalu", 
    status: "Active", 
    totalPrompts: 142, 
    joinedDate: "12 Jan 2026",
    aiSummaryOutput: "Siswa menunjukkan pemahaman mendalam pada materi backend, namun membutuhkan bimbingan lebih lanjut pada konsep arsitektur microservices dan penanganan keamanan API asynchronous.",
    learningTimeDistribution: { pagi: "20%", siang: "15%", sore: "45%", malam: "20%" },
    learningPhase: { perencanaan: "15%", pengerjaan: "65%", refleksi: "20%" },
    mostAskedSubject: "Rekayasa Perangkat Lunak & API Integrasi"
  },
  { 
    id: "USR-122", 
    name: "Budi Santoso", 
    email: "budi.san@domain.com", 
    lastPrompt: "Reset password account premium saya", 
    lastPromptTime: "15 menit yang lalu", 
    status: "Active", 
    totalPrompts: 89, 
    joinedDate: "04 Feb 2026",
    aiSummaryOutput: "Fokus utama siswa saat ini terbagi antara administrasi akun dan penyelesaian tugas fundamental. Mengalami kendala teknis berulang pada autentikasi platform.",
    learningTimeDistribution: { pagi: "40%", siang: "30%", sore: "20%", malam: "10%" },
    learningPhase: { perencanaan: "40%", pengerjaan: "50%", refleksi: "10%" },
    mostAskedSubject: "Administrasi Sistem & Keamanan Dasar"
  },
  { 
    id: "USR-403", 
    name: "Citra Dewi", 
    email: "citra.d@domain.com", 
    lastPrompt: "Buatkan skrip otomasi python gratis", 
    lastPromptTime: "1 jam yang lalu", 
    status: "Active", 
    totalPrompts: 321, 
    joinedDate: "20 Des 2025",
    aiSummaryOutput: "Siswa sangat aktif dalam fase pengerjaan proyek mandiri. Sering meminta bantuan AI untuk melakukan refactoring kode, pembuatan skrip otomasi, serta efisiensi algoritma struktur data.",
    learningTimeDistribution: { pagi: "10%", siang: "10%", sore: "30%", malam: "50%" },
    learningPhase: { perencanaan: "10%", pengerjaan: "80%", refleksi: "10%" },
    mostAskedSubject: "Pemrograman Python & Otomasi Data"
  },
  { 
    id: "USR-784", 
    name: "Dedi Wijaya", 
    email: "dedi.wij@domain.com", 
    lastPrompt: "Sistem mengalami error 502 gateway", 
    lastPromptTime: "3 jam yang lalu", 
    status: "Suspended", 
    totalPrompts: 14, 
    joinedDate: "18 Juni 2026",
    aiSummaryOutput: "Aktivitas belajar tergolong minim dan terputus karena terkendala masalah konfigurasi infrastruktur server (Deployment). Memerlukan modul dasar penanganan error jaringan.",
    learningTimeDistribution: { pagi: "0%", siang: "50%", sore: "50%", malam: "0%" },
    learningPhase: { perencanaan: "30%", pengerjaan: "60%", refleksi: "10%" },
    mostAskedSubject: "Cloud Computing & Jaringan Komputer"
  },
  { 
    id: "USR-556", 
    name: "Eka Putri", 
    email: "eka.put@domain.com", 
    lastPrompt: "Apakah model ini mendukung bahasa Jepang?", 
    lastPromptTime: "Yesterday", 
    status: "Active", 
    totalPrompts: 56, 
    joinedDate: "01 Mar 2026",
    aiSummaryOutput: "Siswa berada pada tahap awal eksplorasi kapabilitas teknologi AI. Memiliki ketertarikan tinggi pada lokalisasi bahasa, pemrosesan bahasa alami (NLP), dan komparasi fitur lintas bahasa.",
    learningTimeDistribution: { pagi: "25%", siang: "25%", sore: "25%", malam: "25%" },
    learningPhase: { perencanaan: "60%", pengerjaan: "20%", refleksi: "20%" },
    mostAskedSubject: "Kecerdasan Buatan & Studi Linguistik"
  }
];


export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [users, setUsers] = useState<UserDetail[]>(INITIAL_USERS);
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fungsi Hapus Per User
  const handleDeleteUser = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Mencegah terpicunya klik baris (detail panel)
    if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      setUsers(users.filter((user) => user.id !== id));
      if (selectedUser?.id === id) setSelectedUser(null);
    }
  };

  // Fungsi Hapus Semua User
  const handleDeleteAll = () => {
    if (confirm("PERINGATAN! Apakah Anda yakin ingin menghapus SEMUA user?")) {
      setUsers([]);
      setSelectedUser(null);
    }
  };

  // Filter pencarian data user
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  return (
    <div className="flex h-screen w-full bg-[#FAFAFA] font-sans overflow-hidden text-gray-900">
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* SIDEBAR WRAPPER */}
        <Sidebar isOpen={isSidebarOpen}>
          <SidebarAdmin isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </Sidebar>

        {/* MAIN CONTENT CONTAINER */}
        <div className="flex-1 flex flex-col min-w-0 bg-white overflow-y-auto transition-all duration-300">
          
          {/* HEADER DASHBOARD */}
          <header className="px-8 py-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900">User Management</h1>
              <p className="text-xs text-gray-400 mt-0.5">Kelola data interaksi dan hak akses seluruh pengguna bot</p>
            </div>

            {users.length > 0 && (
              <button
                onClick={handleDeleteAll}
                className="flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:text-red-600 hover:bg-red-50/50 hover:border-red-100 transition-all duration-150 shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Hapus Semua
              </button>
            )}
          </header>

          <div className="p-8 max-w-[1400px] w-full mx-auto space-y-4 flex-1">
            <div className="relative max-w-sm">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari ID atau nama user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 bg-gray-50/50 focus:bg-white transition-all"
              />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50/40">
                      <th className="py-4 px-6">ID</th>
                      <th className="py-4 px-6">Nama User</th>
                      <th className="py-4 px-6">Waktu Terakhir Login</th>
                      <th className="py-4 px-6 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-xs">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          onClick={() => setSelectedUser(user)}
                          className={`cursor-pointer transition-all ${
                            selectedUser?.id === user.id
                              ? "bg-black/[0.04] font-medium"
                              : "hover:bg-black/[0.02]"
                          }`}
                        >
                          <td className="py-4 px-6 font-mono text-gray-400 text-[11px]">
                            {user.id}
                          </td>
                          <td className="py-4 px-6 text-gray-900 font-medium">
                            {user.name}
                          </td>
                          <td className="py-4 px-6 text-gray-500 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1.5">
                              <Clock className="w-3 h-3 text-gray-300" />
                              {user.lastPromptTime}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={(e) => handleDeleteUser(user.id, e)}
                                className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-gray-100/80 transition-colors"
                                title="Hapus User"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <ChevronRight className="w-4 h-4 text-gray-300" />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center py-12 text-gray-400 font-medium">
                          {users.length === 0 ? "Data user kosong." : "Tidak ada user yang cocok dengan pencarian."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

        <>
        {/* 1. OVERLAY */}
        <div
          onClick={() => setSelectedUser(null)}
          className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ease-in-out ${
            selectedUser ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        />

        {/* 2. BOTTOM SHEET PANEL */}
        <div
          className={`fixed inset-x-0 bottom-0 w-full h-full bg-white border-t border-gray-100 shadow-2xl z-50 flex flex-col transition-transform duration-500 ${
            selectedUser ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {selectedUser && (
            <>
              {/* ── HEADER ── */}
              <div className="pt-4 pb-6 px-6 border-b border-gray-100 flex flex-col items-center bg-white sticky top-0 z-10">

                {/* Bar tutup */}
                <button
                  onClick={() => setSelectedUser(null)}
                  className="w-16 h-1.5 bg-gray-300 rounded-full mb-5 hover:bg-gray-400 active:scale-95 transition-all cursor-pointer"
                  aria-label="Tutup detail"
                />

                {/* Judul + Tombol CSV */}
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-black/[0.06] flex items-center justify-center text-gray-700">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">Detail Pengguna</h3>
                      <p className="text-[11px] text-gray-400 font-mono">{selectedUser.id}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const csvRows = [
                        ["ID", "Nama Lengkap", "Email", "Tanggal Bergabung", "Status", "Total Prompts", "Subjek Utama"],
                        [
                          selectedUser.id,
                          selectedUser.name,
                          selectedUser.email,
                          selectedUser.joinedDate,
                          selectedUser.status,
                          selectedUser.totalPrompts,
                          selectedUser.mostAskedSubject,
                        ],
                      ];
                      const csvContent =
                        "data:text/csv;charset=utf-8," +
                        csvRows.map((e) => e.map((val) => `"${val}"`).join(",")).join("\n");
                      const link = document.createElement("a");
                      link.setAttribute("href", encodeURI(csvContent));
                      link.setAttribute("download", `Analisis_Siswa_${selectedUser.id}.csv`);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 bg-white hover:bg-gray-50 hover:text-gray-900 active:scale-95 transition-all shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Unduh CSV
                  </button>
                </div>
              </div>

              {/* ── BODY (scrollable) ── */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6 text-xs bg-white">

                {/* Informasi Akun */}
                <div className="space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Informasi Akun</p>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2.5 border border-gray-100/50">
                    <div className="flex justify-between"><span className="text-gray-400">Nama Lengkap</span><span className="font-semibold text-gray-900">{selectedUser.name}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Email</span><span className="text-gray-600">{selectedUser.email}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Tanggal Bergabung</span><span className="text-gray-600">{selectedUser.joinedDate}</span></div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Status</span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${
                        selectedUser.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                      }`}>
                        {selectedUser.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Analitik Aktivitas */}
                <div className="space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Analitik Aktivitas</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border border-gray-100 p-3 rounded-xl bg-white shadow-sm flex items-center gap-2.5">
                      <BarChart2 className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-[10px] text-gray-400">Total Prompts</p>
                        <p className="text-sm font-bold text-gray-900">{selectedUser.totalPrompts}</p>
                      </div>
                    </div>
                    <div className="border border-gray-100 p-3 rounded-xl bg-white shadow-sm flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-[10px] text-gray-400">Sesi Terakhir</p>
                        <p className="text-sm font-bold text-gray-900">{selectedUser.lastPromptTime}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Isi Prompt Terakhir */}
                <div className="space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Isi Prompt Terakhir</p>
                  <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl font-medium text-gray-700 italic leading-relaxed">
                    "{selectedUser.lastPrompt}"
                  </div>
                </div>

                {/* Subjek Paling Sering Ditanyakan */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Subjek Paling Sering Ditanyakan</p>
                  <div className="bg-blue-50/50 border border-blue-100/70 p-3.5 rounded-xl flex items-center gap-3">
                    {/* <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center text-white font-semibold">
                      🎓
                    </div> */}
                    <span className="font-bold text-sm text-blue-900">{selectedUser.mostAskedSubject}</span>
                  </div>
                </div>

                {/* Grafik: Distribusi Waktu & Fase Belajar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Kolom Kiri: Distribusi Waktu Belajar */}
                  <div className="border border-gray-100 p-4 rounded-xl bg-white shadow-sm space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Distribusi Waktu Belajar</p>

                    {/* Bar bertumpuk */}
                    <div className="h-4 w-full rounded-full bg-gray-100 flex overflow-hidden shadow-inner">
                      <div style={{ width: selectedUser.learningTimeDistribution.pagi }}   className="bg-amber-400 transition-all" title="Pagi" />
                      <div style={{ width: selectedUser.learningTimeDistribution.siang }}  className="bg-sky-400 transition-all"   title="Siang" />
                      <div style={{ width: selectedUser.learningTimeDistribution.sore }}   className="bg-orange-400 transition-all" title="Sore" />
                      <div style={{ width: selectedUser.learningTimeDistribution.malam }}  className="bg-indigo-500 transition-all" title="Malam" />
                    </div>

                    {/* Legenda */}
                    <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                      <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-amber-400 block" />  Pagi  ({selectedUser.learningTimeDistribution.pagi})</div>
                      <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-sky-400 block" />   Siang ({selectedUser.learningTimeDistribution.siang})</div>
                      <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-orange-400 block" />Sore  ({selectedUser.learningTimeDistribution.sore})</div>
                      <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-indigo-500 block" />Malam ({selectedUser.learningTimeDistribution.malam})</div>
                    </div>
                  </div>

                  {/* Kolom Kanan: Fase Pembelajaran (tabel + bar) */}
                  <div className="border border-gray-100 p-4 rounded-xl bg-white shadow-sm space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Fase Pembelajaran</p>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-gray-100">
                            <th className="pb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 w-1/4">Fase</th>
                            <th className="pb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 w-1/6 text-right pr-4">%</th>
                            <th className="pb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 w-7/12">Grafik</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50/50">
                          <tr>
                            <td className="py-2.5 font-medium text-gray-600 text-[11px]">Perencanaan</td>
                            <td className="py-2.5 text-right font-bold text-gray-900 text-[11px] pr-4">{selectedUser.learningPhase.perencanaan}</td>
                            <td className="py-2.5">
                              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div style={{ width: selectedUser.learningPhase.perencanaan }} className="h-full bg-emerald-500 rounded-full" />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-medium text-gray-600 text-[11px]">Pengerjaan</td>
                            <td className="py-2.5 text-right font-bold text-gray-900 text-[11px] pr-4">{selectedUser.learningPhase.pengerjaan}</td>
                            <td className="py-2.5">
                              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div style={{ width: selectedUser.learningPhase.pengerjaan }} className="h-full bg-blue-500 rounded-full" />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-medium text-gray-600 text-[11px]">Refleksi</td>
                            <td className="py-2.5 text-right font-bold text-gray-900 text-[11px] pr-4">{selectedUser.learningPhase.refleksi}</td>
                            <td className="py-2.5">
                              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div style={{ width: selectedUser.learningPhase.refleksi }} className="h-full bg-purple-500 rounded-full" />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>{/* ── end grid Grafik ── */}

                {/* Rangkuman AI */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Automation Summary</p>
                  <div className="bg-purple-50/20 border border-purple-100/60 p-4 rounded-xl font-medium text-gray-700 leading-relaxed">
                    ✨ {selectedUser.aiSummaryOutput}
                  </div>
                </div>

              </div>{/* ── end BODY ── */}

              {/* ── FOOTER ── */}
              <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex gap-2 sticky bottom-0 z-10">
                <button
                  onClick={(e) => { if (selectedUser) handleDeleteUser(selectedUser.id, e); }}
                  className="w-full flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-xl border border-red-100 text-red-600 bg-red-50/30 hover:bg-red-50 transition-colors"
                >
                  <ShieldAlert className="w-3.5 h-3.5" /> Tangguhkan Akses User
                </button>
              </div>

            </>
          )}
        </div>
      </>
        
                   


      </div>
    </div> 
  );
}