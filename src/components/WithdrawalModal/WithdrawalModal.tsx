import React, { useState } from "react";
import {
  Timer,
  Shield,
  Info,
  CheckCircle,
  Send,
  X,
  ArrowRight,
} from "lucide-react";
import styles from "./WithdrawalModal.module.css";

interface WithdrawalModalProps {
  onClose: () => void;
  userBalans: {
    USDT: number;
    BTC: number;
    ETH: number;
    AVL: number;
  };
}

type TokenType = "USDT" | "BTC" | "ETH" | "AVL";

const WithdrawalModal: React.FC<WithdrawalModalProps> = ({
  onClose,
  userBalans,
}) => {
  const [step, setStep] = useState<
    "select" | "details" | "confirmation" | "success"
  >("select");
  const [selectedToken, setSelectedToken] = useState<TokenType | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const tokens: {
    type: TokenType;
    name: string;
    icon: string;
    balance: number;
  }[] = [
    {
      type: "USDT",
      name: "USDT",
      icon: "/icons/usdt.svg",
      balance: userBalans.USDT,
    },
    {
      type: "BTC",
      name: "Bitcoin",
      icon: "/icons/btc.svg",
      balance: userBalans.BTC,
    },
    {
      type: "ETH",
      name: "Ethereum",
      icon: "/icons/eth.svg",
      balance: userBalans.ETH,
    },
    {
      type: "AVL",
      name: "Avalon",
      icon: "https://polkastarter.com/_next/image?url=https%3A%2F%2Fassets.polkastarter.com%2Fqug8_L_Ew_F_400x400_63d22bf6ba%2Fqug8_L_Ew_F_400x400_63d22bf6ba.jpg&w=96&q=70",
      balance: userBalans.AVL,
    },
  ];

  const handleTokenSelect = (token: TokenType) => {
    setSelectedToken(token);
    setError(null);

    if (token === "AVL") {
      // Show technical limitation for AVL
      setStep("details");
    } else {
      // Proceed with normal withdrawal for other tokens
      setStep("details");
    }
  };

  const validateForm = () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return false;
    }

    if (selectedToken && parseFloat(amount) > userBalans[selectedToken]) {
      setError(`Insufficient ${selectedToken} balance`);
      return false;
    }

    if (!address || address.trim().length < 10) {
      setError("Please enter a valid wallet address");
      return false;
    }

    return true;
  };

  const handleSubmitDetails = () => {
    if (selectedToken === "AVL") {
      // Show technical limitation modal for AVL
      setStep("confirmation");
      return;
    }

    if (validateForm()) {
      setStep("success");
    }
  };

  const renderSelectToken = () => (
    <>
      <div className={styles.iconWrapper}>
        <Send className={styles.timerIcon} />
      </div>

      <h2 className={styles.title}>Select Token to Withdraw</h2>

      <div className={styles.tokenGrid}>
        {tokens.map((token) => (
          <div
            key={token.type}
            className={styles.tokenCard}
            onClick={() => handleTokenSelect(token.type)}
          >
            <div
              className={`${styles.tokenIconLarge} ${
                styles[token.type.toLowerCase()]
              }`}
            >
              <img src={token.icon} alt="" />
            </div>
            <div className={styles.tokenInfo}>
              <h3>{token.name}</h3>
              <p>
                {token.balance.toFixed(token.type === "BTC" ? 6 : 2)}{" "}
                {token.type}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.understoodButton} onClick={onClose}>
        Cancel
      </button>
    </>
  );

  const renderWithdrawalDetails = () => {
    if (!selectedToken) return null;

    const token = tokens.find((t) => t.type === selectedToken);

    if (selectedToken === "AVL") {
      return (
        <>
          <div className={styles.iconWrapper}>
            <Timer className={styles.timerIcon} />
          </div>

          <h2 className={styles.title}>
            Technical limitations on Avalon (AVL) withdrawal
          </h2>

          <div className={styles.messageContainer}>
            <Info className={styles.infoIcon} />
            <p className={styles.message}>
              Currently, direct withdrawal of Avalon (AVL) is not possible due
              to:
              <br />• Legal restrictions in the Russian Federation;
              <br />• Lack of network integration;
              <br />• The need for preliminary replenishment to activate the
              exchange gateway.
              <br />
              <br />
              We recommend converting AVL to other cryptocurrencies first. Would
              you like to proceed with the technical confirmation?
            </p>
          </div>

          <div className={styles.buttonGroup}>
            <button
              className={styles.cancelButton}
              onClick={() => setStep("select")}
            >
              Back
            </button>
            <button
              className={styles.understoodButton}
              onClick={() => setStep("confirmation")}
            >
              Technical Details
            </button>
          </div>
        </>
      );
    }

    return (
      <>
        <div className={styles.iconWrapper}>
          <div
            className={`${styles.tokenIconLarge} ${
              styles[selectedToken.toLowerCase()]
            }`}
          >
            <img src={token?.icon} alt="" />
          </div>
        </div>

        <h2 className={styles.title}>Withdraw {selectedToken}</h2>

        {error && (
          <div className={styles.errorContainer}>
            <Info className={styles.errorIcon} />
            <p className={styles.errorMessage}>{error}</p>
          </div>
        )}

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Amount</label>
          <div className={styles.inputWrapper}>
            <input
              type="number"
              className={styles.formInput}
              placeholder={`Enter amount (max: ${token?.balance.toFixed(
                selectedToken === "BTC" ? 6 : 2
              )})`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <span className={styles.inputSuffix}>{selectedToken}</span>
          </div>
          <div className={styles.balanceInfo}>
            Available: {token?.balance.toFixed(selectedToken === "BTC" ? 6 : 2)}{" "}
            {selectedToken}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Recipient Address</label>
          <input
            type="text"
            className={styles.formInput}
            placeholder={`Enter ${selectedToken} wallet address`}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className={styles.securitySection}>
          <Shield className={styles.shieldIcon} />
          <h3 className={styles.securityTitle}>Secure Transaction</h3>
          <p className={styles.securityText}>
            Double-check the withdrawal address to ensure your funds reach the
            correct destination.
          </p>
        </div>

        <div className={styles.buttonGroup}>
          <button
            className={styles.cancelButton}
            onClick={() => setStep("select")}
          >
            Back
          </button>
          <button
            className={styles.understoodButton}
            onClick={handleSubmitDetails}
          >
            Continue
          </button>
        </div>
      </>
    );
  };

  const renderTechnicalConfirmation = () => (
    <>
      <div className={styles.iconWrapper}>
        <Timer className={styles.timerIcon} />
      </div>

      <h2 className={styles.title}>
        Technical conclusion on the impossibility of direct exchange of Avalon
        (AVL) for USDT
      </h2>

      <div className={styles.messageContainer}>
        <Info className={styles.infoIcon} />
        <p className={styles.message}>
          1. Restrictions on jurisdiction and regulatory requirements
          <br />
          <br />
          Due to the current legislative position of the Russian Federation in
          relation to digital assets, there are restrictions on interaction with
          unregulated tokens, such as Avalon (AVL). In particular:
          <br />• Federal Law No. 259-FZ "On Digital Financial Assets" imposes
          restrictions on the circulation of certain cryptocurrencies if they
          are not registered in the register of the Central Bank of the Russian
          Federation.
          <br />• Rosfinmonitoring actively monitors unlicensed crypto
          transactions, which complicates direct conversions without
          intermediate steps.
          <br />
          <br />
          Thus, Avalon is not included in the list of recognized assets, and its
          direct conversion to USDT on regulated platforms is impossible.
          <br />
          <br />
          2. Technical limitations of the platform
          <br />
          <br />
          At the moment, the Avalon platform does not have native
          synchronization of networks with USDT, which creates the following
          obstacles:
          <br />• Lack of a cross-chain bridge. USDT operates on TRC-20, ERC-20,
          BEP-20 and other network standards, while Avalon uses an isolated
          internal infrastructure without integration into popular blockchains.
          <br />• Different token standards. Even if the transfer were
          technically possible, USDT uses a token model tied to centralized
          stablecoins, while Avalon has an internal emission algorithm that is
          incompatible with classic stablecoins.
        </p>
      </div>

      <div className={styles.securitySection}>
        <Shield className={styles.shieldIcon} />
        <h3 className={styles.securityTitle}>Your Investment is Protected</h3>
        <p className={styles.securityText}>
          All funds are held in an audited smart contract with industry-standard
          security measures.
        </p>
      </div>

      <button
        className={styles.understoodButton}
        onClick={() => setStep("select")}
      >
        Got It, Thanks
      </button>
    </>
  );

  const renderSuccess = () => (
    <>
      <div className={styles.iconWrapper}>
        <CheckCircle
          className={styles.timerIcon}
          style={{ color: "#43a047" }}
        />
      </div>

      <h2 className={styles.title}>Withdrawal Confirmed</h2>

      <div className={styles.successContainer}>
        <div className={styles.successDetails}>
          <p className={styles.successAmount}>
            {amount} {selectedToken}
          </p>
          <ArrowRight className={styles.successArrow} />
          <p className={styles.successAddress}>
            {address.substring(0, 6)}...{address.substring(address.length - 4)}
          </p>
        </div>

        <p className={styles.successMessage}>
          Your withdrawal request has been submitted and is being processed. You
          will receive a confirmation email when the transaction is complete.
        </p>
      </div>

      <div className={styles.securitySection}>
        <CheckCircle
          className={styles.shieldIcon}
          style={{ color: "#43a047" }}
        />
        <h3 className={styles.securityTitle}>Transaction Submitted</h3>
        <p className={styles.securityText}>
          Your transaction has been securely submitted to the blockchain. Please
          allow some time for the transaction to be confirmed.
        </p>
      </div>

      <button className={styles.understoodButton} onClick={onClose}>
        Close
      </button>
    </>
  );

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={20} />
        </button>

        {step === "select" && renderSelectToken()}
        {step === "details" && renderWithdrawalDetails()}
        {step === "confirmation" && renderTechnicalConfirmation()}
        {step === "success" && renderSuccess()}
      </div>
    </div>
  );
};

export default WithdrawalModal;
