// import{useRef } from 'react';
import styles from './StatsSection.module.css';

const StatsSection = () => {
    // const statsRef = useRef(null);

    return (
        <section className={styles.stats}>
            <div className={styles.container}>
                <div className={styles.statItem}>
                    <h2>50k</h2>
                    <p>Total Participants</p>
                </div>
                <div className={styles.statItem}>
                    <h2>$15.6M</h2>
                    <p>Fund Raised</p>
                </div>
                <div className={styles.statItem}>
                    <h2>$30.2M</h2>
                    <p>Volume Traded</p>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
