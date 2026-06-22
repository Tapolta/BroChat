interface UserProfileCardProps {
  email: string;
  loading: boolean;
  onBack: () => void;
}

export default function UserProfileCard({ email, loading, onBack }: UserProfileCardProps) {
  return (
    <div className="mb-6 p-3.5 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-between">
      <div className="truncate">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Log in sebagai</p>
        <p className="text-[15px] font-semibold text-gray-800 truncate">{email || "Memuat email..."}</p>
      </div>

      <button 
        type="button"
        onClick={onBack} 
        className="text-xs font-semibold text-blue-600 hover:text-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        Ubah
      </button>
    </div>
  );
}