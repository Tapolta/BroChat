import UserProfileCard from "../components/login/UserProfileCard";
import LoginForm from "../components/login/LoginForm";
import { useLogin } from "../hooks/useLogin";

export default function LoginPage() {
  const {
    email,
    password,
    error,
    loading,
    changePassword,
    changeError,
    handleSubmit,
    navigate,
  } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Masukkan Password
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Silakan masukkan password akun kamu untuk melanjutkan.
          </p>
        </div>

        <UserProfileCard 
          email={email} 
          loading={loading} 
          onBack={() => navigate("/")} 
        />

        {error && (
          <div className="mb-5 p-3.5 text-sm font-medium text-red-600 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <LoginForm 
          password={password}
          email={email}
          loading={loading}
          errorExists={!!error}
          onChangePassword={changePassword}
          onClearError={() => changeError("")}
          onSubmit={handleSubmit}
        />

        <div className="mt-4 pt-4 border-t border-gray-300 text-center text-sm text-gray-500">
          Belum memiliki akun?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-150 outline-none disabled:opacity-50"
            disabled={loading}
          >
            Daftar / Buat Akun
          </button>
        </div>
        
      </div>
    </div>
  );
}