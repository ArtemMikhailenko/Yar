import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./InvestmentsSection.module.css";
import logo from "../../assets/logo-bull.png";

// Определение интерфейса для данных о токене
interface Token {
  id: string;
  name: string;
  symbol: string;
  logoUrl: string;
  fundRaised: string;
  soldPercentage: string;
  roi: string;
  description: string;
  chain: string;
  endDate?: string;
}

const InvestmentsSection = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/projects`);
        console.log(response);

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data: Token[] = await response.json();

        // Сортировка по дате (последние проекты)
        const sortedProjects = data
          .sort(
            (a, b) =>
              new Date(b.endDate || "").getTime() -
              new Date(a.endDate || "").getTime()
          )
          .slice(0, 3);

        setTokens(sortedProjects);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching project data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(`.${styles.card}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.show);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [tokens]);

  // Добавлен явный тип string для параметра
  const handleViewToken = (tokenName: string) => {
    navigate(`/token/${encodeURIComponent(tokenName)}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 text-center">
        Error loading tokens: {error}
      </div>
    );
  }

  return (
    <section className={styles.investments} ref={sectionRef}>
      <h2 className={styles.title}>Latest Investments</h2>
      <div className={styles.container}>
        {tokens.map((token) => (
          <div key={token.id} className={styles.card}>
            <div className={styles.header}>
              <img
                src={token.logoUrl || logo}
                alt={`${token.name} Logo`}
                className={styles.avatar}
              />
              <h3>
                {token.name} ({token.symbol})
              </h3>
            </div>
            <div className={styles.details}>
              <p>
                <strong>Liquidity:</strong> {token.fundRaised}
              </p>
              <p>
                <strong>24h Volume/Liquidity:</strong> {token.soldPercentage}
              </p>
              <p>
                <strong>24h Change:</strong> {token.roi}
              </p>
            </div>
            <p className={styles.description}>{token.description}</p>
            <button
              className={styles.viewButton}
              onClick={() => handleViewToken(token.name)}
            >
              View
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InvestmentsSection;
