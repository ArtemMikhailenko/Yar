import { Mail, LogOut } from "lucide-react";
import styles from "./Profile.module.css";
import { useEffect, useState } from "react";
import { User } from "../../types/header/header";
import logo from "../../assets/logo-bull.png";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  // const BASE_URL = import.meta.env.VITE_BASE_URL;
  const userData = localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [userData]);
  const stats = [
    { label: "Total Balance", value: "0" },
    { label: "Projects", value: "0" },
    { label: "Total Profit", value: "0" },
  ];
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };
  return (
    <div className={styles.container}>
      <div className={styles.headerCard}>
        <div className={styles.profileHeader}>
          <div className={styles.headerContent}>
            <div className={styles.avatarWrapper}>
              <img src={logo} alt="Profile" className={styles.avatar} />
              <div className={styles.status}></div>
            </div>

            <div className={styles.userInfo}>
              <div className={styles.nameWrapper}>
                <h1>{user?.fullName}</h1>
              </div>
              <div className={styles.userMeta}>
                <p>
                  <Mail size={16} />
                  {user?.email}
                </p>
              </div>
            </div>

            <div className={styles.actions}>
              <button
                className={`${styles.actionButton} ${styles.logoutButton}`}
                onClick={handleLogout}
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.investmentCards}>
        <div className={styles.investCard}>
          <div className={styles.investHeader}>
            <div className={styles.investTitle}>
              <div className={styles.tokenIcon}>Ξ</div>
              <div>
                <h3>USDT</h3>
                <span>Active Investment</span>
              </div>
            </div>
            {/* <button className={styles.detailsButton}>
              View Details
              <ExternalLink size={16} />
            </button> */}
          </div>
          <div className={styles.investStats}>
            <div>
              <span className={styles.label}>Staked Amount</span>
              <span className={styles.value}>0 USDT</span>
            </div>
            <div>
              <span className={styles.label}>APR</span>
              <span className={`${styles.value} ${styles.positive}`}>0%</span>
            </div>
            <div>
              <span className={styles.label}>Duration</span>
              <span className={styles.value}>None</span>
            </div>
          </div>
        </div>

        <div className={styles.investCard}>
          <div className={styles.investHeader}>
            <div className={styles.investTitle}>
              <div className={`${styles.tokenIcon} ${styles.solana}`}>B</div>
              <div>
                <h3>BTC</h3>
                <span>Active Investment</span>
              </div>
            </div>
            {/* <button className={styles.detailsButton}>
              View Details
              <ExternalLink size={16} />
            </button> */}
          </div>
          <div className={styles.investStats}>
            <div>
              <span className={styles.label}>Staked Amount</span>
              <span className={styles.value}>0 BTC</span>
            </div>
            <div>
              <span className={styles.label}>APR</span>
              <span className={`${styles.value} ${styles.positive}`}>0%</span>
            </div>
            <div>
              <span className={styles.label}>Duration</span>
              <span className={styles.value}>None</span>
            </div>
          </div>
        </div>
        <div className={styles.investCard}>
          <div className={styles.investHeader}>
            <div className={styles.investTitle}>
              <div className={`${styles.tokenIcon} ${styles.solana}`}>E</div>
              <div>
                <h3>ETH</h3>
                <span>Active Investment</span>
              </div>
            </div>
            {/* <button className={styles.detailsButton}>
              View Details
              <ExternalLink size={16} />
            </button> */}
          </div>
          <div className={styles.investStats}>
            <div>
              <span className={styles.label}>Staked Amount</span>
              <span className={styles.value}>0 ETH</span>
            </div>
            <div>
              <span className={styles.label}>APR</span>
              <span className={`${styles.value} ${styles.positive}`}>0%</span>
            </div>
            <div>
              <span className={styles.label}>Duration</span>
              <span className={styles.value}>None</span>
            </div>
          </div>
        </div>
        <div className={styles.investCard}>
          <div className={styles.investHeader}>
            <div className={styles.investTitle}>
              <div className={`${styles.tokenIcon} ${styles.solana}`}>A</div>
              <div>
                <h3>AVL</h3>
                <span>Active Investment</span>
              </div>
            </div>
            {/* <button className={styles.detailsButton}>
              View Details
              <ExternalLink size={16} />
            </button> */}
          </div>
          <div className={styles.investStats}>
            <div>
              <span className={styles.label}>Staked Amount</span>
              <span className={styles.value}>0 AVL</span>
            </div>
            <div>
              <span className={styles.label}>APR</span>
              <span className={`${styles.value} ${styles.positive}`}>0%</span>
            </div>
            <div>
              <span className={styles.label}>Duration</span>
              <span className={styles.value}>None</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
