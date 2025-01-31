import styles from "./TermsModal.module.css";

const TermsModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>Terms and Service</h2>
        <div className={styles.modalBody}>
          <p>
            <strong>Last Updated:</strong> [Specify Date]
          </p>

          <h3>1. General Provisions</h3>
          <h4>1.1. Agreement to Terms</h4>
          <p>
            By registering, accessing, and using the Platform, you fully agree
            to this Agreement. If you do not agree to any terms, you must cease
            using the Platform immediately.
          </p>

          <h4>1.2. Changes to Terms</h4>
          <p>
            We reserve the right to modify this Agreement without prior notice.
            Updated versions will be published on the Platform, and it is your
            responsibility to review changes regularly.
          </p>

          <h3>2. Registration Requirements</h3>
          <h4>2.1. Age Restrictions</h4>
          <p>You must be at least 18 years old to use the Platform.</p>

          <h4>2.2. Information Accuracy</h4>
          <p>
            You agree to provide accurate and up-to-date information upon
            registration.
          </p>

          <h4>2.3. Account Security</h4>
          <p>
            You are responsible for maintaining the confidentiality of your
            account details and all activities conducted under your account.
          </p>

          <h3>3. Use of the Platform</h3>
          <h4>3.1. Purpose of Use</h4>
          <p>
            The Platform is intended for hosting and promoting crypto projects,
            participating in token sales (IDO, IEO), and related activities.
          </p>

          <h4>3.2. Prohibited Activities</h4>
          <ul>
            <li>
              Engaging in illegal or fraudulent activities on the Platform.
            </li>
            <li>Violating intellectual property or copyright laws.</li>
            <li>Attempting to hack, disrupt, or damage the Platform.</li>
          </ul>

          <h4>3.3. Service Termination</h4>
          <p>
            We reserve the right to suspend or terminate access to the Platform
            in case of any violations of this Agreement.
          </p>

          <h3>4. Financial Transactions</h3>
          <h4>4.1. Investment Risks</h4>
          <p>
            Participation in crypto projects involves high risks, including
            potential loss of funds. We do not assume liability for user
            financial losses.
          </p>

          <h4>4.2. Fees</h4>
          <p>
            Platform usage may include fees, which will be specified in the
            relevant section of the website.
          </p>

          <h4>4.3. Fiat and Cryptocurrency Transactions</h4>
          <p>
            We are not responsible for delays or errors related to third-party
            payment systems or blockchain transactions.
          </p>

          <h4>4.4. Staking Policy</h4>
          <p>
            Funds deposited into the user's wallet are automatically subjected
            to staking. Staked funds cannot be withdrawn or refunded until the
            staking period expires.
          </p>

          <h3>5. Project Hosting</h3>
          <h4>5.1. Project Requirements</h4>
          <p>
            All hosted projects must comply with Platform requirements and
            undergo verification.
          </p>

          <h4>5.2. Responsibilities of Project Owners</h4>
          <p>
            Developers must provide accurate project information and comply with
            all applicable laws.
          </p>

          <h4>5.3. Right to Refuse Hosting</h4>
          <p>
            We reserve the right to deny project hosting without explanation.
          </p>

          <h3>6. Intellectual Property</h3>
          <p>
            All materials hosted on the Platform are protected by copyright.
          </p>

          <h3>7. Privacy and Data Protection</h3>
          <p>
            We are committed to protecting your personal data in accordance with
            our Privacy Policy.
          </p>

          <h3>8. Limitation of Liability</h3>
          <p>
            The Platform is provided "as is" without guarantees of availability
            or error-free operation.
          </p>

          <h3>9. Termination of Use</h3>
          <p>You may discontinue using the Platform at any time.</p>

          <h3>10. Governing Law</h3>
          <p>
            This Agreement is governed by the laws of the jurisdiction where
            Arkinvest is registered.
          </p>

          <h3>11. Contact Information</h3>
          <p>
            If you have any questions regarding this Agreement, you may contact
            us through the contact form on our website.
          </p>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TermsModal;
