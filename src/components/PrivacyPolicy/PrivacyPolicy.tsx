import styles from "./PrivacyPolicy.module.css";

const PrivacyPolicy = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>Privacy Policy</h2>
        <div className={styles.modalBody}>
          <p>
            ArkInvest ("we," "our," "us") is committed to protecting and
            respecting your privacy. This Privacy Policy explains what data we
            collect, how we use it, and how we safeguard your information when
            you use the ArkInvest platform ("Platform").
          </p>

          <h3>1. Data We Collect</h3>
          <p>
            We collect various types of data to provide and improve our
            services:
          </p>
          <ul>
            <li>
              <strong>Personal Data:</strong> Full name, email address, phone
              number, payment information (cryptocurrency wallets), legal
              documents (for KYC verification).
            </li>
            <li>
              <strong>Non-Personal Data:</strong> IP addresses, browser/device
              details, platform activity logs.
            </li>
            <li>
              <strong>Third-Party Data:</strong> We may collect data from
              external services like payment processors or social networks if
              you authenticate through them.
            </li>
          </ul>

          <h3>2. Purpose of Data Usage</h3>
          <p>We use your data to:</p>
          <ul>
            <li>Register and manage your account.</li>
            <li>Process transactions, including IDOs and token sales.</li>
            <li>Communicate with you (emails, notifications).</li>
            <li>Improve our platform and analyze user activity.</li>
            <li>Ensure compliance with legal regulations.</li>
          </ul>

          <h3>3. Data Sharing with Third Parties</h3>
          <p>We do not sell your data. However, we may share it with:</p>
          <ul>
            <li>
              <strong>Partners:</strong> For transaction processing or service
              provision.
            </li>
            <li>
              <strong>Legal Authorities:</strong> When required by law.
            </li>
            <li>
              <strong>Technical Providers:</strong> For hosting, analytics, and
              other services.
            </li>
          </ul>

          <h3>4. Data Storage & Security</h3>
          <p>
            <strong>4.1 Retention Period:</strong> We store data only as long as
            necessary to fulfill our obligations or as required by law.
          </p>
          <p>
            <strong>4.2 Security Measures:</strong> We implement technical and
            organizational safeguards to protect your data from unauthorized
            access, alteration, or destruction.
          </p>

          <h3>5. Your Rights</h3>
          <p>You have the right to:</p>
          <ul>
            <li>
              <strong>Access your data:</strong> Request a copy of your personal
              information.
            </li>
            <li>
              <strong>Correct your data:</strong> Update incorrect or outdated
              details.
            </li>
            <li>
              <strong>Delete your data:</strong> Request data removal (subject
              to legal obligations).
            </li>
            <li>
              <strong>Restrict processing:</strong> Request limitations on how
              we process your data.
            </li>
            <li>
              <strong>Withdraw consent:</strong> Revoke any previously given
              consent.
            </li>
          </ul>
          <p>
            To exercise these rights, contact us using the details in Section 8.
          </p>

          <h3>6. Cookies & Tracking</h3>
          <p>We use cookies to:</p>
          <ul>
            <li>Analyze user activity.</li>
            <li>Personalize your experience.</li>
            <li>Ensure platform security.</li>
          </ul>
          <p>
            You can disable cookies in your browser settings, but some features
            may not work properly.
          </p>

          <h3>7. Minors' Privacy</h3>
          <p>
            Our services are not intended for individuals under 18 years old. We
            do not knowingly collect data from minors.
          </p>

          <h3>8. Contact Information</h3>
          <p>
            If you have any questions or concerns regarding data processing,
            contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong> [Provide email address]
            </li>
            <li>
              <strong>Phone:</strong> [Provide phone number]
            </li>
            <li>
              <strong>Address:</strong> [Provide postal address]
            </li>
          </ul>

          <h3>9. Changes to this Privacy Policy</h3>
          <p>
            We may update this Privacy Policy, and changes will be published on
            our Platform. We encourage you to review this section regularly.
          </p>
          <p>
            By using our Platform, you confirm that you have read and understood
            this Policy.
          </p>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
