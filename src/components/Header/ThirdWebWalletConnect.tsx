import {
  ConnectWallet,
  ThirdwebProvider,
  useAddress,
  // useDisconnect,
} from "@thirdweb-dev/react";
import { useEffect } from "react";
import {
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  trustWallet,
  okxWallet,
  phantomWallet,
} from "@thirdweb-dev/react";
import styles from "./ThirdWebWalletConnect.module.css";
import useAuth from "../../hooks/useAuth"; // Assuming you have this hook

const WalletConnectInner = () => {
  const address = useAddress();
  // const disconnect = useDisconnect();
  const { user, setUser } = useAuth();

  useEffect(() => {
    const updateUserWallet = async () => {
      if (address && user) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/auth/update-wallet`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({ walletAddress: address }),
            }
          );

          const data = await response.json();
          if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user);
          }
        } catch (error) {
          console.error("Failed to update wallet address:", error);
        }
      }
    };

    updateUserWallet();
  }, [address, user]);

  // Handle wallet disconnect
  useEffect(() => {
    if (!address && user?.walletAddress) {
      // Clear wallet address from user profile
      const clearWalletAddress = async () => {
        try {
          await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/auth/update-wallet`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({ walletAddress: null }),
            }
          );

          const updatedUser = { ...user, walletAddress: null };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser as any);
        } catch (error) {
          console.error("Failed to clear wallet address:", error);
        }
      };

      clearWalletAddress();
    }
  }, [address, user]);

  return (
    <ConnectWallet
      theme="dark"
      btnTitle="Connect Wallet"
      modalTitle="Choose your wallet"
      switchToActiveChain={true}
      modalSize="wide"
      welcomeScreen={{
        title: "Choose your preferred wallet",
        subtitle: "Connect to your preferred wallet",
      }}
      className={styles.connectButton}
    />
  );
};

const ThirdWebWalletConnect = () => {
  const walletConfigs = [
    metamaskWallet(),
    coinbaseWallet(),
    walletConnect(),
    trustWallet(),
    okxWallet(),
    phantomWallet(),
  ];

  return (
    <ThirdwebProvider
      clientId="d28d89a66e8eb5e73d6a9c8eeaa0645a"
      activeChain="ethereum"
      supportedWallets={walletConfigs}
    >
      <WalletConnectInner />
    </ThirdwebProvider>
  );
};

export default ThirdWebWalletConnect;
