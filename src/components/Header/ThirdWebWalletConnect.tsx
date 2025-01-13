import { ConnectWallet, ThirdwebProvider } from "@thirdweb-dev/react";
import {
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  trustWallet,
  okxWallet,
  phantomWallet,
} from "@thirdweb-dev/react";
import styles from "./ThirdWebWalletConnect.module.css";

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
        modalTitleIconUrl="/your-logo.png"
        className={styles.connectButton}
      />
    </ThirdwebProvider>
  );
};

export default ThirdWebWalletConnect;
