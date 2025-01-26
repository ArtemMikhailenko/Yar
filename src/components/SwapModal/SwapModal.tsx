"use client";
import React, { useState, useEffect } from "react";
import styles from "./SwapModal.module.css";

const API_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,tether&vs_currencies=usd";
const LOGO_API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc";

const SwapModal = ({ onClose }: { onClose: () => void }) => {
  const [tokenList, setTokenList] = useState<
    { symbol: string; logo: string }[]
  >([]);
  const [fromCurrency, setFromCurrency] = useState("ETH");
  const [toCurrency, setToCurrency] = useState("BTC");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("0");
  const [prices, setPrices] = useState<{ [key: string]: number }>({});

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
        console.error("Ошибка получения цен:", error);
      }
    };

    const fetchLogos = async () => {
      try {
        const response = await fetch(LOGO_API_URL);
        const data = await response.json();
        setTokenList(
          data
            .filter((coin: any) =>
              ["ethereum", "bitcoin", "tether"].includes(coin.id)
            )
            .map((coin: any) => ({
              symbol: coin.symbol.toUpperCase(),
              logo: coin.image,
            }))
        );
      } catch (error) {
        console.error("Ошибка загрузки логотипов:", error);
      }
    };

    fetchPrices();
    fetchLogos();

    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

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

  const swapTokens = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>
          {fromCurrency} → {toCurrency}
        </h2>

        <div className={styles.swapContainer}>
          <label className={styles.label}>From Token</label>
          <div className={styles.tokenInput}>
            <img
              src={tokenList.find((t) => t.symbol === fromCurrency)?.logo}
              alt={fromCurrency}
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {tokenList.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
            />
          </div>

          <button className={styles.swapIcon} onClick={swapTokens}>
            ↔
          </button>

          <label className={styles.label}>To Token</label>
          <div className={styles.tokenInput}>
            <img
              src={tokenList.find((t) => t.symbol === toCurrency)?.logo}
              alt={toCurrency}
            />
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {tokenList.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </option>
              ))}
            </select>
            <input type="text" value={toAmount} readOnly />
          </div>
        </div>

        <button className={styles.swapButton}>Swap</button>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SwapModal;
