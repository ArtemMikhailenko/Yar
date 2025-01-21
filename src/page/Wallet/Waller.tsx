import { useState } from "react";
// import { ArrowUpRight, ArrowDownRight, RefreshCcw } from "lucide-react";
// import CryptoChart from "../../components/CryptoChart/CryptoChart";
import BalanceCard from "../../components/BalanceCard/BalanceCard";
import DepositModal from "../../components/DepositModal/DepositModal";
import styles from "./Wallet.module.css";
import ProjectsTable from "../../components/ProjectsTable/ProjectsTable";

const Wallet = () => {
  const [activeTab, setActiveTab] = useState("HOLDINGS");
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  const holdings = Array(2).fill({
    token: "Project Network PNT",
    amount: 1500,
    buyingPrice: "1$ (Private round)",
    buyingTotal: "1500.00$",
    currentPrice: "3$ (Public round)",
    totalValue: "4500.00$",
  });

  // const openDepositModal = () => setIsDepositModalOpen(true);
  const closeDepositModal = () => setIsDepositModalOpen(false);

  return (
    <div className={styles.container}>
      {/* Balance Card Component */}
      <BalanceCard />

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.leftPanel}>
          {/* Chart Section */}
          <ProjectsTable />
          <div className={styles.chartCard}>
            {/* <div className={styles.chart}>
              <CryptoChart currency="bitcoin" />
            </div> */}

            <div className={styles.tabs}>
              {/* {["HOLDINGS", "NEW DEALS", "ENDED DEALS"].map((tab) => ( */}
              {["HISTORY"].map((tab) => (
                <button
                  key={tab}
                  className={`${styles.tab} ${
                    activeTab === tab ? styles.activeTab : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
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
        {/* <div className={styles.rightPanel}>
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
        </div> */}
      </div>

      {/* Deposit Modal */}
      {isDepositModalOpen && <DepositModal onClose={closeDepositModal} />}
    </div>
  );
};

export default Wallet;
