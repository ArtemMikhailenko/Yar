import React, { useState } from "react";
import axios from "axios";
import styles from "./AuthModal.module.css";
import { AuthModalProps } from "../../types/header/header";
import useAuth from "../../hooks/useAuth";

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const { setUser } = useAuth();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setError("");
  };

  // Регистрируем пользователя сразу, без верификации
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/register`, {
        ...formData,
        walletAddress: "",
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user);
      onLogin(response.data.user);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
        walletAddress: "",
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user);
      onLogin(response.data.user);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${isLogin ? styles.activeTab : ""}`}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button
              className={`${styles.tab} ${!isLogin ? styles.activeTab : ""}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.formSection}>
          <h3> {isLogin ? "Sign In" : "Create Account"}</h3>
          {error && <div className={styles.error}>{error}</div>}

          {isLogin ? (
            <form className={styles.authForm} onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
                required
              />
              <button type="submit">Login</button>
            </form>
          ) : (
            <form className={styles.authForm} onSubmit={handleRegister}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleInputChange}
                required
              />
              <button type="submit">Register</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
