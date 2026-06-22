import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storageManager } from "../../utils/storage";

interface EmailLoginFormProps {
  onSuccessClose: () => void;
}

export default function EmailLoginForm({ onSuccessClose }: EmailLoginFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!validateEmail(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      storageManager.setEmail(email.trim());
      setSuccessMessage("Email berhasil disimpan. Mengarahkan...");
      
      setTimeout(() => {
        navigate("/verify-login");
        setEmail("");
        onSuccessClose();
      }, 500);
    } catch (err) {
      setError("Gagal menyimpan data login. Silakan coba lagi.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
      {error && (
        <div className="p-3 text-xs font-medium text-red-600 bg-red-50 rounded-2xl border border-red-100">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="p-3 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-2xl border border-emerald-100">
          {successMessage}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full px-4 py-3.5 bg-white text-gray-900 text-[16px] border border-gray-300 rounded-2xl 
            focus:outline-none focus:ring-2 focus:ring-gray-950 focus:border-gray-950 transition-all placeholder:text-gray-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full mt-1 py-3.5 bg-gray-950 hover:bg-gray-900 active:scale-[0.99] text-white text-[16px] rounded-full font-medium shadow-sm transition-all duration-150"
      >
        Continue
      </button>
    </form>
  );
}