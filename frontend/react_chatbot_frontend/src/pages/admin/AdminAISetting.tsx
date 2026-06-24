// import { useState } from "react";
// import Sidebar from "../../components/sidebar/Sidebar";
// import SidebarAdmin from "../../components/sidebar/SidebarAdmin";

// function AdminAiSettings(){
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//     return (
//         <div className="flex h-screen w-full bg-[#FAFAFA] font-sans overflow-hidden text-gray-900">
//               <div className="flex flex-1 overflow-hidden relative">
                
//                 {/* SIDEBAR WRAPPER */}
//                 <Sidebar isOpen={isSidebarOpen}>
//                   <SidebarAdmin isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
//                 </Sidebar>
//                 </div>
//                 </div>
//     )
// }

// export default AdminAiSettings;

// tes


import { useState, useRef } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import SidebarAdmin from "../../components/sidebar/SidebarAdmin";
import { Upload, X, FileText, ChevronDown, Sparkles } from "lucide-react";

const MATH_TOPICS = [
  { id: "aljabar", label: "Aljabar" },
  { id: "geometri", label: "Geometri" },
  { id: "kalkulus", label: "Kalkulus" },
  { id: "statistika", label: "Statistika & Probabilitas" },
  { id: "trigonometri", label: "Trigonometri" },
  { id: "bilangan", label: "Teori Bilangan" },
  { id: "matriks", label: "Matriks & Vektor" },
  { id: "persamaan", label: "Persamaan & Pertidaksamaan" },
  { id: "fungsi", label: "Fungsi & Grafik" },
  { id: "logika", label: "Logika Matematika" },
  { id: "kombinatorik", label: "Kombinatorik" },
  { id: "kompleks", label: "Bilangan Kompleks" },
];

const DIFFICULTY_LEVELS = [
  {
    id: "smp",
    label: "SMP",
    desc: "Kelas 7–9",
    color: "bg-emerald-50 border-emerald-200 text-emerald-800",
    activeColor: "bg-emerald-500 border-emerald-500 text-white",
  },
  {
    id: "sma",
    label: "SMA",
    desc: "Kelas 10–12",
    color: "bg-blue-50 border-blue-200 text-blue-800",
    activeColor: "bg-blue-500 border-blue-500 text-white",
  },
  {
    id: "mahasiswa",
    label: "Mahasiswa",
    desc: "Perguruan Tinggi",
    color: "bg-purple-50 border-purple-200 text-purple-800",
    activeColor: "bg-purple-500 border-purple-500 text-white",
  },
];

interface UploadedFile {
  id: string;
  name: string;
  size: string;
}

