import { useScrollReveal } from "./hooks/useScrollReveal";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Catalog from "./components/Catalog";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import InstagramFeed from "./components/InstagramFeed";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Catalog />
        <About />
        <Testimonials />
        <InstagramFeed />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;
