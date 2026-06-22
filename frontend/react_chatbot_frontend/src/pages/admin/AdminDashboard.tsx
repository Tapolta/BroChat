import { useState, useMemo } from "react";
import { Trash2, ChevronRight, X, Search, User, Clock, ShieldAlert, BarChart2 } from "lucide-react";
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
}

const INITIAL_USERS: UserDetail[] = [
  { id: "USR-091", name: "Amir Nasution", email: "amir.nas@domain.com", lastPrompt: "Bagaimana cara integrasi webhook API?", lastPromptTime: "2 menit yang lalu", status: "Active", totalPrompts: 142, joinedDate: "12 Jan 2026" },
  { id: "USR-122", name: "Budi Santoso", email: "budi.san@domain.com", lastPrompt: "Reset password account premium saya", lastPromptTime: "15 menit yang lalu", status: "Active", totalPrompts: 89, joinedDate: "04 Feb 2026" },
  { id: "USR-403", name: "Citra Dewi", email: "citra.d@domain.com", lastPrompt: "Buatkan skrip otomasi python gratis", lastPromptTime: "1 jam yang lalu", status: "Active", totalPrompts: 321, joinedDate: "20 Des 2025" },
  { id: "USR-784", name: "Dedi Wijaya", email: "dedi.wij@domain.com", lastPrompt: "Sistem mengalami error 502 gateway", lastPromptTime: "3 jam yang lalu", status: "Suspended", totalPrompts: 14, joinedDate: "18 Juni 2026" },
  { id: "USR-556", name: "Eka Putri", email: "eka.put@domain.com", lastPrompt: "Apakah model ini mendukung bahasa Jepang?", lastPromptTime: "Yesterday", status: "Active", totalPrompts: 56, joinedDate: "01 Mar 2026" },
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
                      <th className="py-4 px-6">ID User</th>
                      <th className="py-4 px-6">Nama User</th>
                      <th className="py-4 px-6">Waktu Terakhir Prompt</th>
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

        <div
          className={`fixed inset-y-0 right-0 w-full sm:w-[420px] bg-white border-l border-gray-100 shadow-2xl z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
            selectedUser ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {selectedUser && (
            <>
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
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
                  onClick={() => setSelectedUser(null)}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 p-6 overflow-y-auto space-y-6 text-xs">
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

                <div className="space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Isi Prompt Terakhir</p>
                  <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl font-medium text-gray-700 italic leading-relaxed">
                    "{selectedUser.lastPrompt}"
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex gap-2">
                <button 
                  onClick={(e) => {
                    if(selectedUser) handleDeleteUser(selectedUser.id, e);
                  }}
                  className="w-full flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-xl border border-red-100 text-red-600 bg-red-50/30 hover:bg-red-50 transition-colors"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Tangguhkan Akses User
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div> 
  );
}