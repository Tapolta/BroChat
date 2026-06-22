import RegisterForm from "../components/register/RegisterForm";
import { useRegister } from "../hooks/useRegister";

export default function RegisterPage() {
  const {
    email,
    id,
    password,
    confirmPassword,
    error,
    success,
    loading,
    setEmail,
    setId,
    setPassword,
    setConfirmPassword,
    handleClearError,
    handleSubmit
  } = useRegister();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Buat Akun Baru</h2>
          <p className="text-sm text-gray-500 mt-2">Silakan isi data di bawah ini untuk mendaftar.</p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 text-sm font-medium text-red-600 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-5 p-3.5 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{success}</span>
          </div>
        )}

        <RegisterForm 
          formData={{ email, id, password, confirmPassword, loading, errorExists: !!error }}
          actions={{ setEmail, setId, setPassword, setConfirmPassword, onClearError: handleClearError, onSubmit: handleSubmit }}
        />
      </div>
    </div>
  );
}