import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LanguagePopup } from './components/LanguagePopup';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import TruckDetail from './pages/TruckDetail';
import Markets from './pages/Markets';
import ExportProcess from './pages/ExportProcess';

function AppLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <LanguagePopup />
      {!isHome && <Header />}
      <div className={isHome ? '' : 'pt-20'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/truck/:id" element={<TruckDetail />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/export-process" element={<ExportProcess />} />
        </Routes>
      </div>
      {!isHome && <Footer />}
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
