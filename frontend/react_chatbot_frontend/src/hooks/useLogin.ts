import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { storageManager } from "../utils/storage";
import { publicClient } from "../api/axios";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = storageManager.getEmail();
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      setError("Email tidak ditemukan. Silakan kembali ke halaman awal.");
    }
  }, []);

  const changeError = (msg: string) => setError(msg);
  const changePassword = (val: string) => setPassword(val);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await publicClient.post("/api/auth/login", {
        email: email.trim(),
        password: password,
      });

      const { session_key, message } = response.data;
      console.log(message, "Key kamu:", session_key);

      storageManager.setSessionKey(session_key.trim());
      navigate("/");
    } catch (err: any) {
      console.error("Login Error:", err);
      if (err.response) {
        const serverMessage = err.response.data?.detail || err.response.data?.message;
        setError(serverMessage || "Gagal masuk. Silakan periksa kembali akun Anda.");
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
    password,
    error,
    loading,
    changePassword,
    changeError,
    handleSubmit,
    navigate,
  };
}