import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions,
} from "chart.js";
import { TrendingUp, TrendingDown, AlertCircle, RefreshCw } from "lucide-react";
import styles from "./CryptoChart.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PriceChange {
  value: number;
  percentage: number;
}

interface CryptoChartProps {
  currency?: string;
}

interface PriceData {
  prices: [number, number][];
}

const CryptoChart: React.FC<CryptoChartProps> = ({ currency = "bitcoin" }) => {
  const [chartData, setChartData] = useState<ChartData<"line">>({
    datasets: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [priceChange, setPriceChange] = useState<PriceChange>({
    value: 0,
    percentage: 0,
  });
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("30D");

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<PriceData>(
          `https://api.coingecko.com/api/v3/coins/${currency}/market_chart?vs_currency=usd&days=30`
        );

        const prices = response.data.prices;
        const labels = prices.map((price) => {
          const date = new Date(price[0]);
          return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
        });

        const data = prices.map((price) => price[1]);

        const firstPrice = data[0];
        const lastPrice = data[data.length - 1];
        const change = lastPrice - firstPrice;
        const changePercentage = (change / firstPrice) * 100;

        setPriceChange({
          value: Number(change.toFixed(2)),
          percentage: Number(changePercentage.toFixed(2)),
        });

        setChartData({
          labels,
          datasets: [
            {
              label: `${currency.toUpperCase()} Price (USD)`,
              data,
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              pointRadius: 0,
              pointHoverRadius: 6,
              pointHoverBackgroundColor: "#3b82f6",
              pointHoverBorderColor: "#fff",
              pointHoverBorderWidth: 2,
            },
          ],
        });

        setError("");
      } catch (err) {
        console.error("Error fetching chart data:", err);
        setError("Failed to load chart data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [currency]);

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#1f2937",
        bodyColor: "#1f2937",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) =>
            `$${context.parsed.y.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 8,
          color: "#9ca3af",
          font: {
            size: 12,
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#f3f4f6",
          //@ts-ignore
          drawBorder: false,
        },
        ticks: {
          color: "#9ca3af",
          font: {
            size: 12,
          },
          callback: (value) => `$${value.toLocaleString("en-US")}`,
        },
        border: {
          display: false,
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  const timeframes: string[] = ["24H", "7D", "30D", "90D", "1Y", "ALL"];

  return (
    <div className={styles.chartContainer}>
      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading market data...</p>
        </div>
      ) : error ? (
        <div className={styles.errorContainer}>
          <AlertCircle size={32} className={styles.errorIcon} />
          <p className={styles.error}>{error}</p>
          <button
            className={styles.retryButton}
            onClick={() => window.location.reload()}
          >
            <RefreshCw size={16} />
            Retry
          </button>
        </div>
      ) : (
        <>
          <div className={styles.chartHeader}>
            <div className={styles.priceInfo}>
              <div className={styles.currencyInfo}>
                <div className={styles.currencyIcon}>
                  {currency[0].toUpperCase()}
                </div>
                <h3>{currency.toUpperCase()} Price Chart</h3>
              </div>
              <div
                className={`${styles.priceChange} ${
                  priceChange.value >= 0 ? styles.positive : styles.negative
                }`}
              >
                {priceChange.value >= 0 ? (
                  <TrendingUp size={20} />
                ) : (
                  <TrendingDown size={20} />
                )}
                <span className={styles.changeValue}>
                  ${Math.abs(priceChange.value)}
                </span>
                <span className={styles.changePercent}>
                  ({priceChange.percentage}%)
                </span>
              </div>
            </div>
            {/* <div className={styles.timeFrames}>
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe}
                  className={`${styles.timeFrameButton} ${selectedTimeframe === timeframe ? styles.activeTimeFrame : ''}`}
                  onClick={() => setSelectedTimeframe(timeframe)}
                >
                  {timeframe}
                </button>
              ))}
            </div> */}
          </div>
          <div className={styles.chartWrapper}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </>
      )}
    </div>
  );
};

export default CryptoChart;
