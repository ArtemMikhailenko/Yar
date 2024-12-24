import { useEffect, useRef } from 'react';
import styles from './InvestmentsSection.module.css';
import logo from '../../assets/logo-bull.png';

const investments = [
  {
    id: 1,
    name: 'Project name',
    fund: '$250k',
    sold: '100%',
    roi: 'x15.4',
    description: 'Blum is a hybrid decentralized exchange (DEX) integrated into Telegram. The project works as a gamified crypto application inside the messenger.'
  },
  {
    id: 2,
    name: 'Project name',
    fund: '$250k',
    sold: '100%',
    roi: 'x15.4',
    description: 'Blum is a hybrid decentralized exchange (DEX) integrated into Telegram. The project works as a gamified crypto application inside the messenger.'
  },
  {
    id: 3,
    name: 'Project name',
    fund: '$250k',
    sold: '100%',
    roi: 'x15.4',
    description: 'Blum is a hybrid decentralized exchange (DEX) integrated into Telegram. The project works as a gamified crypto application inside the messenger.'
  }
];

const InvestmentsSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);  // Указываем правильный тип

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLDivElement>(`.${styles.card}`);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.show);
          observer.unobserve(entry.target);  // Убираем слежение после показа
        }
      });
    }, {
      threshold: 0.2  // Карточка появляется при 20% вхождении
    });

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.investments} ref={sectionRef}>
      <h2 className={styles.title}>Latest Investments</h2>
      <div className={styles.container}>
        {investments.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.header}>
              <img src={logo} alt="Project Logo" className={styles.avatar} />
              <h3>{item.name}</h3>
            </div>
            <div className={styles.details}>
              <p><strong>Fund raised:</strong> {item.fund}</p>
              <p><strong>Sold:</strong> {item.sold}</p>
              <p><strong>ROI:</strong> {item.roi}</p>
            </div>
            <p className={styles.description}>{item.description}</p>
            <button className={styles.viewButton}>View</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InvestmentsSection;
