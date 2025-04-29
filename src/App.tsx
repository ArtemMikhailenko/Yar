import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import HeroSection from "./components/HeroSection/HeroSection";
import StatsSection from "./components/StatsSection/StatsSection";
import PartnersSection from "./components/PartnersSection/PartnersSection";
import Footer from "./components/Footer/Footer";
import AboutUs from "./page/About Us/AboutUs";
import PortfolioPage from "./page/Portfolio/Portfolio";
import Wallet from "./page/Wallet/Waller";
import Profile from "./page/Profile/Profile";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Projects from "./page/Projects/Projects";
import TokenDetail from "./components/Token/TokenDetail";
import InvestmentsSection from "./components/InvestmentsSection/InvestmentsSection";
import { UpcomingProjectDetails } from "./page/UpcomingProjects/UpcomingProject";

function App() {
  return (
    <ThirdwebProvider
      clientId="d28d89a66e8eb5e73d6a9c8eeaa0645a"
      activeChain="ethereum"
    >
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <StatsSection />
                <InvestmentsSection />
                <div id="partners">
                  <PartnersSection />
                </div>
              </>
            }
          />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/upcoming/:tokenId"
            element={<UpcomingProjectDetails />}
          />
          <Route path="/token/:tokenId" element={<TokenDetail />} />
        </Routes>
        <Footer />
      </Router>
    </ThirdwebProvider>
  );
}

export default App;
