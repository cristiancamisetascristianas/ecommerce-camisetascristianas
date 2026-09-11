import { Routes, Route } from "react-router-dom";
import { ProductsProvider } from "./context/ProductsContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import CartDrawer from "./components/CartDrawer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import CatalogoPage from "./pages/CatalogoPage";
import MarcaPage from "./pages/MarcaPage";
import ContactoPage from "./pages/ContactoPage";
import CheckoutPage from "./pages/CheckoutPage";
import PagoResultado from "./pages/PagoResultado";

function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<CatalogoPage />} />
            <Route path="/marca" element={<MarcaPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/pago/exito" element={<PagoResultado estado="exito" />} />
            <Route path="/pago/pendiente" element={<PagoResultado estado="pendiente" />} />
            <Route path="/pago/error" element={<PagoResultado estado="error" />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        <CartDrawer />
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;
