"use client";
import React, { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight, RefreshCcw } from "lucide-react";
// import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "./BalanceCard.module.css";
import DepositModal from "../DepositModal/DepositModal";
import WithdrawalModal from "../WithdrawalModal/WithdrawalModal";
import SwapModal from "../SwapModal/SwapModal";

const API_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,tether&vs_currencies=usd";

const BalanceCard: React.FC = () => {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);

  const userData = localStorage.getItem("user");
  const [user, setUser] = useState<{
    balance: number;
    btc: number;
    eth: number;
  }>({
    balance: 0,
    btc: 0,
    eth: 0,
  });
  const [prices, setPrices] = useState<{
    ETH: number;
    BTC: number;
    USDT: number;
  }>({
    ETH: 0,
    BTC: 0,
    USDT: 1,
  });

  useEffect(() => {
    if (userData) {
      const storedUser = JSON.parse(userData);
      setUser({
        balance: storedUser.balance,
        btc: storedUser.btc || 0,
        eth: storedUser.eth || 0,
      });
    }
  }, [userData]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setPrices({
          ETH: data.ethereum.usd,
          BTC: data.bitcoin.usd,
          USDT: data.tether.usd,
        });
      } catch (error) {
        console.error("Ошибка загрузки цен:", error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.mainContent}>
        <div className={styles.balanceSection}>
          <h2 className={styles.balanceTitle}>Wallet Balance</h2>

          <div className={styles.balanceWrapper}>
            <div className={styles.balanceItem}>
              <img
                src="/icons/usdt.svg"
                alt="USDT"
                className={styles.currencyIcon}
              />
              <div className={styles.balanceInfo}>
                <span className={styles.balanceAmount}>
                  ${user.balance.toFixed(2)}
                </span>
                <span className={styles.balanceLabel}>USD (Tether)</span>
              </div>
            </div>

            <div className={styles.balanceItem}>
              <img
                src="/icons/btc.svg"
                alt="BTC"
                className={styles.currencyIcon}
              />
              <div className={styles.balanceInfo}>
                <span className={styles.balanceAmount}>
                  {user.btc.toFixed(6)} BTC
                </span>
                <span className={styles.balanceLabel}>
                  ≈ ${((user.btc || 0) * prices.BTC).toFixed(2)}
                </span>
              </div>
            </div>

            <div className={styles.balanceItem}>
              <img
                src="/icons/eth.svg"
                alt="ETH"
                className={styles.currencyIcon}
              />
              <div className={styles.balanceInfo}>
                <span className={styles.balanceAmount}>
                  {user.eth.toFixed(6)} ETH
                </span>
                <span className={styles.balanceLabel}>
                  ≈ ${((user.eth || 0) * prices.ETH).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.actionsContainer}>
        <div className={styles.actionButtons}>
          <button
            className={`${styles.actionButton} ${styles.depositButton}`}
            onClick={() => setIsDepositModalOpen(true)}
          >
            <ArrowUpRight className={styles.actionIcon} />
            <span>Deposit</span>
          </button>
          <button
            className={`${styles.actionButton} ${styles.swapButton}`}
            onClick={() => setIsSwapModalOpen(true)}
          >
            <RefreshCcw className={styles.actionIcon} />
            <span>Swap</span>
          </button>
          <button
            className={`${styles.actionButton} ${styles.withdrawButton}`}
            onClick={() => setIsWithdrawalModalOpen(true)}
          >
            <ArrowDownRight className={styles.actionIcon} />
            <span>Withdraw</span>
          </button>
        </div>
      </div>

      {isDepositModalOpen && (
        <DepositModal onClose={() => setIsDepositModalOpen(false)} />
      )}
      {isWithdrawalModalOpen && (
        <WithdrawalModal onClose={() => setIsWithdrawalModalOpen(false)} />
      )}
      {isSwapModalOpen && (
        <SwapModal onClose={() => setIsSwapModalOpen(false)} />
      )}
    </div>
  );
};

export default BalanceCard;
