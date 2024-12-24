import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import StatsSection from './components/StatsSection/StatsSection';
import InvestmentsSection from './components/InvestmentsSection/InvestmentsSection';
import PartnersSection from './components/PartnersSection/PartnersSection';
import Footer from './components/Footer/Footer';
import AboutUs from './page/About Us/AboutUs';
import PortfolioPage from './page/Portfolio/Portfolio';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <StatsSection />
            <InvestmentsSection />
            <PartnersSection />
          </>
        } />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/portfolio" element={<PortfolioPage/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
