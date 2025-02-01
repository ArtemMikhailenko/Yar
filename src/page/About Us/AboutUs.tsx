import styles from "./AboutUs.module.css";

const AboutUs = () => {
  return (
    <div className={styles.aboutPage}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>
            Welcome to Arkinvest – The Leading Launchpad Platform for Crypto
            Projects!
          </h1>
          <p>
            We create a unique ecosystem for launching and promoting the most
            promising blockchain projects, connecting creators of innovative
            solutions with investors around the world.
          </p>
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
              Arkinvest aims to revolutionize the way crypto projects are
              launched and developed. We believe that everyone deserves access
              to the best blockchain opportunities, while projects receive
              high-quality support and promotion.
            </p>
          </div>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🔒</div>
              <h3>Reliability & Transparency</h3>
              <p>
                We ensure transaction security and access to verified projects.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>💡</div>
              <h3>Multi-Chain Support</h3>
              <p>
                We work with leading blockchains like Ethereum, BNB Chain,
                Polygon, and Avalanche.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🚀</div>
              <h3>Innovation</h3>
              <p>
                Supporting breakthrough ideas in DeFi, AI, NFT, and Web3 Gaming.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>📈</div>
              <h3>Investor Benefits</h3>
              <p>
                Exclusive access to early token sales and unique investment
                growth opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.expertise}>
        <div className={styles.container}>
          <h2>What We Offer</h2>
          <div className={styles.expertiseGrid}>
            <div className={styles.expertiseCard}>
              <h3>Launchpads & IDO</h3>
              <p>Powerful fundraising tools for crypto projects.</p>
            </div>
            <div className={styles.expertiseCard}>
              <h3>Expert Community</h3>
              <p>Work with professionals to make your project stand out.</p>
            </div>
            <div className={styles.expertiseCard}>
              <h3>Crypto Tools</h3>
              <p>Advanced analytics, trading, and investment services.</p>
            </div>
            <div className={styles.expertiseCard}>
              <h3>Enterprise Blockchain</h3>
              <p>Scalable blockchain solutions for large-scale operations.</p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.joinUs}>
        <div className={styles.container}>
          <h2>Join Arkinvest!</h2>
          <p>
            Be part of the Web3 revolution. Launch your projects, invest with
            confidence, and create the future together with us!
          </p>
        </div>
        <div className={styles.heroGlow}></div>
      </section>
      <section className={styles.team}>
        {/* <div className={styles.container}> */}
        <h2>Our Team</h2>
        <p className={styles.teamText}>
          Arkinvest is a team of experienced specialists in blockchain,
          investments, and marketing who work daily to improve your results.
        </p>
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
        {/* </div> */}
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
