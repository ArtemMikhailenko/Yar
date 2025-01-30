import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HeroSection.module.css";
import bullImage from "../../assets/bull.png";
import AuthModal from "../AuthModal/AuthModal"; // Импортируем модалку

const HeroSection = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInvestClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/wallet"); // Если пользователь залогинен — отправляем в кошелек
    } else {
      setIsModalOpen(true); // Если нет, открываем модалку авторизации
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.text}>
          <h1>
            Invest in digital assets <br /> with ArkInvest
          </h1>
          <p className={styles.subtext}>
            Discover new opportunities in digital finance with trusted
            investment platforms.
          </p>
          <div className={styles.buttons}>
            <button
              className={styles.primaryButton}
              onClick={handleInvestClick}
            >
              Invest
            </button>
            <button className={styles.secondaryButton}>Contact Us</button>
          </div>
        </div>

        <div className={styles.image}>
          <img src={bullImage} alt="Digital Bull" />
        </div>
      </div>

      {/* Модальное окно авторизации */}
      {isModalOpen && (
        <AuthModal
          isOpen={isModalOpen}
          onClose={toggleModal}
          onLogin={() => {
            setIsModalOpen(false); // Закрываем модалку после входа
            navigate("/wallet"); // После входа перенаправляем в кошелек
          }}
        />
      )}
    </section>
  );
};

export default HeroSection;
