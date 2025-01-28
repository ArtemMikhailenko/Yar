"use client";
import { useState, useEffect } from "react";
import styles from "./SwapModal.module.css";

const API_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,tether&vs_currencies=usd";

const SwapModal = ({ onClose }: { onClose: () => void }) => {
  const userData = localStorage.getItem("user");
  const userId = userData ? JSON.parse(userData)._id : null;
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [userBalance, setUserBalance] = useState<{ [key: string]: number }>({
    ETH: 0,
    BTC: 0,
    USDT: 0,
    ARK: 0,
  });

  const [fromCurrency, setFromCurrency] = useState("ETH");
  const [toCurrency, setToCurrency] = useState("BTC");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("0");
  const [prices, setPrices] = useState<{ [key: string]: number }>({
    ETH: 0,
    BTC: 0,
    USDT: 1,
    ARK: 0.01, // Фиксированная цена ARK в USDT
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setPrices({
          ETH: data.ethereum.usd,
          BTC: data.bitcoin.usd,
          USDT: data.tether.usd,
          ARK: 0.01,
        });
      } catch (error) {
        console.error("Ошибка получения цен:", error);
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
        console.error("Ошибка получения баланса:", error);
      }
    };

    if (userId) {
      fetchBalance();
      fetchPrices();
    }

    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, [userId]);

  useEffect(() => {
    if (!fromAmount || isNaN(parseFloat(fromAmount))) {
      setToAmount("0");
      return;
    }

    const fromPrice = prices[fromCurrency];
    const toPrice = prices[toCurrency];

    if (fromPrice && toPrice) {
      const converted = (parseFloat(fromAmount) * fromPrice) / toPrice;
      setToAmount(converted.toFixed(6));
    }
  }, [fromAmount, fromCurrency, toCurrency, prices]);

  const swapTokens = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      setErrorMessage("Введите корректную сумму.");
      return;
    }

    if (userBalance[fromCurrency] < parseFloat(fromAmount)) {
      setErrorMessage(`Недостаточно ${fromCurrency} для обмена.`);
      return;
    }

    const newFromBalance = userBalance[fromCurrency] - parseFloat(fromAmount);
    const newToBalance = userBalance[toCurrency] + parseFloat(toAmount);

    const updatedBalance = {
      ...userBalance,
      [fromCurrency]: newFromBalance,
      [toCurrency]: newToBalance,
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
        throw new Error("Ошибка обновления баланса.");
      }

      setUserBalance(updatedBalance);
      setFromAmount("");
      setToAmount("0");
      setSuccessMessage("Обмен успешно выполнен! ✅");

      // Очистка сообщения через 3 секунды
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      setErrorMessage("Произошла ошибка при обмене.");
      console.error("Ошибка свапа:", error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>
          {fromCurrency} → {toCurrency}
        </h2>

        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
        {successMessage && (
          <div className={styles.successMessage}>{successMessage}</div>
        )}

        <div className={styles.swapContainer}>
          <label className={styles.label}>Отдаю</label>
          <div className={styles.tokenInput}>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {Object.keys(userBalance).map((token) => (
                <option key={token} value={token}>
                  {token}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
            />
            <span className={styles.balance}>
              Баланс: {userBalance[fromCurrency]?.toFixed(6)}
            </span>
          </div>

          <button className={styles.swapIcon} onClick={swapTokens}>
            ↔
          </button>

          <label className={styles.label}>Получаю</label>
          <div className={styles.tokenInput}>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {Object.keys(userBalance).map((token) => (
                <option key={token} value={token}>
                  {token}
                </option>
              ))}
            </select>
            <input type="text" value={toAmount} readOnly />
          </div>
        </div>

        <button
          className={styles.swapButton}
          onClick={swapTokens}
          disabled={!fromAmount}
        >
          Swap
        </button>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SwapModal;
