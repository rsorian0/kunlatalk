// Consentimento por categorias + carregamento condicional de analytics (LGPD).
// Hoje: Google Analytics 4 (categoria "estatisticas"). Futuro: Meta Pixel (categoria "marketing").
// Nada não essencial carrega sem consentimento.

export const GA_ID = 'G-H27XVQX3Z6';
export const PIXEL_ID = null; // <- quando houver Pixel, coloque o ID e implemente loadPixel()

// Versão da política. Ao alterar a Política de Privacidade, incremente esta data:
// isso invalida consentimentos antigos e reabre o banner para o usuário reconfirmar.
export const POLICY_VERSION = '2026-06-01';

const KEY = 'kunlatalk_consent';
let gaLoaded = false;

export function getConsent() {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
}

// Precisa pedir consentimento? (sem registro, ou registro de versão antiga)
export function needsConsent() {
  const c = getConsent();
  return !c || c.v !== POLICY_VERSION;
}

export function hasCategory(cat) {
  const c = getConsent();
  return !!(c && c.v === POLICY_VERSION && c[cat]);
}

// Grava a escolha com data/hora e versão da política, e aplica imediatamente.
export function saveConsent({ estatisticas, marketing }) {
  const c = {
    v: POLICY_VERSION,
    ts: new Date().toISOString(),
    estatisticas: !!estatisticas,
    marketing: !!marketing,
  };
  try {
    localStorage.setItem(KEY, JSON.stringify(c));
  } catch {
    /* localStorage indisponível: segue sem persistir */
  }
  applyConsent();
  return c;
}

function loadGA() {
  if (gaLoaded || !GA_ID) return;
  gaLoaded = true;

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { send_page_view: false }); // controlamos page_view por rota
}

// function loadPixel() { /* futuro: usar PIXEL_ID */ }

// Carrega cada serviço conforme a categoria consentida.
export function applyConsent() {
  if (hasCategory('estatisticas')) loadGA();
  // if (hasCategory('marketing') && PIXEL_ID) loadPixel();
}

export function trackPageView(path) {
  if (!hasCategory('estatisticas') || !window.gtag) return;
  window.gtag('event', 'page_view', { page_path: path });
}

export function trackEvent(name, params = {}) {
  if (!hasCategory('estatisticas') || !window.gtag) return;
  window.gtag('event', name, params);
}
