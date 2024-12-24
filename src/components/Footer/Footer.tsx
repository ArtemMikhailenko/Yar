import React from 'react';
import styles from './FooterSection.module.css';

const FooterSection = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.glow}></div>
      
      <div className={styles.content}>
        <div className={styles.grid}>
          <div className={styles.brandSection}>
            <h2 className={styles.logo}>ArkInvest</h2>
            <p className={styles.brandDescription}>
              Creating innovative solutions for the future of finance
            </p>
            <div className={styles.newsletter}>
              <input type="email" placeholder="Your email" />
              <button className={styles.subscribeBtn}>
                Subscribe
                <span className={styles.btnGlow}></span>
              </button>
            </div>
          </div>

          <div className={styles.linksGrid}>
            <div className={styles.column}>
              <h3>Company</h3>
              <ul>
                <li><span className={styles.dot}></span>About Us</li>
                <li><span className={styles.dot}></span>Careers</li>
                <li><span className={styles.dot}></span>Contact</li>
                <li><span className={styles.dot}></span>Press</li>
              </ul>
            </div>

            <div className={styles.column}>
              <h3>Support</h3>
              <ul>
                <li><span className={styles.dot}></span>Help Center</li>
                <li><span className={styles.dot}></span>FAQ</li>
                <li><span className={styles.dot}></span>Terms of Service</li>
                <li><span className={styles.dot}></span>Privacy Policy</li>
              </ul>
            </div>

            <div className={styles.column}>
              <h3>Community</h3>
              <ul>
                <li><span className={styles.dot}></span>Blog</li>
                <li><span className={styles.dot}></span>Partners</li>
                <li><span className={styles.dot}></span>Events</li>
                <li><span className={styles.dot}></span>News</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.socialsBar}>
          <div className={styles.socials}>
            <a href="#" className={styles.socialIcon}>
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className={styles.socialIcon}>
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#" className={styles.socialIcon}>
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="#" className={styles.socialIcon}>
              <i className="fa-brands fa-instagram"></i>
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
      </div>
    </footer>
  );
};

export default FooterSection;