function AdminAiSettings() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<string>("sma");
  const [customPrompt, setCustomPrompt] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const pdfs = Array.from(files).filter((f) => f.type === "application/pdf");
    const newFiles: UploadedFile[] = pdfs.map((f) => ({
      id: crypto.randomUUID(),
      name: f.name,
      size: formatSize(f.size),
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

return (
    <div className="flex h-screen w-full bg-[#FAFAFA] font-sans overflow-hidden text-gray-900">
      <div className="flex flex-1 overflow-hidden relative">
        {/* SIDEBAR WRAPPER */}
        <Sidebar isOpen={isSidebarOpen}>
          <SidebarAdmin isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </Sidebar>

        {/* MAIN CONTENT CONTAINER */}
        <main className="flex-1 p-6 md:p-8 flex flex-col min-w-0 overflow-hidden">
          
          {/* KOTAK BERBAYANG TEROPTIMALISASI (Kontras Tinggi & Minimalis) */}
          {/* Menggunakan shadow-[0_8px_30px_rgb(0,0,0,0.06)] agar kotak lebih pop-out dan tegas di mata */}
          <div className="flex-1 max-w-3xl w-full mx-auto bg-white border border-gray-200/80 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-y-auto">
            
            {/* AREA UTAMA DI DALAM KOTAK */}
            <div className="px-6 py-8 md:px-8 md:py-10 space-y-8">

              {/* ── SECTION 1: Tingkat Kesulitan ── */}
              {/* Naikkan border ke gray-200 agar pembungkus section dalam kotak terlihat jelas */}
              <section className="bg-white rounded-2xl border border-gray-200/70 p-6">
                <div className="mb-5">
                  {/* Mengubah text-gray-900 menjadi text-gray-950 agar teks judul lebih tajam dan terbaca */}
                  <h2 className="text-sm font-bold text-gray-950">
                    Tingkat kesulitan
                  </h2>
                  {/* Mengubah text-gray-400 menjadi text-gray-500 agar sub-teks tidak terlalu pudar */}
                  <p className="text-xs text-gray-500 mt-0.5">
                    Sesuaikan kedalaman materi dan gaya penjelasan AI
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {DIFFICULTY_LEVELS.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setDifficulty(level.id)}
                      className={`relative flex flex-col items-center gap-1 py-4 px-3 rounded-xl border text-center transition-all duration-150 ${
                        difficulty === level.id
                          ? level.activeColor + " shadow-sm font-semibold"
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:border-gray-300"
                      }`}
                    >
                      {/* Teks tombol tidak aktif dinaikkan kontrasnya menjadi text-gray-800 saat aktif */}
                      <span className={`text-sm ${difficulty === level.id }`}>{level.label}</span>
                      <span
                        className={`text-[11px] font-medium ${
                          difficulty === level.id
                            ? "opacity-90"
                            : "text-gray-500"
                        }`}
                      >
                        {level.desc}
                      </span>
                      {difficulty === level.id && (
                        <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-white/70" />
                      )}
                    </button>
                  ))}
                </div>
              </section>

              {/* ── SECTION 2: Materi Matematika (Statis) ── */}
              <section className="bg-white rounded-2xl border border-gray-200/70 p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-sm font-bold text-gray-950">
                      Fokus materi
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Pilih satu atau lebih materi yang menjadi fokus AI
                    </p>
                  </div>
                  {selectedTopics.length > 0 && (
                    <button
                      onClick={() => setSelectedTopics([])}
                      className="shrink-0 text-[11px] text-gray-500 hover:text-gray-700 font-medium transition-colors flex items-center gap-1"
                    >
                      <X className="w-3 h-3" />
                      Hapus semua
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {MATH_TOPICS.map((topic) => {
                    const active = selectedTopics.includes(topic.id);
                    return (
                      <button
                        key={topic.id}
                        onClick={() => toggleTopic(topic.id)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 ${
                          active
                            ? "bg-gray-900 border-gray-900 text-white"
                            : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300 hover:text-gray-800"
                        }`}
                      >
                        {topic.label}
                      </button>
                    );
                  })}
                </div>

                {selectedTopics.length > 0 && (
                  <p className="mt-4 text-[11px] font-medium text-gray-500">
                    {selectedTopics.length} materi dipilih &mdash;{" "}
                    <span className="text-gray-800">
                      {MATH_TOPICS.filter((t) => selectedTopics.includes(t.id))
                        .map((t) => t.label)
                        .join(", ")}
                    </span>
                  </p>
                )}
              </section>

              {/* ── SECTION 3: Dinamis ── */}
              <section className="bg-white rounded-2xl border border-gray-200/70 p-6 space-y-6">
                <div>
                  <h2 className="text-sm font-bold text-gray-950">
                    Konteks tambahan (opsional)
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Berikan instruksi khusus atau unggah referensi agar AI lebih terarah
                  </p>
                </div>

                {/* Custom Prompt */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700">
                    Instruksi kustom
                  </label>
                  <div className="relative">
                    {/* Placeholder dibuat sedikit lebih gelap (placeholder-gray-400) agar samar namun tetap terbaca */}
                    <textarea
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      placeholder="Contoh: Selalu gunakan contoh soal dari kehidupan sehari-hari. Jawab dengan bertahap dan libatkan siswa dengan pertanyaan balik..."
                      rows={4}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:border-gray-400 focus:bg-white transition-all"
                    />
                    <span className="absolute bottom-3 right-3 text-[10px] font-medium text-gray-400">
                      {customPrompt.length}/1000
                    </span>
                  </div>
                </div>

                {/* PDF Upload */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700">
                    Unggah referensi PDF
                  </label>

                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      handleFiles(e.dataTransfer.files);
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex flex-col items-center justify-center gap-2 py-8 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-150 ${
                      isDragging
                        ? "border-gray-400 bg-gray-100"
                        : "border-gray-200 bg-gray-50 hover:bg-gray-100/70 hover:border-gray-300"
                    }`}
                  >
                    <Upload className="w-5 h-5 text-gray-400" />
                    <p className="text-xs text-gray-500">
                      Drag & drop atau{" "}
                      <span className="text-gray-700 font-semibold underline underline-offset-2">
                        pilih file
                      </span>
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Hanya file PDF, maks. 10 MB per file
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      multiple
                      className="hidden"
                      onChange={(e) => handleFiles(e.target.files)}
                    />
                  </div>

                  {/* File List */}
                  {uploadedFiles.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {uploadedFiles.map((file) => (
                        <li
                          key={file.id}
                          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
                        >
                          <FileText className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-gray-800 truncate">
                              {file.name}
                            </p>
                            <p className="text-[10px] text-gray-500">{file.size}</p>
                          </div>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="shrink-0 p-1 rounded-lg hover:bg-gray-200 transition-colors"
                            aria-label="Hapus file"
                          >
                            <X className="w-3 h-3 text-gray-500" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>

              {/* ── SAVE BUTTON ── */}
              <div className="flex items-center justify-end gap-3">
                <span
                  className={`text-xs text-emerald-600 font-semibold transition-opacity duration-300 ${
                    saved ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Pengaturan tersimpan
                </span>
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-gray-800 active:scale-[0.98] transition-all duration-150"
                >
                  Simpan pengaturan
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );

}

export default AdminAiSettings;