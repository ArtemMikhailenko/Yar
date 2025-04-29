import React, { useState } from "react";
import { Copy, Check, X } from "lucide-react";
import styles from "./DepositModal.module.css";

interface DepositModalProps {
  onClose: () => void;
}

const DepositModal: React.FC<DepositModalProps> = ({ onClose }) => {
  const wallets = [
    {
      name: "BTC",
      address: "bc1qwdk2vwvll8vnjc43fz2seyfhfnvpuq9t2up8qu",
      color: "#F7931A",
    },
    {
      name: "TRC",
      address: "TFNPewCLvviuYhEid2Yvz3snSF6KTzAGS8",
      color: "#0088CC",
    },
  ];

  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (address: string, name: string) => {
    navigator.clipboard.writeText(address);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeIcon} onClick={onClose}>
          <X size={24} />
        </button>

        <h2 className={styles.title}>Deposit Addresses</h2>

        {wallets.map((wallet) => (
          <div key={wallet.name} className={styles.walletRow}>
            <span
              className={styles.walletLabel}
              style={{ color: wallet.color }}
            >
              {wallet.name}
            </span>
            <div className={styles.walletAddress}>
              <span>{wallet.address}</span>
              <button
                className={styles.copyButton}
                onClick={() => copyToClipboard(wallet.address, wallet.name)}
              >
                {copied === wallet.name ? (
                  <Check size={18} />
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>
          </div>
        ))}

        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default DepositModal;
