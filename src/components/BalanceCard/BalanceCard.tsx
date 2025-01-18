// BalanceCard.tsx
import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  DollarSign,
  Activity,
} from "lucide-react";
import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "./BalanceCard.module.css";
import DepositModal from "../DepositModal/DepositModal";
import WithdrawalModal from "../WithdrawalModal/WithdrawalModal";
import { User } from "../../types/header/header";

// interface BalanceCardProps {
//   balance: number;
// }

const BalanceCard: React.FC = () => {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const userData = localStorage.getItem("user");
  const [user, setUser] = useState<User | null>(null);

  const openDepositModal = () => setIsDepositModalOpen(true);
  const closeDepositModal = () => setIsDepositModalOpen(false);
  useEffect(() => {
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [userData]);
  return (
    <div className={styles.card}>
      <div className={styles.mainContent}>
        <div className={styles.balanceSection}>
          <div className={styles.balanceHeader}>
            <div className={styles.balanceInfo}>
              <span className={styles.label}>Total Balance</span>
              <div className={styles.balanceAmount}>
                <DollarSign className={styles.dollarIcon} />
                <h1 className={styles.balance}>{user?.balance}</h1>
                <span className={styles.currency}>USD</span>
              </div>
            </div>
            <div className={styles.statsContainer}>
              <div className={styles.stat}>
                <Activity className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>24h Change</span>
                  <span className={styles.statValue}>0%</span>
                </div>
              </div>
              <div className={styles.stat}>
                <TrendingUp className={styles.statIcon} />
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Monthly Growth</span>
                  <span className={styles.statValue}>0%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.actionsContainer}>
        <div className={styles.actionButtons}>
          <button
            className={`${styles.actionButton} ${styles.depositButton}`}
            onClick={openDepositModal}
          >
            <ArrowUpRight className={styles.actionIcon} />
            <span>Deposit</span>
          </button>
          {/* <button className={`${styles.actionButton} ${styles.swapButton}`}>
            <RefreshCcw className={styles.actionIcon} />
            <span>Swap</span>
          </button> */}
          <button
            className={`${styles.actionButton} ${styles.withdrawButton}`}
            onClick={() => setIsWithdrawalModalOpen(true)}
          >
            <ArrowDownRight className={styles.actionIcon} />
            <span>Withdraw</span>
          </button>
        </div>
        <div className={styles.connectWalletWrapper}>
          <ConnectWallet />
        </div>
      </div>

      {isDepositModalOpen && <DepositModal onClose={closeDepositModal} />}
      {isWithdrawalModalOpen && (
        <WithdrawalModal onClose={() => setIsWithdrawalModalOpen(false)} />
      )}
    </div>
  );
};

export default BalanceCard;
