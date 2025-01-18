import React from "react";
import { Timer, Shield, Info, CheckCircle } from "lucide-react";
import styles from "./WithdrawalModal.module.css";

interface WithdrawalModalProps {
  onClose: () => void;
}

const WithdrawalModal: React.FC<WithdrawalModalProps> = ({ onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <div className={styles.iconWrapper}>
          <Timer className={styles.timerIcon} />
        </div>

        <h2 className={styles.title}>Withdrawal Schedule Notice</h2>

        <div className={styles.messageContainer}>
          <Info className={styles.infoIcon} />
          <p className={styles.message}>
            Your funds are safely secured. Withdrawals will be enabled
            automatically after the IDO completion.
          </p>
        </div>

        <div className={styles.securitySection}>
          <Shield className={styles.shieldIcon} />
          <h3 className={styles.securityTitle}>Your Investment is Protected</h3>
          <p className={styles.securityText}>
            All funds are held in an audited smart contract with
            industry-standard security measures.
          </p>
        </div>

        <div className={styles.infoBox}>
          <h3 className={styles.infoTitle}>What to Expect:</h3>
          <ul className={styles.infoList}>
            <li>
              <CheckCircle className={styles.checkIcon} />
              <span>Your funds are securely stored and fully guaranteed</span>
            </li>
            <li>
              <CheckCircle className={styles.checkIcon} />
              <span>Automatic withdrawal activation after IDO completion</span>
            </li>
            <li>
              <CheckCircle className={styles.checkIcon} />
              <span>Email notification when withdrawals are available</span>
            </li>
          </ul>
        </div>

        <button className={styles.understoodButton} onClick={onClose}>
          Got It, Thanks
        </button>
      </div>
    </div>
  );
};

export default WithdrawalModal;
