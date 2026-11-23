 import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MarketPrices from "./pages/MarketPrices";
import CompareMarkets from "./pages/CompareMarkets";
import SellingCalculator from "./pages/SellingCalculator";
import AIAssistant from "./pages/AIAssistant";
import PriceAnalytics from "./pages/PriceAnalytics";
import Settings from "./pages/Settings";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/price-analytics" element={<PriceAnalytics />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/market-prices" element={<MarketPrices />} />

        <Route path="/compare-markets" element={<CompareMarkets />} />

        <Route path="/selling-calculator" element={<SellingCalculator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;