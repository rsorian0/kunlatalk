import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo.jsx';

const WHATSAPP_DEMO =
  'https://wa.me/5582936180690?text=Ol%C3%A1%21%20Gostaria%20de%20agendar%20uma%20demonstra%C3%A7%C3%A3o%20da%20Kunlatalk.';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav id="nav" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <Link to="/" aria-label="Kunlatalk" onClick={closeMenu}>
          <BrandLogo className="logo-mark" fill="#4711cb" />
        </Link>
        <div className="nav-links">
          <Link to="/#produto">Produto</Link>
          <Link to="/#capacidades">Capacidades</Link>
          <Link to="/#publico">Para quem</Link>
          <Link to="/#faq">FAQ</Link>
          <a href={WHATSAPP_DEMO} className="cta-nav" target="_blank" rel="noopener">
            Agendar demo
          </a>
        </div>
        <button
          className="nav-hamburger"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          aria-controls="nav-mobile"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" focusable="false">
            <rect x="2" y="5" width="18" height="2" rx="1" fill="currentColor"/>
            <rect x="2" y="10" width="18" height="2" rx="1" fill="currentColor"/>
            <rect x="2" y="15" width="18" height="2" rx="1" fill="currentColor"/>
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div
          className="nav-mobile-overlay"
          aria-hidden="true"
          onClick={closeMenu}
        />
      )}

      <div
        id="nav-mobile"
        className={`nav-mobile${menuOpen ? ' open' : ''}`}
        role="dialog"
        aria-label="Menu de navegação"
      >
        <button
          className="nav-mobile-close"
          aria-label="Fechar menu"
          onClick={closeMenu}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <nav>
          <Link to="/#produto" onClick={closeMenu}>Produto</Link>
          <Link to="/#capacidades" onClick={closeMenu}>Capacidades</Link>
          <Link to="/#publico" onClick={closeMenu}>Para quem</Link>
          <Link to="/#faq" onClick={closeMenu}>FAQ</Link>
          <Link to="/sobre" onClick={closeMenu}>Sobre</Link>
          <a
            href={WHATSAPP_DEMO}
            className="cta-nav"
            target="_blank"
            rel="noopener"
            onClick={closeMenu}
          >
            Agendar demo
          </a>
        </nav>
      </div>
    </nav>
  );
}
