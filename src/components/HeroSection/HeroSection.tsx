
import styles from './HeroSection.module.css';
import bullImage from '../../assets/bull.png'; // Используем изображение быка

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.text}>
          <h1>Invest in digital assets <br /> with ArkInvest</h1>
          <p className={styles.subtext}>
            Discover new opportunities in digital finance with trusted investment platforms.
          </p>
          <div className={styles.buttons}>
            <button className={styles.primaryButton}>Invest</button>
            <button className={styles.secondaryButton}>Contact Us</button>
          </div>
        </div>

        <div className={styles.image}>
          <img src={bullImage} alt="Digital Bull" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
