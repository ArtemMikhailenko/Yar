import React, { useState } from "react";
import axios from "axios";
import styles from "./AuthModal.module.css";
import { AuthModalProps } from "../../types/header/header";
import useAuth from "../../hooks/useAuth";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { setUser } = useAuth();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // const response = await axios.post("http://localhost:1024/api/auth/login", {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user);
      onLogin(response.data.user);
      onClose();
    } catch (error: any) {
      setError(error.response?.data?.error || "An error occurred");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // const response = await axios.post(
      //   "http://localhost:1024/api/auth/register",
      //   {
      const response = await axios.post(`${BASE_URL}/api/auth/register`, {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      onLogin(response.data.user);
      onClose();
    } catch (error: any) {
      setError(error.response?.data?.error || "An error occurred");
    }
  };

  const handleForgotPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:1024/api/auth/forgot-password", {
        email: formData.email,
      });
      setError("Password reset link has been sent to your email");
    } catch (error: any) {
      setError(error.response?.data?.error || "An error occurred");
    }
  };

  if (!isOpen) return null;

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

        <div className={styles.modalBody}>
          {error && <div className={styles.error}>{error}</div>}

          {isLogin ? (
            <form className={styles.authForm} onSubmit={handleLogin}>
              <div className={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <EnvelopeIcon className={styles.formIcon} />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <LockClosedIcon className={styles.formIcon} />
              </div>
              <div className={styles.forgotPassword}>
                <button type="button" onClick={handleForgotPassword}>
                  Forgot Password?
                </button>
              </div>
              <button type="submit" className={styles.submitButton}>
                Sign In to Account
                <div className={styles.buttonGlow}></div>
              </button>
            </form>
          ) : (
            <form className={styles.authForm} onSubmit={handleRegister}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
                <UserIcon className={styles.formIcon} />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <EnvelopeIcon className={styles.formIcon} />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="password"
                  name="password"
                  placeholder="Create Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <LockClosedIcon className={styles.formIcon} />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <ShieldCheckIcon className={styles.formIcon} />
              </div>
              <button type="submit" className={styles.submitButton}>
                Create Account
                <div className={styles.buttonGlow}></div>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
