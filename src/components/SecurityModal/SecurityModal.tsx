import styles from "./SecurityModal.module.css";

const SecurityModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>Security at Arkinvest</h2>
        <div className={styles.modalBody}>
          <p>
            At Arkinvest, we understand that security is a top priority for all
            participants on our platform. We strive to ensure the maximum
            protection of your data, funds, and transactions by utilizing the
            most advanced technologies and approaches.
          </p>

          <h3>What Makes Arkinvest a Secure Platform?</h3>

          <h4>1. Multi-Level Data Protection</h4>
          <p>
            We have implemented advanced encryption technologies to protect your
            personal information and transactions. All user data is stored in
            encrypted form, preventing unauthorized access.
          </p>

          <h4>2. KYC and AML Procedures</h4>
          <p>
            To prevent fraud and comply with international standards, we conduct
            thorough verification of platform participants.
          </p>

          <h4>3. Audited Smart Contracts</h4>
          <p>
            All projects hosted on our platform use verified smart contracts.
            Each contract undergoes an audit before launch.
          </p>

          <h4>4. Wallet Protection</h4>
          <p>
            Your funds are always under your control. We support decentralized
            wallets and recommend enabling two-factor authentication (2FA).
          </p>

          <h4>5. Activity Monitoring</h4>
          <p>
            Our system continuously monitors suspicious activities on the
            platform to quickly respond to potential threats.
          </p>

          <h4>6. Transaction Transparency</h4>
          <p>
            All transactions on Arkinvest are fully transparent and recorded on
            the blockchain.
          </p>

          <h4>7. Backup and Attack Protection</h4>
          <p>
            Our servers are protected against DDoS attacks and other cyber
            threats. We regularly create data backups.
          </p>

          <h3>Recommendations for Users</h3>
          <ul>
            <li>Never share your account credentials with third parties.</li>
            <li>Use strong passwords and activate 2FA.</li>
            <li>Always check the website address before logging in.</li>
          </ul>

          <p>
            At Arkinvest, security is not just a standard—it is our philosophy.
          </p>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SecurityModal;
