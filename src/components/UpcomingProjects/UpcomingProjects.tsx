import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Calendar,
  Users,
  DollarSign,
  Clock,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./UpcomingProjects.module.css";
import BuyTokenModal from "../BuyTokenModal/BuyTokenModal";
import AuthModal from "../AuthModal/AuthModal";

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

const FeaturedProject: React.FC<{
  project: UpcomingProject;
  onViewProject: (tokenName: string) => void;
  onBuy: (project: UpcomingProject) => void;
}> = ({ project, onViewProject, onBuy }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (project.name === "Avalanche AI") {
      const timer = setInterval(() => {
        const now = new Date();
        const endDate = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
        const difference = endDate.getTime() - now.getTime();

        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [project.name]);

  return (
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
                    <span className={styles.statusBadge}>
                      {project.name === "Avalanche AI"
                        ? "Active"
                        : project.status}
                    </span>
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
                  <h4>
                    {project.name === "Avalanche AI"
                      ? "Token Price"
                      : "Target Raise"}
                  </h4>
                  <p>
                    {project.name === "Avalanche AI"
                      ? "$0.01"
                      : `$${project.targetRaise.toLocaleString()}`}
                  </p>
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
                  <h4>Time Remaining</h4>
                  <p>
                    {project.name === "Avalanche AI"
                      ? `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
                      : project.timeUntilStart}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <button
                onClick={() => onViewProject(project.name)}
                className={styles.learnMoreButton}
              >
                View Project Details
                <span className={styles.buttonGlow} />
              </button>
              {project.name === "Avalanche AI" && (
                <button
                  onClick={() => onBuy(project)}
                  className={`${styles.learnMoreButton} ${styles.buyButton}`}
                >
                  <ShoppingCart className={styles.buttonIcon} />
                  Buy Tokens
                  <span className={styles.buttonGlow} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UpcomingProjects: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [projects, setProjects] = useState<UpcomingProject[]>([]); // ✅ исправлено, теперь projects - массив
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout>();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<UpcomingProject | null>(null);
  const handleViewToken = (tokenName: string) => {
    navigate(`/upcoming/${encodeURIComponent(tokenName)}`);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleBuy = (project: UpcomingProject) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsModalOpen(true);
    }
    setSelectedProject(project);
    setShowModal(true);
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    const fetchTokenDetails = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/projects?status=Upcoming`
        );
        if (!response.ok) throw new Error("Failed to fetch token details");
        const data = await response.json();
        setProjects(data.reverse()); // ✅ Инвертируем порядок
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenDetails();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const nextProject = useCallback(() => {
    if (projects.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }
  }, [projects.length]);

  const prevProject = () => {
    if (projects.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }
  };

  useEffect(() => {
    if (!isPaused && projects.length > 0) {
      const interval = setInterval(nextProject, 5000); // Auto-scroll every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isPaused, nextProject, projects.length]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
          disabled={projects.length === 0}
        >
          <ChevronLeft />
        </button>
        {projects.length > 0 && (
          <FeaturedProject
            project={projects[currentIndex]}
            onViewProject={handleViewToken}
            onBuy={handleBuy}
          />
        )}
        {showModal && selectedProject && (
          <BuyTokenModal
            project={selectedProject}
            onClose={() => setShowModal(false)}
          />
        )}
        <button
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={nextProject}
          disabled={projects.length === 0}
        >
          <ChevronRight />
        </button>
      </div>
      <div className={styles.projectDots}>
        {projects.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.activeDot : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
      {isModalOpen && (
        <AuthModal
          isOpen={isModalOpen}
          onClose={toggleModal}
          onLogin={() => {
            setIsModalOpen(false); // Закрываем модалку после входа
            navigate("/wallet"); // После входа перенаправляем в кошелек
          }}
        />
      )}
    </div>
  );
};

export default UpcomingProjects;
