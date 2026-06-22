interface GuestSectionProps {
  onLogin: () => void;
}

function GuestSection({ onLogin }: GuestSectionProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 mx-3 mt-4 shadow-sm">
      <h4 className="font-semibold text-sm text-gray-900">
        Login ke BroChat
      </h4>
      
      <p className="text-xs text-gray-500 leading-5 mt-2">
        Simpan riwayat chat dan sinkronkan percakapan di seluruh perangkat.
      </p>
      
      <button
        onClick={onLogin}
        className="w-full mt-4 rounded-full bg-black text-white py-2.5 text-sm font-medium hover:bg-gray-900 transition-colors"
      >
        Log in
      </button>
    </div>
  );
}

export default GuestSection;