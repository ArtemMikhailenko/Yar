import { useState } from "react";
import styles from "./FooterSection.module.css";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";
import SecurityModal from "../SecurityModal/SecurityModal";
import TermsModal from "../TermsModal/TermsModal";
import { Link } from "react-router-dom";

const FooterSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.glow}></div>

        <div className={styles.content}>
          <div className={styles.grid}>
            <div className={styles.brandSection}>
              <h2 className={styles.logo}>ArkInvest</h2>
              <p className={styles.brandDescription}>
                Creating innovative solutions for the future of finance
              </p>
            </div>

            <div className={styles.linksGrid}>
              <div className={styles.column}>
                <h3>Company</h3>
                <ul>
                  <Link to="/about">
                    <li>
                      <span className={styles.dot}></span>About Us
                    </li>
                  </Link>
                  <li>
                    <span className={styles.dot}></span>Contact
                  </li>
                </ul>
              </div>

              <div className={styles.column}>
                <h3>Support</h3>
                <ul>
                  <li onClick={() => setIsSecurityModalOpen(true)}>
                    <span className={styles.dot}></span>Security
                  </li>
                  <li onClick={() => setIsTermsModalOpen(true)}>
                    <span className={styles.dot}></span>Terms of Service
                  </li>
                  <li onClick={() => setIsModalOpen(true)}>
                    <span className={styles.dot}></span>Privacy Policy
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Обновлённый блок социальных иконок */}
          <div className={styles.socialsBar}>
            <div className={styles.socials}>
              <a
                href="https://t.me/yourTelegramChannel"
                className={styles.socialIcon}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-telegram"></i>
              </a>
              <a
                href="mailto:info@arkinvest.com"
                className={styles.socialIcon}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-solid fa-envelope"></i>
              </a>
              <a
                href="https://x.com/ARKInvest?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor&mx=2"
                className={styles.socialIcon}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
            </div>
          </div>

          <div className={styles.bottom}>
            <p>© 2024 ArkInvest. All rights reserved.</p>
            <div className={styles.bottomLinks}>
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
              <a href="#">Cookies</a>
            </div>
          </div>

          <div className={styles.begonText}>
            <p>begon</p>
          </div>
        </div>
      </footer>
      {isSecurityModalOpen && (
        <SecurityModal onClose={() => setIsSecurityModalOpen(false)} />
      )}
      {isModalOpen && <PrivacyPolicy onClose={() => setIsModalOpen(false)} />}
      {isTermsModalOpen && (
        <TermsModal onClose={() => setIsTermsModalOpen(false)} />
      )}
    </>
  );
};

export default FooterSection;
