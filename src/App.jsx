import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import ScrollManager from './components/ScrollManager.jsx';
import Landing from './pages/Landing.jsx';
import Sobre from './pages/Sobre.jsx';
import Privacidade from './pages/Privacidade.jsx';
import Termos from './pages/Termos.jsx';
import Seguranca from './pages/Seguranca.jsx';

export default function App() {
  return (
    <>
      <ScrollManager />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/termos" element={<Termos />} />
          <Route path="/seguranca" element={<Seguranca />} />
          {/* fallback: qualquer rota desconhecida cai na home */}
          <Route path="*" element={<Landing />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
