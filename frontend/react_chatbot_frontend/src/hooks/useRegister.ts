import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios";
import { storageManager } from "../utils/storage";

export function useRegister() {
  const savedEmail = storageManager.getEmail();
  const [email, setEmail] = useState(savedEmail || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClearError = () => setError("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok dengan password utama.");
      return;
    }

    setLoading(true);

    try {
      const response = await apiClient.post("/api/auth/register", {
        email: email.trim(),
        id: id.trim(),
        password: password
      });

      storageManager.setEmail(email.trim());
      console.log("Response Backend:", response.data);
      setSuccess("Akun berhasil dibuat! Mengarahkan ke halaman login...");

      setTimeout(() => {
        navigate("/verify-login");
      }, 1500);

    } catch (err: any) {
      console.error("Register Error:", err);

      if (err.response) {
        const status = err.response.status;
        const serverMessage = err.response.data?.detail || err.response.data?.message;

        if (status === 400 || status === 409 || serverMessage?.toLowerCase().includes("email")) {
          setError("Email/id sudah terdaftar. Silakan gunakan email/id lain.");
        } else {
          setError(serverMessage || "Gagal mendaftar. Silakan coba beberapa saat lagi.");
        }
      } else if (err.request) {
        setError("Tidak ada respon dari server. Periksa koneksi backend Anda.");
      } else {
        setError("Terjadi kesalahan sistem. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
}