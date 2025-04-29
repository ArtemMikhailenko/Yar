import styles from "./TermsModal.module.css";

const TermsModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>User Agreement</h2>
        <div className={styles.modalBody}>
          <p>
            <strong>Last Updated:</strong> [specify date]
          </p>
          <p>
            This User Agreement ("Agreement") sets forth the terms and
            conditions governing the use of the In4fin platform ("Platform" or
            "we"), which provides services for hosting crypto projects
            (launchpads) for users ("User" or "you"). This Agreement is a
            legally binding document accepted by you upon registration and use
            of the Platform's services.
          </p>

          <h3>1. General Provisions</h3>
          <h4>1.1. Consent to the Terms</h4>
          <p>
            Registration, access to the Platform, and the use of its
            functionalities signify your complete agreement with this Agreement.
            If you do not agree with any of the terms, you must cease using the
            Platform immediately.
          </p>

          <h4>1.2. Changes to the Terms</h4>
          <p>
            We reserve the right to modify this Agreement without prior notice.
            Updated versions will be published on the Platform, and it is your
            responsibility to monitor any changes.
          </p>

          <h3>2. Registration Requirements</h3>
          <h4>2.1. Age Restrictions</h4>
          <p>
            To use the Platform's services, you must be at least 18 years old.
          </p>

          <h4>2.2. Provision of Information</h4>
          <p>
            Upon registration, you agree to provide current and accurate
            information.
          </p>

          <h4>2.3. Account Confidentiality</h4>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials and for all actions conducted under your
            account.
          </p>

          <h3>3. Use of the Platform</h3>
          <h4>3.1. Purpose of Use</h4>
          <p>
            The Platform is intended for hosting and promoting crypto projects,
            participating in token sales (IDO, IEO), and other related
            activities.
          </p>

          <h4>3.2. Prohibited Actions</h4>
          <ul>
            <li>Using the Platform for illegal or fraudulent operations.</li>
            <li>Violating copyright or intellectual property rights.</li>
            <li>Attempting to hack, disrupt, or damage the Platform.</li>
          </ul>

          <h4>3.3. Denial of Service</h4>
          <p>
            We reserve the right to suspend or terminate access to the Platform
            in the event of any violation of this Agreement.
          </p>

          <h3>4. Financial Transactions</h3>
          <h4>4.1. Investment Risks</h4>
          <p>
            Participation in crypto projects involves a high level of risk,
            including the possibility of loss of invested funds. We assume no
            liability for the User's financial losses.
          </p>

          <h4>4.2. Fees</h4>
          <p>
            The use of the Platform may include the payment of fees, which will
            be specified in the relevant section of the website.
          </p>

          <h4>4.3. Fiat and Cryptocurrency Transfers</h4>
          <p>
            We are not responsible for delays or errors related to the
            processing of transactions by third-party payment systems or
            blockchains.
          </p>

          <h4>4.4. Staking Procedure</h4>
          <p>
            Funds credited to the user's wallet are automatically subjected to a
            staking procedure. Funds under staking cannot be withdrawn or
            refunded to the user until the staking period expires.
          </p>

          <h3>5. Project Hosting</h3>
          <h4>5.1. Project Requirements</h4>
          <p>
            All projects hosted on the Platform must be verified for compliance
            with our requirements.
          </p>

          <h4>5.2. Responsibilities of Project Creators</h4>
          <p>
            Developers are required to provide accurate information about their
            projects and comply with all applicable laws.
          </p>

          <h4>5.3. Refusal to Host</h4>
          <p>
            We reserve the right to refuse to host a project without
            explanation.
          </p>

          <h3>6. Intellectual Property</h3>
          <h4>6.1. Rights to Content</h4>
          <p>
            All materials hosted on the Platform are protected by copyright.
          </p>

          <h4>6.2. License to Use</h4>
          <p>
            Users grant the Platform the right to use the uploaded materials for
            the promotion of projects.
          </p>

          <h3>7. Privacy and Data Protection</h3>
          <h4>7.1. Privacy Policy</h4>
          <p>
            We are committed to protecting your personal data in accordance with
            our Privacy Policy.
          </p>

          <h4>7.2. Data Sharing with Third Parties</h4>
          <p>
            Data may be shared with third parties only with your consent or as
            required by law.
          </p>

          <h3>8. Limitation of Liability</h3>
          <h4>8.1. Disclaimer of Warranties</h4>
          <p>
            The Platform is provided "as is," without any guarantees regarding
            availability or error-free operation.
          </p>

          <h4>8.2. Limitation of Damages</h4>
          <p>
            We assume no liability for damages arising from the use of the
            Platform.
          </p>

          <h3>9. Termination of Use</h3>
          <h4>9.1. User Initiative</h4>
          <p>You may discontinue using the Platform at any time.</p>

          <h4>9.2. Platform Initiative</h4>
          <p>
            We reserve the right to restrict access to the Platform in the event
            of a breach of this Agreement.
          </p>

          <h3>10. Governing Law</h3>
          <h4>10.1. Jurisdiction</h4>
          <p>
            This Agreement is governed by the laws of the jurisdiction in which
            In4fin{" "}
          </p>

          <h4>10.2. Dispute Resolution</h4>
          <p>
            All disputes shall be resolved in the competent court of that
            jurisdiction.
          </p>

          <h3>11. Contact Information</h3>
          <p>
            If you have any questions regarding this Agreement, you may contact
            us through the contact form on our website.
          </p>
          <p>
            This is a basic template that can be adapted to the specifics of
            your business and jurisdiction. For the final version, we recommend
            consulting a lawyer.
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
