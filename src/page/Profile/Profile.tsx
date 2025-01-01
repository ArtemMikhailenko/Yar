import { Mail, MapPin, ExternalLink, Settings, LogOut } from 'lucide-react';
import styles from './Profile.module.css';

const Profile = () => {
  const stats = [
    { label: 'Total Balance', value: '$125,400' },
    { label: 'Active Stakes', value: '12' },
    { label: 'Total Profit', value: '+$45,200' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.headerCard}>
        <div className={styles.profileHeader}>
          <div className={styles.headerContent}>
            <div className={styles.avatarWrapper}>
              <img 
                src="/api/placeholder/120/120" 
                alt="Profile" 
                className={styles.avatar}
              />
              <div className={styles.status}></div>
            </div>
            
            <div className={styles.userInfo}>
              <div className={styles.nameWrapper}>
                <h1>Alex Thompson</h1>
                <span className={styles.badge}>PRO</span>
              </div>
              <div className={styles.userMeta}>
                <p>
                  <Mail size={16} />
                  alex.thompson@example.com
                </p>
                <p>
                  <MapPin size={16} />
                  Los Angeles, CA
                </p>
              </div>
            </div>
            
            <div className={styles.actions}>
              <button className={styles.actionButton}>
                <Settings size={18} />
              </button>
              <button className={`${styles.actionButton} ${styles.logoutButton}`}>
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
                <h3>ETH Staking Pool</h3>
                <span>Active Investment</span>
              </div>
            </div>
            <button className={styles.detailsButton}>
              View Details
              <ExternalLink size={16} />
            </button>
          </div>
          <div className={styles.investStats}>
            <div>
              <span className={styles.label}>Staked Amount</span>
              <span className={styles.value}>32 ETH</span>
            </div>
            <div>
              <span className={styles.label}>APR</span>
              <span className={`${styles.value} ${styles.positive}`}>5.2%</span>
            </div>
            <div>
              <span className={styles.label}>Duration</span>
              <span className={styles.value}>12 months</span>
            </div>
          </div>
        </div>

        <div className={styles.investCard}>
          <div className={styles.investHeader}>
            <div className={styles.investTitle}>
              <div className={`${styles.tokenIcon} ${styles.solana}`}>S</div>
              <div>
                <h3>SOL Yield Farm</h3>
                <span>Active Investment</span>
              </div>
            </div>
            <button className={styles.detailsButton}>
              View Details
              <ExternalLink size={16} />
            </button>
          </div>
          <div className={styles.investStats}>
            <div>
              <span className={styles.label}>Staked Amount</span>
              <span className={styles.value}>1,500 SOL</span>
            </div>
            <div>
              <span className={styles.label}>APR</span>
              <span className={`${styles.value} ${styles.positive}`}>7.8%</span>
            </div>
            <div>
              <span className={styles.label}>Duration</span>
              <span className={styles.value}>6 months</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;