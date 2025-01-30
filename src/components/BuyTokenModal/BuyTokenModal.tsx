"use client";
import React, { useState, useEffect } from "react";
import styles from "./BuyTokenModal.module.css";

interface BuyTokenModalProps {
  project: { name: string };
  onClose: () => void;
}

const API_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,tether&vs_currencies=usd";

const BuyTokenModal: React.FC<BuyTokenModalProps> = ({ project, onClose }) => {
  const userData = localStorage.getItem("user");
  const userId = userData ? JSON.parse(userData)._id : null;

  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USDT");
  const [prices, setPrices] = useState<{ [key: string]: number }>({
    ETH: 0,
    BTC: 0,
    USDT: 1,
  });

  const [userBalance, setUserBalance] = useState<{ [key: string]: number }>({
    ETH: 0,
    BTC: 0,
    USDT: 0,
    AVL: 0,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const tokenPriceInUSDT = 0.01; // Цена токена AVL в USDT

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

    const fetchBalance = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/auth/user/${userId}/balance`
        );
        const data = await response.json();
        setUserBalance(data);
      } catch (error) {
        console.error("Ошибка загрузки баланса:", error);
        setErrorMessage("Failed to load balance.");
      }
    };

    if (userId) {
      fetchBalance();
      fetchPrices();
    }
  }, [userId]);

  // Вычисление количества AVL, которое получит пользователь
  const arkToReceive = amount
    ? (parseFloat(amount) / (tokenPriceInUSDT / prices[currency])).toFixed(6)
    : "0";

  const handleBuy = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    const amountToSpend = parseFloat(amount);
    if (!amountToSpend || amountToSpend <= 0) {
      setErrorMessage("Enter a valid amount.");
      return;
    }

    const totalCost = amountToSpend;
    const userCurrencyBalance = userBalance[currency];

    if (userCurrencyBalance < totalCost) {
      setErrorMessage(`Not enough ${currency} balance.`);
      return;
    }

    const updatedBalance = {
      ...userBalance,
      [currency]: userCurrencyBalance - totalCost,
      AVL: userBalance.AVL + parseFloat(arkToReceive),
    };

    try {
      const response = await fetch(
        `${BASE_URL}/api/auth/user/${userId}/balance`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBalance),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update balance.");
      }

      setUserBalance(updatedBalance);
      setAmount("");
      setSuccessMessage("Purchase successful!");
    } catch (error) {
      console.error("Purchase error:", error);
      setErrorMessage("Purchase failed.");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Buy {project.name} Tokens</h2>
        <p>
          Token price: <strong>0.01 USDT</strong>
        </p>

        <select
          className={styles.currencySelect}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="USDT">USDT</option>
          <option value="ETH">ETH</option>
          <option value="BTC">BTC</option>
        </select>

        <input
          className={styles.buyInput}
          type="number"
          placeholder="Enter amount to spend"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <p className={styles.balanceText}>
          Balance: {userBalance[currency]?.toFixed(6)} {currency}
        </p>

        <p className={styles.arkReceive}>
          You will receive: <strong>{arkToReceive} Avalanche</strong>
        </p>

        {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
        {successMessage && (
          <p className={styles.successText}>{successMessage}</p>
        )}

        <button className={styles.buyButton} onClick={handleBuy}>
          Confirm Purchase
        </button>
        <button className={styles.closeButton} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BuyTokenModal;
