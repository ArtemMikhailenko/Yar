import styles from "./SecurityModal.module.css";

const SecurityModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>Security at In4fin</h2>
        <div className={styles.modalBody}>
          <p>
            At In4fin, we understand that security is a top priority for all
            participants of our platform. We strive to provide maximum
            protection for your data, funds, and transactions by utilizing the
            most advanced technologies and approaches.
          </p>

          <h3>What Makes In4fin a Secure Platform?</h3>

          <h4>1. Multi-Level Data Protection</h4>
          <p>
            We have implemented advanced encryption technologies to protect your
            personal information and transactions. All user data is stored in
            encrypted form, which prevents unauthorized access.
          </p>

          <h4>2. KYC and AML Procedures</h4>
          <p>
            To protect against fraud and comply with international standards, we
            conduct thorough verification of platform participants. This
            minimizes risks and ensures the reliability of all operations.
          </p>

          <h4>3. Audited Smart Contracts</h4>
          <p>
            All projects hosted on our platform use verified smart contracts.
            Each contract undergoes an audit prior to launch to prevent
            vulnerabilities.
          </p>

          <h4>4. Wallet Protection</h4>
          <p>
            Your funds are always under your control. We support the use of
            decentralized wallets and recommend two-factor authentication (2FA)
            for additional protection.
          </p>

          <h4>5. Activity Monitoring</h4>
          <p>
            Our system continuously monitors suspicious activities on the
            platform in order to respond quickly to potential threats.
          </p>

          <h4>6. Transaction Transparency</h4>
          <p>
            All transactions taking place on In4fin are completely transparent
            and recorded on the blockchain. This eliminates the possibility of
            manipulation and ensures trust between participants.
          </p>

          <h4>7. Backups and Attack Protection</h4>
          <p>
            Our servers are protected against DDoS attacks and other cyber
            threats. We regularly create backups of data to ensure their safety
            in case of unforeseen circumstances.
          </p>

          <h3>Recommendations for Users</h3>
          <ul>
            <li>Never share your account credentials with third parties.</li>
            <li>Use strong passwords and enable 2FA.</li>
            <li>Always verify the website address before logging in.</li>
          </ul>

          <p>
            At In4fin, security is not just a standard—it is our philosophy. We
            do everything possible so that you can focus on the success of your
            projects and investments without worrying about risks.
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
