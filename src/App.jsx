import { Routes, Route } from "react-router-dom";
import { ProductsProvider } from "./context/ProductsContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import CatalogoPage from "./pages/CatalogoPage";
import MarcaPage from "./pages/MarcaPage";
import ContactoPage from "./pages/ContactoPage";

function App() {
  return (
    <ProductsProvider>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<CatalogoPage />} />
          <Route path="/marca" element={<MarcaPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </ProductsProvider>
  );
}

export default App;
