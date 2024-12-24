// PortfolioPage.jsx
import  { useState } from 'react';
import styles from './PortfolioPage.module.css';
import logo from "../../assets/logo-bull.png";
const PortfolioPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const projects = [
    {
      id: 1,
      name: "DeFi Exchange",
      fundRaised: "$250k",
      sold: "100%",
      roi: "x15.4",
      category: "DeFi",
      description: "A hybrid decentralized exchange (DEX) integrated with Telegram, functioning as a gamified crypto application within the messenger.",
      image: logo
    },
    {
      id: 2,
      name: "NFT Marketplace",
      fundRaised: "$180k",
      sold: "100%",
      roi: "x12.8",
      category: "NFT",
      description: "Revolutionary NFT marketplace with focus on digital art and music, featuring low gas fees and cross-chain compatibility.",
      image: logo
    },
    {
      id: 3,
      name: "Crypto Wallet",
      fundRaised: "$320k",
      sold: "100%",
      roi: "x18.2",
      category: "Infrastructure",
      description: "Multi-chain cryptocurrency wallet with built-in DeFi protocols integration and advanced security features.",
      image: logo
    },
    {
      id: 4,
      name: "GameFi Platform",
      fundRaised: "$420k",
      sold: "100%",
      roi: "x22.5",
      category: "Gaming",
      description: "Play-to-earn gaming platform with multiple blockchain games and unique tokenomics system.",
      image: logo
    },
    {
      id: 5,
      name: "DeFi Lending",
      fundRaised: "$290k",
      sold: "100%",
      roi: "x16.7",
      category: "DeFi",
      description: "Decentralized lending platform with automated market maker and yield optimization strategies.",
      image: logo
    }
  ];

  return (
    <div className={styles.page}>
       <div className={styles.glowOrb} />
      <div className={styles.heroSection}>
       
        <h1 className={styles.heroTitle}>Our Portfolio</h1>
        <p className={styles.heroSubtitle}>Transforming ideas into successful blockchain ventures</p>
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          {projects.map((project) => (
            <div
              key={project.id}
              className={styles.card}
              onMouseEnter={() => setHoveredCard(project.id as any)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardFront}>
                  <div className={styles.categoryBadge}>{project.category}</div>
                  <div className={styles.cardHeader}>
                    <div className={styles.imageWrapper}>
                      <img
                        src={project.image}
                        alt={project.name}
                        className={styles.image}
                      />
                      <div className={styles.imageGlow} />
                    </div>
                    <h3 className={styles.projectName}>{project.name}</h3>
                  </div>

                  <div className={styles.stats}>
                    <div className={styles.statItem}>
                      <div className={styles.statIconWrapper}>
                        <span className={styles.statIcon}>💰</span>
                      </div>
                      <p className={styles.statLabel}>Fund raised</p>
                      <p className={styles.statValue}>{project.fundRaised}</p>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statIconWrapper}>
                        <span className={styles.statIcon}>📈</span>
                      </div>
                      <p className={styles.statLabel}>Sold</p>
                      <p className={styles.statValue}>{project.sold}</p>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statIconWrapper}>
                        <span className={styles.statIcon}>✨</span>
                      </div>
                      <p className={styles.statLabel}>ROI</p>
                      <p className={`${styles.statValue} ${styles.roiValue}`}>
                        {project.roi}
                      </p>
                    </div>
                  </div>

                  <p className={styles.description}>{project.description}</p>

                  <button className={styles.viewButton}>
                    <span className={styles.buttonText}>View Details</span>
                    <div className={styles.buttonGlow} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;