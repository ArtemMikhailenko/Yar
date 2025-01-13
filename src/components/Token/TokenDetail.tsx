import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./TokenDetail.module.css";
interface Token {
  _id: string;
  name: string;
  symbol: string;
  logoUrl: string;
  totalRaised: number;
  participants: number;
  athSinceIDO: string;
  chain: string;
  type: string;
  endDate: string;
  description: string;
}

// interface TimeRemaining {
//   total: number;
//   days: number;
//   hours: number;
//   minutes: number;
// }
const TokenDetail = () => {
  const { tokenId } = useParams<{ tokenId: string }>();
  const [token, setToken] = useState<Token | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const mainCardRef = useRef<HTMLDivElement | null>(null);
  const statsCardRefs = useRef<HTMLDivElement[]>([]);
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:1024";

  useEffect(() => {
    const fetchTokenDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/projects/${tokenId}`);
        if (!response.ok) throw new Error("Failed to fetch token details");
        const data = await response.json();
        setToken(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenDetails();
  }, [tokenId]);

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      if (mainCardRef.current) {
        const { left, top, width, height } =
          mainCardRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        mainCardRef.current.style.setProperty("--mouse-x", x.toFixed(2));
        mainCardRef.current.style.setProperty("--mouse-y", y.toFixed(2));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const getTimeRemaining = (endDate: any) => {
    //@ts-ignore
    const total = Date.parse(endDate) - Date.parse(new Date());
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return { total, days, hours, minutes };
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingEffect}>
            <div className={styles.loadingDot}></div>
            <div className={styles.loadingDot}></div>
            <div className={styles.loadingDot}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.errorCard}>
            <div className={styles.errorIcon}>!</div>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!token) return null;

  const timeRemaining = getTimeRemaining(token.endDate);

  return (
    <div className={styles.page}>
      <div className={styles.galaxyBackground}>
        <div className={styles.stars}></div>
        <div className={styles.twinkling}></div>
        <div className={styles.clouds}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.mainCard} ref={mainCardRef}>
          <div className={styles.cardGlow}></div>

          <div className={styles.header}>
            <div className={styles.logoSection}>
              <div className={styles.logoContainer}>
                <div className={styles.logoWrapper}>
                  <div className={styles.logoHologram}></div>
                  <img
                    src={token.logoUrl}
                    alt={`${token.name} logo`}
                    className={styles.logo}
                  />
                </div>
                <div className={styles.logoRing}></div>
              </div>

              <div className={styles.tokenInfo}>
                <h1 className={styles.title}>{token.name}</h1>
                <div className={styles.symbolWrapper}>
                  <div className={styles.symbolContainer}>
                    <span className={styles.symbol}>{token.symbol}</span>
                    <div className={styles.symbolGlow}></div>
                  </div>
                  <div className={styles.chainBadgeContainer}>
                    <span className={styles.chainBadge}>
                      <span className={styles.chainDot}></span>
                      {token.chain}
                    </span>
                    <div className={styles.chainGlow}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.statusSection}>
              <div
                className={`${styles.statusBadge} ${
                  timeRemaining.total > 0 ? styles.active : styles.ended
                }`}
              >
                <div className={styles.statusIcon}></div>
                <span>{timeRemaining.total > 0 ? "Active" : "Ended"}</span>
              </div>

              {timeRemaining.total > 0 && (
                <div className={styles.timeContainer}>
                  <div className={styles.timeGlow}></div>
                  <div className={styles.timeRemaining}>
                    {[
                      { value: timeRemaining.days, label: "days" },
                      { value: timeRemaining.hours, label: "hours" },
                      { value: timeRemaining.minutes, label: "min" },
                    ].map((time, index) => (
                      <div key={index} className={styles.timeBlock}>
                        <span className={styles.timeNumber}>{time.value}</span>
                        <span className={styles.timeLabel}>{time.label}</span>
                        <div className={styles.timeBlockGlow}></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={styles.statsContainer}>
            <div className={styles.statsGrid}>
              <div
                className={styles.statsCard}
                //@ts-ignore
                ref={(el) => (statsCardRefs.current[0] = el)}
              >
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>
                    <span>Sale Statistics</span>
                    <div className={styles.titleLine}></div>
                  </h3>
                  <div className={styles.statsList}>
                    {[
                      {
                        label: "Total Raised",
                        value: formatNumber(token.totalRaised),
                        icon: "💰",
                      },
                      {
                        label: "Participants",
                        value: token.participants.toLocaleString(),
                        icon: "👥",
                      },
                      {
                        label: "ATH Since IDO",
                        value: token.athSinceIDO || "TBA",
                        icon: "📈",
                      },
                    ].map((stat, index) => (
                      <div key={index} className={styles.statItem}>
                        <div className={styles.statIcon}>{stat.icon}</div>
                        <span className={styles.statLabel}>{stat.label}</span>
                        <span className={styles.statValue}>{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.cardBackdrop}></div>
              </div>

              <div
                className={styles.statsCard}
                //@ts-ignore
                ref={(el) => (statsCardRefs.current[1] = el)}
              >
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>
                    <span>Token Info</span>
                    <div className={styles.titleLine}></div>
                  </h3>
                  <div className={styles.statsList}>
                    {[
                      {
                        label: "Type",
                        value: token.type,
                        icon: "🏷️",
                      },
                      {
                        label: "Chain",
                        value: token.chain,
                        icon: "⛓️",
                      },
                      {
                        label: "End Date",
                        value: new Date(token.endDate).toLocaleDateString(),
                        icon: "📅",
                      },
                    ].map((stat, index) => (
                      <div key={index} className={styles.statItem}>
                        <div className={styles.statIcon}>{stat.icon}</div>
                        <span className={styles.statLabel}>{stat.label}</span>
                        <span className={styles.statValue}>{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.cardBackdrop}></div>
              </div>
            </div>

            <div className={styles.descriptionCard}>
              <h3 className={styles.cardTitle}>
                <span>About {token.name}</span>
                <div className={styles.titleLine}></div>
              </h3>
              <p className={styles.description}>{token.description}</p>
              <div className={styles.descriptionGlow}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDetail;
