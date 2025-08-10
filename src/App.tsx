import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryList from "./pages/book/CategoryList";
import BankRules from "./pages/book/BankRules";
import BankGame from "./pages/book/BankGame";
import RiskRules from "./pages/book/RiskRules";
import RiskGame from "./pages/book/RiskGame";
import OneByThreeSetup from "./pages/one-by-three/Setup";
import Top10Rules from "./pages/book/Top10Rules";
import Top10Game from "./pages/book/Top10Game";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/book" element={<CategoryList />} />
          <Route path="/book/bank" element={<BankRules />} />
          <Route path="/book/bank/play" element={<BankGame />} />
          <Route path="/book/risk" element={<RiskRules />} />
          <Route path="/book/risk/play" element={<RiskGame />} />
          <Route path="/book/top10" element={<Top10Rules />} />
          <Route path="/book/top10/play" element={<Top10Game />} />
          <Route path="/one-by-three" element={<OneByThreeSetup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
