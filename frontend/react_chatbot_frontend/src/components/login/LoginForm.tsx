interface LoginFormProps {
  password: string;
  email: string;
  loading: boolean;
  errorExists: boolean;
  onChangePassword: (val: string) => void;
  onClearError: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function LoginForm({
  password,
  email,
  loading,
  errorExists,
  onChangePassword,
  onClearError,
  onSubmit
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700 px-1">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            onChangePassword(e.target.value);
            if (errorExists) onClearError();
          }}
          placeholder="••••••••"
          className="w-full px-4 py-3.5 bg-white text-gray-900 text-[16px] border border-gray-300 rounded-2xl 
            focus:outline-none focus:ring-2 focus:ring-gray-950 focus:border-gray-950 transition-all placeholder:text-gray-400"
          required
          disabled={!email || loading}
        />
      </div>

      <button
        type="submit"
        disabled={!email || loading}
        className="w-full mt-2 py-3.5 bg-gray-950 hover:bg-gray-900 active:scale-[0.99] disabled:bg-gray-300 disabled:scale-100 text-white text-[16px] rounded-full font-medium shadow-sm transition-all duration-150"
      >
        {loading ? "Memproses..." : "Log In"}
      </button>
    </form>
  );
}