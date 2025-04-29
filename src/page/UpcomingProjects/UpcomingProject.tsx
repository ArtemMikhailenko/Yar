import { useEffect, useRef, useState } from "react";
import styles from "./UpcomingProjects.module.css";
import { useParams } from "react-router-dom";
import BuyTokenModal from "../../components/BuyTokenModal/BuyTokenModal";

interface TokenDistribution {
  category: string;
  percentage: number;
  lockupPeriod?: string;
}

interface TokenMetrics {
  initialMarketCap: number;
  fullyDilutedValue: number;
  totalSupply: number;
}

interface ProjectFeature {
  title: string;
  description: string;
}

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
  longDescription?: string;
  features?: ProjectFeature[];
  tokenMetrics?: TokenMetrics;
  tokenDistribution?: TokenDistribution[];
  roadmap?: string[];
  team?: {
    name: string;
    role: string;
    bio: string;
  }[];
}

interface UpcomingProjectProps {
  project: UpcomingProject;
  onBuy: (project: UpcomingProject) => void;
}

const UpcomingProject: React.FC<UpcomingProjectProps> = ({
  project,
  onBuy,
}) => {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const projectContent = {
    "Ondo AI": {
      longDescription: `Ondo AI is revolutionizing the artificial intelligence landscape by creating a decentralized computing infrastructure that harnesses the power of blockchain technology. Our platform enables users to share and monetize computational resources while participating in the growth of AI technologies.

      The project addresses the growing demand for AI computing power by creating a decentralized network where users can contribute their computing resources and earn rewards. This innovative approach not only democratizes access to AI infrastructure but also creates a more sustainable and efficient ecosystem for AI development.`,
      features: [
        {
          title: "Decentralized Computing",
          description:
            "Share computational resources across a distributed network",
        },
        {
          title: "Resource Optimization",
          description:
            "AI-powered allocation of computing resources for maximum efficiency",
        },
        {
          title: "Reward Mechanism",
          description:
            "Earn tokens by contributing to the network's computing power",
        },
      ],
      tokenMetrics: {
        initialMarketCap: 2000000,
        fullyDilutedValue: 20000000,
        totalSupply: 100000000,
      },
      tokenDistribution: [
        { category: "Public Sale", percentage: 15, lockupPeriod: "None" },
        { category: "Team", percentage: 20, lockupPeriod: "24 months" },
        { category: "Ecosystem", percentage: 35, lockupPeriod: "12 months" },
        { category: "Treasury", percentage: 30, lockupPeriod: "36 months" },
      ],
    },
    "Avalanche AI": {
      longDescription: `Avalanche AI is building the future of decentralized artificial intelligence by leveraging the high-performance capabilities of the Avalanche network. Our platform combines the speed and scalability of Avalanche with cutting-edge AI technologies to create a powerful ecosystem for decentralized applications.

      The project focuses on creating AI-powered solutions for gaming, DeFi, and other Web3 applications, enabling developers to integrate sophisticated AI capabilities into their projects seamlessly.`,
      features: [
        {
          title: "High-Performance AI",
          description: "Leveraging Avalanche's speed for AI computations",
        },
        {
          title: "Cross-Chain Integration",
          description: "Seamless AI services across multiple blockchains",
        },
        {
          title: "Gaming AI Solutions",
          description: "Advanced AI for next-generation blockchain games",
        },
      ],
      tokenMetrics: {
        initialMarketCap: 1750000,
        fullyDilutedValue: 17500000,
        totalSupply: 50000000,
      },
      tokenDistribution: [
        { category: "Public Sale", percentage: 20, lockupPeriod: "None" },
        { category: "Team", percentage: 15, lockupPeriod: "24 months" },
        { category: "Ecosystem", percentage: 40, lockupPeriod: "12 months" },
        { category: "Treasury", percentage: 25, lockupPeriod: "36 months" },
      ],
    },
    Lympid: {
      longDescription: `Lympid is revolutionizing the DeFi landscape with its innovative liquid staking solutions that work seamlessly across multiple blockchain networks. Our protocol enables users to stake their assets while maintaining liquidity, solving one of the fundamental challenges in the staking ecosystem.

      The platform introduces advanced DeFi protocols that optimize yield generation while minimizing risk through sophisticated algorithms and smart contract architecture.`,
      features: [
        {
          title: "Cross-Chain Staking",
          description: "Stake assets across multiple blockchain networks",
        },
        {
          title: "Liquid Staking Derivatives",
          description: "Maintain liquidity while earning staking rewards",
        },
        {
          title: "Yield Optimization",
          description: "Automated strategies for maximum staking returns",
        },
      ],
      tokenMetrics: {
        initialMarketCap: 2250000,
        fullyDilutedValue: 22500000,
        totalSupply: 75000000,
      },
      tokenDistribution: [
        { category: "Public Sale", percentage: 25, lockupPeriod: "None" },
        { category: "Team", percentage: 18, lockupPeriod: "24 months" },
        { category: "Ecosystem", percentage: 32, lockupPeriod: "12 months" },
        { category: "Treasury", percentage: 25, lockupPeriod: "36 months" },
      ],
    },
  };

  const projectDetails =
    projectContent[project.name as keyof typeof projectContent];

  return (
    <div className={styles.projectContainer}>
      <div className={styles.heroSection}>
        <div className={styles.bannerWrapper}>
          <img
            src={project.bannerUrl}
            alt={project.name}
            className={styles.bannerImage}
          />
        </div>

        <div className={styles.projectHeader}>
          <div className={styles.logoWrapper}>
            <img
              src={project.logoUrl}
              alt={`${project.name} logo`}
              className={styles.logo}
            />
          </div>
          <div className={styles.headerContent}>
            <h1 className={styles.projectName}>{project.name}</h1>
            <div className={styles.projectMeta}>
              <span className={styles.chain}>{project.chain}</span>
              <span className={styles.status}>
                {project.name === "Avalanche AI" ? "Active" : project.status}
              </span>
            </div>
          </div>
          {project.name === "Avalanche AI" && (
            <div className={styles.buySection}>
              <div className={styles.priceTag}>$0.3 per token</div>
              <div className={styles.countdown}>
                Time remaining: {timeLeft.days}d {timeLeft.hours}h{" "}
                {timeLeft.minutes}m {timeLeft.seconds}s
              </div>
              <button
                onClick={() => onBuy(project)}
                className={styles.buyButton}
              >
                Buy Tokens
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.mainContent}>
        <section className={styles.overviewSection}>
          <h3>Project Overview</h3>
          <p className={styles.overviewParagraph}>{project.description}</p>
          {projectDetails?.longDescription && (
            <p className={styles.overviewParagraph}>
              {projectDetails.longDescription}
            </p>
          )}
        </section>

        {projectDetails?.features && (
          <section className={styles.featuresSection}>
            <h3>Key Features</h3>
            <div className={styles.featuresList}>
              {projectDetails.features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {projectDetails?.tokenMetrics && (
          <section className={styles.tokenomicsSection}>
            <h3>Tokenomics</h3>
            <div className={styles.tokenomicsGrid}>
              <div className={styles.tokenMetric}>
                <span>Initial Market Cap</span>
                <strong>
                  {formatCurrency(projectDetails.tokenMetrics.initialMarketCap)}
                </strong>
              </div>
              <div className={styles.tokenMetric}>
                <span>Fully Diluted Value</span>
                <strong>
                  {formatCurrency(
                    projectDetails.tokenMetrics.fullyDilutedValue
                  )}
                </strong>
              </div>
              <div className={styles.tokenMetric}>
                <span>Total Supply</span>
                <strong>
                  {projectDetails.tokenMetrics.totalSupply.toLocaleString()}
                </strong>
              </div>
            </div>

            {projectDetails?.tokenDistribution && (
              <div className={styles.distributionSection}>
                <h4>Token Distribution</h4>
                <div className={styles.distributionGrid}>
                  {projectDetails.tokenDistribution.map((item, index) => (
                    <div key={index} className={styles.distributionItem}>
                      <span>{item.category}</span>
                      <strong>{item.percentage}%</strong>
                      {item.lockupPeriod && (
                        <span className={styles.lockupPeriod}>
                          Lock-up: {item.lockupPeriod}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        <div className={styles.projectDetails}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Start Date</span>
            <span className={styles.value}>
              {formatDate(project.startDate)}
            </span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.label}>Time Until Start</span>
            <span className={styles.value}>{project.timeUntilStart}</span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.label}>Target Raise</span>
            <span className={styles.value}>
              {formatCurrency(project.targetRaise)}
            </span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.label}>Total Participants</span>
            <span className={styles.value}>
              {project.totalParticipants.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const UpcomingProjectDetails = () => {
  const { tokenId } = useParams<{ tokenId: string }>();
  const [project, setProject] = useState<UpcomingProject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const timerRef = useRef<NodeJS.Timeout>();
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<UpcomingProject | null>(null);
  useEffect(() => {
    const fetchTokenDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/projects/${tokenId}`);
        if (!response.ok) throw new Error("Failed to fetch token details");
        const data = await response.json();
        setProject(data);
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
  }, [tokenId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!project) return <p>No project found</p>;
  const handleBuy = (project: UpcomingProject) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to purchase tokens!");
      return;
    }
    setSelectedProject(project);
    setShowModal(true);
  };
  return (
    <>
      <UpcomingProject project={project} onBuy={handleBuy} />
      {showModal && selectedProject && (
        <BuyTokenModal
          project={selectedProject}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

const UpcomingProjects: React.FC<{ projects: UpcomingProject[] }> = ({
  projects = [],
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<UpcomingProject | null>(null);

  const handleBuy = (project: UpcomingProject) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to purchase tokens!");
      return;
    }
    setSelectedProject(project);
    setShowModal(true);
  };

  return (
    <div>
      {projects.map((project) => (
        <UpcomingProject key={project.id} project={project} onBuy={handleBuy} />
      ))}
      {showModal && selectedProject && (
        <BuyTokenModal
          project={selectedProject}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export { UpcomingProjects, UpcomingProjectDetails };
export default UpcomingProjects;
