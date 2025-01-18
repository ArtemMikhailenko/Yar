/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo-bull.png";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from "../AuthModal/AuthModal";
import ThirdWebWalletConnect from "./ThirdWebWalletConnect";
interface User {
  fullName: string;
  // Add other user properties as needed
}
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const userData = localStorage.getItem("user");
  //   if (token && userData) {
  //     setUser(JSON.parse(userData));
  //   }
  // }, [token]);

  useEffect(() => {
    //@ts-ignore
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(`.${styles.burgerButton}`)
      ) {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = "unset";
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    //@ts-ignore
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = "unset";
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? "hidden" : "unset";
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/projects", label: "Projects" },
    { path: "/about", label: "About Us" },
    ...(user ? [{ path: "/wallet", label: "My Wallet" }] : []),
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.headerGlow}></div>
      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          <Link to="/" className={styles.logo} onClick={closeMobileMenu}>
            <img src={logo} alt="Logo" />
            <span className={styles.logoText}>ArkInvest</span>
          </Link>
        </div>

        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path} className={styles.link}>
              <span className={styles.linkText}>{item.label}</span>
            </Link>
          ))}
        </nav>
        <ThirdWebWalletConnect />
        <div className={styles.rightSection}>
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
                    <span>Мy profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={styles.dropdownItem}
                  >
                    <span>Log Out</span>
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

          <button
            className={`${styles.burgerButton} ${
              isMobileMenuOpen ? styles.active : ""
            }`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M5 8H13.75M5 12H19M10.25 16L19 16"
                  stroke="#464455"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.mobileMenuOpen : ""
        }`}
        ref={mobileMenuRef}
      >
        <div className={styles.mobileMenuContent}>
          <div className={styles.mobileMenuHeader}>
            <div className={styles.mobileLogoWrapper}>
              <Link
                to="/"
                className={styles.mobileLogo}
                onClick={closeMobileMenu}
              >
                <img src={logo} alt="Logo" />
                <span className={styles.mobileLogoText}>ArkInvest</span>
              </Link>
            </div>
            <button
              className={styles.closeButton}
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <nav className={styles.mobileNav}>
            {menuItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={styles.mobileLink}
                onClick={closeMobileMenu}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <span className={styles.mobileLinkText}>{item.label}</span>
                <span className={styles.mobileLinkIcon}>→</span>
              </Link>
            ))}
          </nav>

          {user && (
            <div className={styles.mobileUserSection}>
              <div className={styles.mobileUserInfo}>
                <div className={styles.userAvatar}>
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <span className={styles.userName}>{user.fullName}</span>
              </div>
              <div className={styles.mobileUserLinks}>
                <Link
                  to="/profile"
                  className={styles.mobileUserLink}
                  onClick={closeMobileMenu}
                >
                  <span>My profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className={styles.mobileUserLink}
                >
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
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
