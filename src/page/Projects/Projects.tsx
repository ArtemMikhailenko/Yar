import { useState, useEffect } from "react";
import styles from "./Projects.module.css";

interface TokenData {
  id: string;
  name: string;
  symbol: string;
  type: string;
  participants: number;
  totalRaised: string;
  athSinceIdo: string;
  endedIn: string;
  chain: string;
  logo: string;
  chainIcon: string;
}

const Projects = () => {
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
        );
        const data = await response.json();
        const formattedData = data.slice(0, 10).map((item: any) => ({
          id: item.id,
          name: item.name,
          symbol: item.symbol.toUpperCase(),
          type: "TOKEN SALE",
          participants: Math.floor(Math.random() * 1000),
          totalRaised: `$${item.market_cap.toLocaleString()}`,
          athSinceIdo:
            Math.random() > 0.5
              ? `+${Math.floor(Math.random() * 500)}%`
              : "TBA",
          endedIn: "N/A",
          chain: "Ethereum",
          logo: item.image,
          chainIcon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        }));
        setTokens(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tokens:", error);
        setLoading(false);
      }
    };
    fetchTokens();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Recently Created Tokens</h1>
      {loading ? (
        <p>Loading tokens...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Type</th>
              <th>Participants</th>
              <th>Total Raised</th>
              <th>ATH Since IDO</th>
              <th>Ended In</th>
              <th>Chain</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token) => (
              <tr key={token.id}>
                <td>
                  <div className={styles.projectName}>
                    <img
                      src={token.logo}
                      alt={token.name}
                      className={styles.projectLogo}
                    />
                    {token.name}
                  </div>
                </td>
                <td>
                  <span className={styles.tokenType}>{token.type}</span>
                </td>
                <td>{token.participants}</td>
                <td>{token.totalRaised}</td>
                <td>
                  {token.athSinceIdo !== "TBA" ? (
                    <span className={styles.athBadge}>{token.athSinceIdo}</span>
                  ) : (
                    "TBA"
                  )}
                </td>
                <td>{token.endedIn}</td>
                <td>
                  <img
                    src={token.chainIcon}
                    alt={token.chain}
                    className={styles.chainIcon}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Projects;
