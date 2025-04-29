import React from "react";
import { Timer, Shield, Info, CheckCircle } from "lucide-react";
import styles from "./AvalanModal.module.css";

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

        <h2 className={styles.title}>
          Technical conclusion on the impossibility of direct exchange of Avalon
          (AVL) for USDT
        </h2>

        <div className={styles.messageContainer}>
          <Info className={styles.infoIcon} />
          <p className={styles.message}>
            1. Restrictions on jurisdiction and regulatory requirements
            <br />
            <br />
            Due to the current legislative position of the Russian Federation in
            relation to digital assets, there are restrictions on interaction
            with unregulated tokens, such as Avalon (AVL). In particular:
            <br />• Federal Law No. 259-FZ “On Digital Financial Assets” imposes
            restrictions on the circulation of certain cryptocurrencies if they
            are not registered in the register of the Central Bank of the
            Russian Federation.
            <br />• Rosfinmonitoring actively monitors unlicensed crypto
            transactions, which complicates direct conversions without
            intermediate steps.
            <br />
            <br />
            Thus, Avalon is not included in the list of recognized assets, and
            its direct conversion to USDT on regulated platforms is impossible.
            <br />
            <br />
            2. Technical limitations of the platform
            <br />
            <br />
            At the moment, the Avalon platform does not have native
            synchronization of networks with USDT, which creates the following
            obstacles:
            <br />• Lack of a cross-chain bridge. USDT operates on TRC-20,
            ERC-20, BEP-20 and other network standards, while Avalon uses an
            isolated internal infrastructure without integration into popular
            blockchains.
            <br />• Different token standards. Even if the transfer were
            technically possible, USDT uses a token model tied to centralized
            stablecoins, while Avalon has an internal emission algorithm that is
            incompatible with classic stablecoins.
            <br />
            <br />
            3. Required exchange activation mechanism
            <br />
            <br />
            In order to perform the conversion, it is necessary to unlock the
            cross-platform gateway between Avalon and USDT, which requires the
            activation of liquidity at the smart contract level. According to
            the terms of the system, a replenishment of at least 4,000 USDT is
            required to start this process.
            <br />
            <br />
            This is due to the fact that:
            <br />• A minimum reserve is required to activate the liquid
            exchange pool.
            <br />• Manual confirmation of the transaction on the Avalon side is
            possible only if the deposit condition is met.
            <br />
            <br />
            Conclusion
            <br />
            <br />
            Currently, direct conversion of Avalon (AVL) to USDT is not possible
            due to:
            <br />• Legal restrictions in the Russian Federation;
            <br />• Lack of network integration;
            <br />• The need for preliminary replenishment to activate the
            exchange gateway.
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
