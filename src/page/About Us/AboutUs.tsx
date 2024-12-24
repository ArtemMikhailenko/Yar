
import styles from './AboutUs.module.css';

const AboutUs = () => {
  return (
    <div className={styles.aboutPage}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Pioneering the Future of Blockchain</h1>
          <p>Transforming industries through innovative blockchain solutions</p>
        </div>
        <div className={styles.heroGlow}></div>
      </section>

      <section className={styles.stats}>
        <div className={styles.container}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>5+</span>
            <span className={styles.statLabel}>Years of Excellence</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>50M+</span>
            <span className={styles.statLabel}>Transactions Processed</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>100+</span>
            <span className={styles.statLabel}>Enterprise Clients</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>30+</span>
            <span className={styles.statLabel}>Countries Served</span>
          </div>
        </div>
      </section>

      <section className={styles.mission}>
        <div className={styles.container}>
          <div className={styles.missionContent}>
            <h2>Our Mission</h2>
            <p>
              At ArkInvest, we're dedicated to revolutionizing the financial landscape through cutting-edge blockchain technology. Our mission is to create a more transparent, efficient, and accessible financial ecosystem for everyone.
            </p>
          </div>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🔒</div>
              <h3>Security First</h3>
              <p>Enterprise-grade security protocols protecting your assets 24/7</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>💡</div>
              <h3>Innovation</h3>
              <p>Pushing the boundaries of blockchain technology</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🤝</div>
              <h3>Trust</h3>
              <p>Building lasting relationships through transparency</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🚀</div>
              <h3>Performance</h3>
              <p>High-speed, scalable solutions for the modern world</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.expertise}>
        <div className={styles.container}>
          <h2>Our Expertise</h2>
          <div className={styles.expertiseGrid}>
            <div className={styles.expertiseCard}>
              <h3>Smart Contracts</h3>
              <p>Automated, secure, and transparent contract execution for your business needs</p>
            </div>
            <div className={styles.expertiseCard}>
              <h3>DeFi Solutions</h3>
              <p>Revolutionary decentralized financial products and services</p>
            </div>
            <div className={styles.expertiseCard}>
              <h3>Digital Assets</h3>
              <p>Comprehensive digital asset management and trading solutions</p>
            </div>
            <div className={styles.expertiseCard}>
              <h3>Enterprise Blockchain</h3>
              <p>Scalable blockchain solutions for enterprise-level operations</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.team}>
        <div className={styles.container}>
          <h2>Leadership Team</h2>
          <div className={styles.teamGrid}>
            <div className={styles.teamCard}>
              <div className={styles.teamMemberImage}>
                <img src="/api/placeholder/300/300" alt="CEO" />
              </div>
              <h3>Michael Anderson</h3>
              <span>CEO & Founder</span>
              <p>15+ years in FinTech & Blockchain</p>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.teamMemberImage}>
                <img src="/api/placeholder/300/300" alt="CTO" />
              </div>
              <h3>Sarah Chen</h3>
              <span>CTO</span>
              <p>Former Tech Lead at Ethereum Foundation</p>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.teamMemberImage}>
                <img src="/api/placeholder/300/300" alt="COO" />
              </div>
              <h3>David Miller</h3>
              <span>COO</span>
              <p>20+ years in Operations & Strategy</p>
            </div>
          </div>
        </div>
      </section>

      {/* <section className={styles.contact}>
        <div className={styles.container}>
          <h2>Ready to Transform Your Business?</h2>
          <p>Let's discuss how blockchain can revolutionize your industry</p>
          <button className={styles.ctaButton}>
            Contact Us
            <div className={styles.buttonGlow}></div>
          </button>
        </div>
      </section> */}
    </div>
  );
};

export default AboutUs;