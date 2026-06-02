import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BrandLogo from './BrandLogo.jsx';
import { trackEvent } from '../analytics.js';

const WHATSAPP_DEMO =
  'https://wa.me/5582936180690?text=Ol%C3%A1%21%20Gostaria%20de%20agendar%20uma%20demonstra%C3%A7%C3%A3o%20da%20Kunlatalk.';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fecha o menu ao trocar de rota ou âncora
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, hash]);

  // Fecha com a tecla ESC
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav id="nav" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <Link to="/" aria-label="Kunlatalk" onClick={closeMenu}>
          <BrandLogo className="logo-mark" fill="#4711cb" />
        </Link>

        {/* Links — visíveis só no desktop */}
        <div className="nav-links">
          <Link to="/#produto">Produto</Link>
          <Link to="/#capacidades">Capacidades</Link>
          <Link to="/#publico">Para quem</Link>
          <a href={WHATSAPP_DEMO} className="cta-nav" target="_blank" rel="noopener"
            onClick={() => trackEvent('contato_whatsapp', { origem: 'nav' })}>
            Agendar demo
          </a>
        </div>

        {/* Ações mobile — CTA sempre visível + hambúrguer */}
        <div className="nav-mobile-actions">
          <a href={WHATSAPP_DEMO} className="cta-nav" target="_blank" rel="noopener"
            onClick={() => trackEvent('contato_whatsapp', { origem: 'nav' })}>
            Agendar demo
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="nav-mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Painel de navegação mobile */}
      <div id="nav-mobile-menu" className={`nav-mobile${menuOpen ? ' open' : ''}`}>
        <Link to="/#produto" onClick={closeMenu}>Produto</Link>
        <Link to="/#capacidades" onClick={closeMenu}>Capacidades</Link>
        <Link to="/#publico" onClick={closeMenu}>Para quem</Link>
      </div>
    </nav>
  );
}
