import React, { useCallback, useEffect, useState } from "react";
import {
  Calendar,
  Users,
  DollarSign,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import styles from "./UpcomingProjects.module.css";

interface UpcomingProject {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  bannerUrl: string;
  startDate: string;
  targetRaise: number;
  totalParticipants: number;
  timeUntilStart: string;
  chain: string;
  status: string;
  categories: string[];
}

const FeaturedProject: React.FC<{ project: UpcomingProject }> = ({
  project,
}) => (
  <div className={styles.featuredContainer}>
    <div
      className={styles.featuredBanner}
      style={{ backgroundImage: `url(${project.bannerUrl})` }}
    >
      <div className={styles.featuredOverlay}>
        <div className={styles.spotlight} />
        <div className={styles.featuredContent}>
          <div className={styles.projectHeader}>
            <div className={styles.logoWrapper}>
              <img
                src={project.logoUrl}
                alt={project.name}
                className={styles.featuredLogo}
              />
              <div className={styles.logoGlow} />
            </div>
            <div className={styles.projectInfo}>
              <div className={styles.titleRow}>
                <h2>{project.name}</h2>
                <div className={styles.badgeContainer}>
                  <span className={styles.statusBadge}>{project.status}</span>
                </div>
              </div>
              <div className={styles.categoriesRow}>
                <span className={styles.chainBadge}>{project.chain}</span>
                {project.categories.map((category, index) => (
                  <span key={index} className={styles.categoryBadge}>
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className={styles.description}>{project.description}</p>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <Calendar className={styles.statIcon} />
              <div>
                <h4>Start Date</h4>
                <p>{project.startDate}</p>
              </div>
            </div>
            <div className={styles.statItem}>
              <DollarSign className={styles.statIcon} />
              <div>
                <h4>Target Raise</h4>
                <p>${project.targetRaise.toLocaleString()}</p>
              </div>
            </div>
            <div className={styles.statItem}>
              <Users className={styles.statIcon} />
              <div>
                <h4>Expected Participants</h4>
                <p>{project.totalParticipants.toLocaleString()}</p>
              </div>
            </div>
            <div className={styles.statItem}>
              <Clock className={styles.statIcon} />
              <div>
                <h4>Time Until Start</h4>
                <p>{project.timeUntilStart}</p>
              </div>
            </div>
          </div>
          <button className={styles.learnMoreButton}>
            View Project Details
            <span className={styles.buttonGlow} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const UpcomingProjects: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const upcomingProjects: UpcomingProject[] = [
    {
      id: "1",
      name: "Ondo AI",
      description:
        "Revolutionizing AI infrastructure with decentralized computing power and blockchain technology. Ondo AI creates an ecosystem where users can share computational resources and earn rewards.",
      logoUrl:
        "https://polkastarter.com/_next/image?url=https%3A%2F%2Fassets.polkastarter.com%2Flogo_onda_ba410336f5%2Flogo_onda_ba410336f5.jpg&w=96&q=70",
      bannerUrl:
        "https://cdn.banklesstimes.com/bt/content/uploads/2024/07/1720681115-Ondo-Finance.jpg",
      startDate: "Jan 30, 2025",
      targetRaise: 400000,
      totalParticipants: 12000,
      timeUntilStart: "12 days",
      chain: "Ethereum",
      status: "Upcoming",
      categories: ["AI", "Infrastructure", "Web3"],
    },
    {
      id: "2",
      name: "Avalanche AI",
      description:
        "A next-generation AI platform leveraging the Avalanche network for high-performance machine learning applications. Building the future of decentralized artificial intelligence.",
      logoUrl:
        "https://polkastarter.com/_next/image?url=https%3A%2F%2Fassets.polkastarter.com%2Fqug8_L_Ew_F_400x400_63d22bf6ba%2Fqug8_L_Ew_F_400x400_63d22bf6ba.jpg&w=96&q=70",
      bannerUrl:
        "https://polkastarter.com/_next/image?url=https%3A%2F%2Fassets.polkastarter.com%2Fbanner_fe80625570%2Fbanner_fe80625570.png&w=3840&q=75",
      startDate: "Feb 5, 2025",
      targetRaise: 350000,
      totalParticipants: 10000,
      timeUntilStart: "18 days",
      chain: "Avalanche",
      status: "Upcoming",
      categories: ["AI", "DeFi", "Gaming"],
    },
    {
      id: "3",
      name: "Lympid",
      description:
        "Pioneering liquid staking solutions with advanced DeFi protocols. Lympid enables seamless staking across multiple chains while maintaining full liquidity.",
      logoUrl:
        "https://polkastarter.com/_next/image?url=https%3A%2F%2Fassets.polkastarter.com%2Flympid_logo_400x400_4647e1b1c2%2Flympid_logo_400x400_4647e1b1c2.png&w=96&q=70",
      bannerUrl:
        "https://dex-bin.bnbstatic.com/static/dapp-uploads/W3bLk6HK1uSI3oh54ruas",
      startDate: "Feb 12, 2025",
      targetRaise: 450000,
      totalParticipants: 15000,
      timeUntilStart: "25 days",
      chain: "Multichain",
      status: "Upcoming",
      categories: ["DeFi", "Staking", "Infrastructure"],
    },
  ];

  const nextProject = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % upcomingProjects.length);
  }, [upcomingProjects.length]);

  const prevProject = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + upcomingProjects.length) % upcomingProjects.length
    );
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(nextProject, 5000); // Auto-scroll every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isPaused, nextProject]);

  return (
    <div
      className={styles.upcomingSection}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.sectionHeader}>
        <h1>Featured Upcoming Projects</h1>
      </div>
      <div className={styles.carouselContainer}>
        <button
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={prevProject}
        >
          <ChevronLeft />
        </button>
        <FeaturedProject project={upcomingProjects[currentIndex]} />
        <button
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={nextProject}
        >
          <ChevronRight />
        </button>
      </div>
      <div className={styles.projectDots}>
        {upcomingProjects.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.activeDot : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingProjects;
