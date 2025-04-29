/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo-bull.png";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from "../AuthModal/AuthModal";
// import ThirdWebWalletConnect from "./ThirdWebWalletConnect";
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
  const burgerButtonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  // Store the initial scroll position
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkUser = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener("storage", checkUser); // Track localStorage changes

    return () => {
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  useEffect(() => {
    //@ts-ignore
    const handleClickOutside = (event) => {
      // Check if click is outside the mobile menu and not on the burger button
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        burgerButtonRef.current &&
        !burgerButtonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
        enableScrolling();
      }

      // Handle dropdown click outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    //@ts-ignore
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        enableScrolling();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen]);

  // Lock scrolling when mobile menu is open
  const disableScrolling = () => {
    // Store current scroll position
    scrollPositionRef.current = window.scrollY;

    // Add the no-scroll class to html and body elements
    document.documentElement.classList.add(styles.noScroll);
    document.body.classList.add(styles.noScroll);

    // Set position fixed and top position to maintain visual position
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPositionRef.current}px`;
    document.body.style.width = "100%";
  };

  // Enable scrolling when mobile menu is closed
  const enableScrolling = () => {
    // Remove the no-scroll class
    document.documentElement.classList.remove(styles.noScroll);
    document.body.classList.remove(styles.noScroll);

    // Reset body styles
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";

    // Restore scroll position
    window.scrollTo(0, scrollPositionRef.current);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      disableScrolling();
    } else {
      enableScrolling();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    enableScrolling();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    if (!isMobileMenuOpen) {
      disableScrolling();
    } else {
      enableScrolling();
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    enableScrolling();
  };

  const menuItems = [
    { path: "/", label: "Home" },
    // { path: "/portfolio", label: "Portfolio" },
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
            <span className={styles.logoText}>In4fin</span>
          </Link>
        </div>

        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path} className={styles.link}>
              <span className={styles.linkText}>{item.label}</span>
            </Link>
          ))}
        </nav>
        {/* <ThirdWebWalletConnect /> */}
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
            ref={burgerButtonRef}
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
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M5 8H13.75M5 12H19M10.25 16L19 16"
                  stroke="#464455"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                <span className={styles.mobileLogoText}>In4fin</span>
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
