"use client";
import { useState, useEffect } from "react";
import styles from "./SwapModal.module.css";
import WithdrawalModal from "../AvalanModal/AvalanModal";

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
    AVL: 0,
  });

  const [fromCurrency, setFromCurrency] = useState("ETH");
  const [toCurrency, setToCurrency] = useState("BTC");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("0");
  const [prices, setPrices] = useState<{ [key: string]: number }>({
    ETH: 0,
    BTC: 0,
    USDT: 0,
    AVL: 0.3,
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setPrices({
          ETH: data.ethereum.usd,
          BTC: data.bitcoin.usd,
          USDT: data.tether.usd,
          AVL: 0.3,
        });
      } catch (error) {
        console.error("Error fetching prices:", error);
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
        console.error("Error fetching balance:", error);
      }
    };

    if (userId) {
      fetchBalance();
      fetchPrices();
    }

    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, [userId, BASE_URL]);

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
    // Если выбран "AVL" для обмена, вместо обмена показываем WithdrawalModal
    if (fromCurrency === "AVL") {
      setShowWithdrawalModal(true);
      return;
    }

    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      setErrorMessage("Please enter a valid amount.");
      return;
    }

    if (userBalance[fromCurrency] < parseFloat(fromAmount)) {
      setErrorMessage(`Not enough ${fromCurrency} to exchange.`);
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
        throw new Error("Error updating balance.");
      }

      setUserBalance(updatedBalance);
      setFromAmount("");
      setToAmount("0");
      setSuccessMessage("Exchange successful! ✅");

      // Clear the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      setErrorMessage("An error occurred during the exchange.");
      console.error("Swap error:", error);
    }
  };

  return (
    <>
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
            <label className={styles.label}>I give</label>
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
                Balance: {userBalance[fromCurrency]?.toFixed(6)}
              </span>
            </div>

            <button className={styles.swapIcon} onClick={swapTokens}>
              ↔
            </button>

            <label className={styles.label}>I get</label>
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
      {/* Если showWithdrawalModal true, показываем модалку */}
      {showWithdrawalModal && (
        <WithdrawalModal onClose={() => setShowWithdrawalModal(false)} />
      )}
    </>
  );
};

export default SwapModal;
