// Header.jsx
import { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo-bull.png";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from "../AuthModal/AuthModal";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setError("");
    if (!isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.headerGlow}></div>
      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          <Link to="/" className={styles.logo}>
            <img src={logo} alt="Logo" />
            <span className={styles.logoText}>ArkInvest</span>
          </Link>
        </div>

        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            <span className={styles.linkText}>Home</span>
          </Link>
          <Link to="/portfolio" className={styles.link}>
            <span className={styles.linkText}>Portfolio</span>
          </Link>
          <Link to="/about" className={styles.link}>
            <span className={styles.linkText}>About Us</span>
          </Link>
          {user && (
            <Link to="/wallet" className={styles.link}>
              <span className={styles.linkText}>My Wallet</span>
            </Link>
          )}
        </nav>

        {user ? (
          <div className={styles.userSection} ref={dropdownRef}>
            <button 
              className={styles.userButton} 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className={styles.userAvatar}>
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <span className={styles.userName}>{user.fullName}</span>
            </button>

            {isDropdownOpen && (
              <div className={styles.dropdown}>
                <Link to="/profile" className={styles.dropdownItem}>
                  <span>Мой профиль</span>
                </Link>
                <Link to="/cabinet" className={styles.dropdownItem}>
                  <span>Личный кабинет</span>
                </Link>
                <button onClick={handleLogout} className={styles.dropdownItem}>
                  <span>Выйти</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className={styles.loginButton} onClick={toggleModal}>
            <span>Login</span>
            <div className={styles.buttonGlow}></div>
          </button>
        )}
      </div>

      {isModalOpen && (
        <AuthModal
          isOpen={isModalOpen}
          onClose={toggleModal}
          onLogin={(userData) => {
            setUser(userData);
            navigate("/");
          }}
        />
      )}
    </header>
  );
};

export default Header;