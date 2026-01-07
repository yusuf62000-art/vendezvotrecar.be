import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

// Layout
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

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

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <BrowserRouter>
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
        <Toaster position="top-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;
