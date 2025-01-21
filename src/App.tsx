import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
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
import UpcomingProjects, {
  UpcomingProjectDetails,
} from "./page/UpcomingProjects/UpcomingProject";

interface UpcomingProject {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  bannerUrl: string;
  startDate: string;
  targetRaise: number;
  totalParticipants: number;
  timeUntilStart: string;
  chain: string;
  status: string;
  categories: string[];
}

function App() {
  const [projects, setProjects] = useState<UpcomingProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/projects`);
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
                <PartnersSection />
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
