import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo.jsx';
import { trackEvent } from '../analytics.js';

const WHATSAPP_DEMO =
  'https://wa.me/5582936180690?text=Ol%C3%A1%21%20Gostaria%20de%20agendar%20uma%20demonstra%C3%A7%C3%A3o%20da%20Kunlatalk.';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav id="nav" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <Link to="/" aria-label="Kunlatalk">
          <BrandLogo className="logo-mark" fill="#4711cb" />
        </Link>
        <div className="nav-links">
          <Link to="/#produto">Produto</Link>
          <Link to="/#capacidades">Capacidades</Link>
          <Link to="/#publico">Para quem</Link>
          <a href={WHATSAPP_DEMO} className="cta-nav" target="_blank" rel="noopener"
            onClick={() => trackEvent('contato_whatsapp', { origem: 'nav' })}>
            Agendar demo
          </a>
        </div>
      </div>
    </nav>
  );
}
