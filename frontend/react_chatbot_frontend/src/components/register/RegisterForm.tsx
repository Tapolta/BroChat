interface RegisterFormProps {
  formData: {
    email: string;
    id: string;
    password: string;
    confirmPassword: string;
    loading: boolean;
    errorExists: boolean;
  };
  actions: {
    setEmail: (val: string) => void;
    setId: (val: string) => void;
    setPassword: (val: string) => void;
    setConfirmPassword: (val: string) => void;
    onClearError: () => void;
    onSubmit: (e: React.FormEvent) => void;
  };
}

export default function RegisterForm({ formData, actions }: RegisterFormProps) {
  const { email, id, password, confirmPassword, loading, errorExists } = formData;
  const { setEmail, setId, setPassword, setConfirmPassword, onClearError, onSubmit } = actions;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700 px-1">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errorExists) onClearError();
          }}
          placeholder="nama@kampus.com"
          className="w-full px-4 py-3.5 bg-white text-gray-900 text-[16px] border border-gray-300 rounded-2xl 
            focus:outline-none focus:ring-2 focus:ring-gray-950 focus:border-gray-950 transition-all placeholder:text-gray-400"
          required
          disabled={loading}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700 px-1">ID</label>
        <input
          type="text"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
            if (errorExists) onClearError();
          }}
          placeholder="1234567890"
          className="w-full px-4 py-3.5 bg-white text-gray-900 text-[16px] border border-gray-300 rounded-2xl 
            focus:outline-none focus:ring-2 focus:ring-gray-950 focus:border-gray-950 transition-all placeholder:text-gray-400"
          required
          disabled={loading}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700 px-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errorExists) onClearError();
          }}
          placeholder="••••••••"
          className="w-full px-4 py-3.5 bg-white text-gray-900 text-[16px] border border-gray-300 rounded-2xl 
            focus:outline-none focus:ring-2 focus:ring-gray-950 focus:border-gray-950 transition-all placeholder:text-gray-400"
          required
          disabled={loading}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700 px-1">Konfirmasi Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errorExists) onClearError();
          }}
          placeholder="••••••••"
          className="w-full px-4 py-3.5 bg-white text-gray-900 text-[16px] border border-gray-300 rounded-2xl 
            focus:outline-none focus:ring-2 focus:ring-gray-950 focus:border-gray-950 transition-all placeholder:text-gray-400"
          required
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 py-3.5 bg-gray-950 hover:bg-gray-900 active:scale-[0.99] disabled:bg-gray-300 text-white text-[16px] rounded-full font-medium shadow-sm transition-all duration-150"
      >
        {loading ? "Memproses..." : "Daftar Sekarang"}
      </button>
    </form>
  );
}