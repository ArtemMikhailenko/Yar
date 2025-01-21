import React, { useState } from "react";
import axios from "axios";
// import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import styles from "./AuthModal.module.css";
import { AuthModalProps } from "../../types/header/header";
import useAuth from "../../hooks/useAuth";

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  // const address = useAddress();
  const { setUser } = useAuth();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // useEffect(() => {
  //   setError("");
  // }, [address]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setError("");
  };

  // const formatPhoneNumber = (phone: string) => {
  //   // Удаляем все нецифровые символы
  //   const cleaned = phone.replace(/\D/g, "");
  //   // Добавляем +7 если номер начинается с 8 или 7
  //   if (cleaned.startsWith("8")) {
  //     return "+7" + cleaned.slice(1);
  //   }
  //   if (cleaned.startsWith("7")) {
  //     return "+" + cleaned;
  //   }
  //   return "+7" + cleaned;
  // };

  const sendVerificationCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.phoneNumber) {
      setError("Please enter your phone number");
      return;
    }

    const formattedPhone = formData.phoneNumber;

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/send-phone-verification`,
        {
          phoneNumber: formattedPhone,
        }
      );

      if (response.status === 200) {
        setIsCodeSent(true);
        setError("");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to send verification code");
    }
  };

  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Verify phone code
      const verifyResponse = await axios.post(
        `${BASE_URL}/api/auth/verify-phone`,
        {
          phoneNumber: formData.phoneNumber,
          code: verificationCode,
        }
      );

      if (verifyResponse.status === 200) {
        // If verification successful, proceed with registration
        const registerResponse = await axios.post(
          `${BASE_URL}/api/auth/register`,
          {
            ...formData,
            phoneNumber: formData.phoneNumber,
            walletAddress: "",
          }
        );

        localStorage.setItem("token", registerResponse.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(registerResponse.data.user)
        );
        setUser(registerResponse.data.user);
        onLogin(registerResponse.data.user);
        onClose();
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Verification failed");
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

        {/* <div className={styles.walletSection}>
          <h3>Step 1: Connect Your Wallet</h3>
          <div className={styles.walletConnect}>
            <ConnectWallet
              theme="dark"
              btnTitle="Connect Wallet"
              modalSize="wide"
            />
          </div>
          {address && (
            <div className={styles.walletConnected}>
              <span className={styles.checkmark}>✓</span> Wallet connected:{" "}
              {address.slice(0, 6)}...{address.slice(-4)}
            </div>
          )}
        </div> */}

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
                // disabled={!address}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
                required
                // disabled={!address}
              />
              <button
                type="submit"
                // disabled={!address}
                // className={!address ? styles.buttonDisabled : ""}
              >
                {/* {!address ? "Connect Wallet First" : "Login"} */}
                Login
              </button>
            </form>
          ) : !isCodeSent ? (
            <form className={styles.authForm} onSubmit={sendVerificationCode}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={handleInputChange}
                required
                // disabled={!address}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
                required
                // disabled={!address}
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number (e.g. +7 999 123 45 67)"
                onChange={handleInputChange}
                required
                // disabled={!address}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
                required
                // disabled={!address}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleInputChange}
                required
                // disabled={!address}
              />
              <button
                type="submit"
                // disabled={!address}
                // className={!address ? styles.buttonDisabled : ""}
              >
                Send Verification Code
              </button>
            </form>
          ) : (
            <form
              className={styles.authForm}
              onSubmit={handleVerifyAndRegister}
            >
              <p className={styles.verificationMessage}>
                Please enter the verification code sent to your phone
              </p>
              <input
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
              <button type="submit">Verify & Complete Registration</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
