import styles from "./PrivacyPolicy.module.css";

const PrivacyPolicy = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>Privacy Policy</h2>
        <div className={styles.modalBody}>
          <p>
            In4fin ("we", "our", "us") is committed to protecting and respecting
            your privacy. This Privacy Policy explains what data we collect, how
            we use it, and how we safeguard your information when you use the
            In4fin platform ("Platform").
          </p>

          <h3>1. Data We Collect</h3>
          <p>
            We collect various types of data to provide and improve our
            services:
          </p>

          <h4>1.1. Personal Data:</h4>
          <ul>
            <li>First and last name.</li>
            <li>Email address.</li>
            <li>Phone number.</li>
            <li>Payment information (including cryptocurrency wallets).</li>
            <li>Legal documents (when KYC is required).</li>
          </ul>

          <h4>1.2. Non-Personal Data:</h4>
          <ul>
            <li>IP addresses.</li>
            <li>Browser and device information.</li>
            <li>Activity logs on the Platform.</li>
          </ul>

          <h4>1.3. Data from Third-Party Sources:</h4>
          <p>
            We may collect information from third-party services, such as
            payment systems or social networks, if you authenticate through
            them.
          </p>

          <h3>2. Purposes of Data Usage</h3>
          <p>We use the collected data to:</p>
          <ul>
            <li>Register users and provide access to the Platform.</li>
            <li>Fulfill our service obligations.</li>
            <li>Conduct transactions, including IDOs and token sales.</li>
            <li>Communicate with users (newsletters, notifications).</li>
            <li>Improve the Platform and analyze user activity.</li>
            <li>Ensure compliance with laws and regulatory requirements.</li>
          </ul>

          <h3>3. Data Sharing with Third Parties</h3>
          <p>
            We do not sell your data to third parties. However, in certain
            cases, data may be shared:
          </p>
          <ul>
            <li>
              With partner companies: For conducting transactions or providing
              services.
            </li>
            <li>With legal authorities: When required by law.</li>
            <li>
              With technical service providers: For hosting, analytics, and
              other operations.
            </li>
          </ul>

          <h3>4. Data Storage</h3>
          <h4>4.1. Retention Period:</h4>
          <p>
            We retain data only for the period necessary to fulfill the purposes
            outlined in this Policy or as required by law.
          </p>
          <h4>4.2. Data Security:</h4>
          <p>
            We take reasonable technical and organizational measures to protect
            your data from unauthorized access, alteration, or destruction.
          </p>

          <h3>5. Your Rights</h3>
          <p>You have the right to:</p>
          <ul>
            <li>
              Access your data: Request a copy of the personal information we
              hold.
            </li>
            <li>
              Correct your data: Make changes if the data is outdated or
              incorrect.
            </li>
            <li>
              Delete your data: Request the removal of your data (subject to
              legal requirements).
            </li>
            <li>
              Restrict processing: Ask us to limit the processing of your data.
            </li>
            <li>
              Withdraw consent: If you have previously given consent for data
              processing, you may revoke it.
            </li>
          </ul>
          <p>
            To exercise these rights, please contact us using the details
            provided in Section 8.
          </p>

          <h3>6. Use of Cookies</h3>
          <p>We use cookies and similar technologies to:</p>
          <ul>
            <li>Analyze user activity.</li>
            <li>Personalize your experience on the Platform.</li>
            <li>Ensure security.</li>
          </ul>
          <p>
            You may disable cookies in your browser settings, but this may
            affect the functionality of the Platform.
          </p>

          <h3>7. Minors' Policy</h3>
          <p>
            Our services are not intended for individuals under the age of 18.
            We do not knowingly collect data from minors.
          </p>

          <h3>8. Contact Information</h3>
          <p>
            If you have any questions or complaints related to data processing,
            please contact us:
          </p>
          <ul>
            <li>Email: [provide email address]</li>
            <li>Phone: [provide phone number]</li>
            <li>Address: [provide postal address]</li>
          </ul>

          <h3>9. Changes to the Privacy Policy</h3>
          <p>
            We reserve the right to update this Policy. Updates will be
            published on the Platform, and we recommend that you review this
            section regularly.
          </p>
          <p>
            This Privacy Policy is an integral part of the User Agreement. By
            using the Platform, you confirm that you have read and understood
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
