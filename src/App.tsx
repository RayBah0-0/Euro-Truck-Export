import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LanguagePopup } from './components/LanguagePopup';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import TruckDetail from './pages/TruckDetail';
import ExportProcess from './pages/ExportProcess';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <LanguagePopup />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/:id" element={<TruckDetail />} />
          <Route path="/export-process" element={<ExportProcess />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
