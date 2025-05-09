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
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [user, setUser] = useState<{
    USDT: number;
    BTC: number;
    ETH: number;
    AVL: number;
  }>({
    USDT: 0,
    BTC: 0,
    ETH: 0,
    AVL: 0,
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
  const getUserId = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        return JSON.parse(userData)._id; // Убедись, что поле называется "_id"
      } catch (error) {
        console.error("Ошибка парсинга user ID:", error);
      }
    }
    return null;
  };

  const fetchUserBalance = async () => {
    const userId = getUserId();
    if (!userId) return;

    try {
      const response = await fetch(
        `${BASE_URL}/api/auth/user/${userId}/balance`
      );
      if (!response.ok) throw new Error("Ошибка при получении баланса");

      const data = await response.json();
      setUser(data);
      console.log(data);
    } catch (error) {
      console.error("Ошибка загрузки баланса:", error);
    }
  };
  useEffect(() => {
    fetchUserBalance();
  }, []);
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
            {/* USDT */}
            <div className={styles.balanceItem}>
              <img
                src="/icons/usdt.svg"
                alt="USDT"
                className={styles.currencyIcon}
              />
              <div className={styles.balanceInfo}>
                <span className={styles.balanceAmount} translate="no">
                  ${user.USDT.toFixed(2)}
                </span>
                <span className={styles.balanceLabel}>USD (Tether)</span>
              </div>
            </div>

            {/* BTC */}
            <div className={styles.balanceItem}>
              <img
                src="/icons/btc.svg"
                alt="BTC"
                className={styles.currencyIcon}
              />
              <div className={styles.balanceInfo}>
                <span className={styles.balanceAmount} translate="no">
                  {user.BTC.toFixed(6)} BTC
                </span>
                <span className={styles.balanceLabel} translate="no">
                  ≈ ${(user.BTC * prices.BTC).toFixed(2)}
                </span>
              </div>
            </div>

            {/* ETH */}
            <div className={styles.balanceItem}>
              <img
                src="/icons/eth.svg"
                alt="ETH"
                className={styles.currencyIcon}
              />
              <div className={styles.balanceInfo}>
                <span className={styles.balanceAmount} translate="no">
                  {user.ETH.toFixed(6)} ETH
                </span>
                <span className={styles.balanceLabel} translate="no">
                  ≈ ${(user.ETH * prices.ETH).toFixed(2)}
                </span>
              </div>
            </div>

            {/* ARK */}
            <div className={styles.balanceItem}>
              <img
                src="https://polkastarter.com/_next/image?url=https%3A%2F%2Fassets.polkastarter.com%2Fqug8_L_Ew_F_400x400_63d22bf6ba%2Fqug8_L_Ew_F_400x400_63d22bf6ba.jpg&w=96&q=70"
                alt="AVL"
                className={styles.currencyIcon}
              />
              <div className={styles.balanceInfo}>
                <span className={styles.balanceAmount} translate="no">
                  {user.AVL.toFixed(2)} AVL
                </span>
                <span className={styles.balanceLabel} translate="no">
                  ≈ ${(user.AVL * 0.3).toFixed(2)}
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
        <WithdrawalModal
          userBalans={user}
          onClose={() => setIsWithdrawalModalOpen(false)}
        />
      )}
      {isSwapModalOpen && (
        <SwapModal onClose={() => setIsSwapModalOpen(false)} />
      )}
    </div>
  );
};

export default BalanceCard;
