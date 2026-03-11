import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { LanguageProvider } from "./context/LanguageContext";

// Layout
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import WhatsAppButton from "./components/layout/WhatsAppButton";

// Pages
import Home from "./pages/Home";
import Estimation from "./pages/Estimation";
import ThankYou from "./pages/ThankYou";
import HowItWorks from "./pages/HowItWorks";
import VehicleTypes from "./pages/VehicleTypes";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import Privacy from "./pages/Privacy";
import Cookies, { CookieBanner } from "./pages/Cookies";
import ViewEstimation from "./pages/ViewEstimation";
import Admin from "./pages/Admin";

function App() {
  return (
    <LanguageProvider>
      <div className="App min-h-screen flex flex-col">
        <BrowserRouter>
          <Routes>
            {/* Admin route without Header/Footer */}
            <Route path="/admin/:secretPath" element={<Admin />} />
            
            {/* Public routes with Header/Footer */}
            <Route path="*" element={
              <>
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/estimation" element={<Estimation />} />
                    <Route path="/merci" element={<ThankYou />} />
                    <Route path="/comment-ca-marche" element={<HowItWorks />} />
                    <Route path="/vehicules-rachetes" element={<VehicleTypes />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/a-propos" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/mentions-legales" element={<Legal />} />
                    <Route path="/confidentialite" element={<Privacy />} />
                    <Route path="/cookies" element={<Cookies />} />
                    <Route path="/demande/:id" element={<ViewEstimation />} />
                  </Routes>
                </main>
                <Footer />
                <CookieBanner />
                <WhatsAppButton />
              </>
            } />
          </Routes>
          <Toaster position="top-right" />
        </BrowserRouter>
      </div>
    </LanguageProvider>
  );
}

export default App;
