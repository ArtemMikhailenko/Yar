import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo-bull.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  const AuthModal = () => (
    <div className={styles.modalOverlay} onClick={toggleModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${isLogin ? styles.activeTab : ""}`}
              onClick={() => setIsLogin(true)}
            >
              Log In
            </button>
            <button
              className={`${styles.tab} ${!isLogin ? styles.activeTab : ""}`}
              onClick={() => setIsLogin(false)}
            >
              Sign In
            </button>
          </div>
          <button className={styles.closeButton} onClick={toggleModal}>
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          {isLogin ? (
            <form className={styles.authForm}>
              <div className={styles.formGroup}>
                <input type="email" placeholder="Email address" required />
                <span className={styles.focusEffect}></span>
              </div>
              <div className={styles.formGroup}>
                <input type="password" placeholder="Password" required />
                <span className={styles.focusEffect}></span>
              </div>
              <div className={styles.forgotPassword}>
                <a href="#">Forgot password?</a>
              </div>
              <button type="submit" className={styles.submitButton}>
                Log In
                <div className={styles.buttonGlow}></div>
              </button>
            </form>
          ) : (
            <form className={styles.authForm}>
              <div className={styles.formGroup}>
                <input type="text" placeholder="Full name" required />
                <span className={styles.focusEffect}></span>
              </div>
              <div className={styles.formGroup}>
                <input type="email" placeholder="Email address" required />
                <span className={styles.focusEffect}></span>
              </div>
              <div className={styles.formGroup}>
                <input type="password" placeholder="Password" required />
                <span className={styles.focusEffect}></span>
              </div>
              <div className={styles.formGroup}>
                <input
                  type="password"
                  placeholder="Confirm password"
                  required
                />
                <span className={styles.focusEffect}></span>
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

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.headerGlow}></div>
      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          <a href="/" className={styles.logo}>
            <img src={logo} alt="Logo" />
            <span className={styles.logoText}>ArkInvest</span>
          </a>
        </div>

        <nav className={styles.nav}>
          <a href="/" className={styles.link}>
            <span className={styles.linkText}>Home</span>
          </a>
          <Link to="/portfolio" className={styles.link}>
            <span className={styles.linkText}>Portfolio</span>
          </Link>
          <Link to="/about" className={styles.link}>
            <span className={styles.linkText}>About Us</span>
          </Link>
          <a href="/wallet" className={styles.link}>
            <span className={styles.linkText}>My Wallet</span>
          </a>
        </nav>

        <button className={styles.loginButton} onClick={toggleModal}>
          <span>Login</span>
          <div className={styles.buttonGlow}></div>
        </button>
      </div>

      {isModalOpen && <AuthModal />}
    </header>
  );
};

export default Header;
