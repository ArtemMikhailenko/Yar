import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, RefreshCcw } from 'lucide-react';
import CryptoChart from '../../components/CryptoChart/CryptoChart';
import styles from './Wallet.module.css';

const Wallet = () => {
  const [activeTab, setActiveTab] = useState('HOLDINGS');

  const holdings = Array(6).fill({
    token: 'Project Network PNT',
    amount: 1500,
    buyingPrice: '1$ (Private round)',
    buyingTotal: '1500.00$',
    currentPrice: '3$ (Public round)',
    totalValue: '4500.00$',
  });

  return (
    <div className={styles.container}>
      {/* Balance Card */}
      <div className={styles.balanceCard}>
        <div className={styles.balanceInfo}>
          <span className={styles.label}>Total Balance</span>
          <h1 className={styles.balance}>$50,000.00 USD</h1>
          <div className={styles.growth}>
            <ArrowUpRight size={16} />
            +12.5% from last month
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.actionButton}>
            <ArrowUpRight size={16} />
            Deposit
          </button>
          <button className={`${styles.actionButton} ${styles.activeButton}`}>
            <RefreshCcw size={16} />
            Swap
          </button>
          <button className={styles.actionButton}>
            <ArrowDownRight size={16} />
            Withdraw
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.leftPanel}>
          {/* Chart Section */}
          <div className={styles.chartCard}>
            <div className={styles.chart}>
              <CryptoChart currency="bitcoin" />
            </div>

            <div className={styles.tabs}>
              <button 
                className={`${styles.tab} ${activeTab === 'HOLDINGS' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('HOLDINGS')}
              >
                HOLDINGS
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'NEW DEALS' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('NEW DEALS')}
              >
                NEW DEALS
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'ENDED DEALS' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('ENDED DEALS')}
              >
                ENDED DEALS
              </button>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>TOKEN</th>
                    <th>AMOUNT</th>
                    <th>BUYING PRICE</th>
                    <th>BUYING TOTAL</th>
                    <th>CURRENT PRICE</th>
                    <th>TOTAL VALUE</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className={styles.tokenCell}>
                          <div className={styles.tokenBadge}>P</div>
                          <span>{item.token}</span>
                        </div>
                      </td>
                      <td>{item.amount}</td>
                      <td>{item.buyingPrice}</td>
                      <td>{item.buyingTotal}</td>
                      <td>{item.currentPrice}</td>
                      <td>{item.totalValue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Swap Panel */}
        <div className={styles.rightPanel}>
          <div className={styles.swapCard}>
            <h2>Swap Tokens</h2>
            <div className={styles.swapForm}>
              <div className={styles.field}>
                <label>From token</label>
                <div className={styles.tokenSelect}>
                  <div className={styles.tokenBadge}>B</div>
                  <select defaultValue="USDC">
                    <option value="USDC">USDC</option>
                    <option value="ETH">ETH</option>
                  </select>
                </div>
                <input type="number" placeholder="0.00" />
              </div>

              <div className={styles.field}>
                <label>To token</label>
                <div className={styles.tokenSelect}>
                  <div className={styles.tokenBadge}>E</div>
                  <select defaultValue="BTC">
                    <option value="BTC">BTC</option>
                    <option value="USDT">USDT</option>
                  </select>
                </div>
                <input type="number" placeholder="0.00" />
              </div>

              <button className={styles.swapButton}>Swap</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;