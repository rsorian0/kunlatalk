import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getConsent, saveConsent, needsConsent, trackPageView } from '../analytics.js';

const ICONS = {
  shield: (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6l7-3z" />
      <circle cx="12" cy="11" r="1.5" /><path d="M12 12.5V15" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19h16" /><rect x="6" y="11" width="3" height="6" />
      <rect x="11" y="7" width="3" height="10" /><rect x="16" y="13" width="3" height="4" />
    </svg>
  ),
  speaker: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10v4a1 1 0 0 0 1 1h3l5 4V5L8 9H5a1 1 0 0 0-1 1z" /><path d="M17 9a4 4 0 0 1 0 6" />
    </svg>
  ),
  cookie: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3a9 9 0 1 0 9 9 4 4 0 0 1-4-4 4 4 0 0 1-4-4 9 9 0 0 0-1-1z" />
      <circle cx="9" cy="11" r="1" /><circle cx="13" cy="14.5" r="1" /><circle cx="15" cy="9" r="1" />
    </svg>
  ),
};

const CATS = [
  { key: 'necessarios', title: 'Necessários', icon: ICONS.lock, locked: true,
    desc: 'Essenciais para o site funcionar. Sempre ativos.' },
  { key: 'estatisticas', title: 'Estatísticas', icon: ICONS.chart,
    desc: 'Google Analytics — mede acessos e ajuda a melhorar o site.' },
  { key: 'marketing', title: 'Marketing', icon: ICONS.speaker, soon: true,
    desc: 'Anúncios e remarketing (ex.: Meta Pixel), quando ativarmos.' },
];

export default function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState({ estatisticas: false, marketing: false });

  useEffect(() => {
    if (needsConsent()) setOpen(true);
  }, []);

  const finish = (choice) => {
    saveConsent(choice);
    if (choice.estatisticas) trackPageView(window.location.pathname + window.location.hash);
    setOpen(false);
    setShowPrefs(false);
  };

  const acceptAll = () => finish({ estatisticas: true, marketing: true });
  const rejectAll = () => finish({ estatisticas: false, marketing: false });
  const saveChoices = () => finish({ estatisticas: prefs.estatisticas, marketing: prefs.marketing });

  const openPrefs = () => {
    const c = getConsent();
    setPrefs({ estatisticas: !!(c && c.estatisticas), marketing: !!(c && c.marketing) });
    setShowPrefs(true);
  };

  const reopen = () => {
    openPrefs();
    setOpen(true);
  };

  if (!open) {
    return (
      <button type="button" className="consent-fab" aria-label="Preferências de cookies" onClick={reopen}>
        {ICONS.cookie}
      </button>
    );
  }

  return (
    <div className="consent" role="dialog" aria-modal="false" aria-label="Preferências de privacidade">
      <div className="consent-inner">
        <div className="consent-head">
          {ICONS.shield}
          <strong>Sua privacidade</strong>
        </div>
        <p className="consent-text">
          Usamos cookies para fazer o site funcionar e, com sua permissão, para entender como ele é
          usado. Você pode aceitar tudo, recusar ou escolher por categoria. Veja a{' '}
          <Link to="/privacidade">Política de Privacidade</Link>.
        </p>

        {showPrefs && (
          <div className="consent-cats">
            {CATS.map((c) => {
              const on = c.locked ? true : prefs[c.key];
              return (
                <div className="consent-cat" key={c.key}>
                  <span className="consent-cat-ic">{c.icon}</span>
                  <div className="consent-cat-txt">
                    <span className="consent-cat-title">
                      {c.title}
                      {c.soon && <span className="consent-cat-soon"> · em breve</span>}
                    </span>
                    <span className="consent-cat-desc">{c.desc}</span>
                  </div>
                  <button
                    type="button"
                    className="consent-tog"
                    role="switch"
                    aria-checked={on}
                    aria-label={c.title}
                    data-on={on ? 1 : 0}
                    data-lock={c.locked ? 1 : 0}
                    disabled={c.locked}
                    onClick={() => !c.locked && setPrefs((p) => ({ ...p, [c.key]: !p[c.key] }))}
                  >
                    <span className="knob" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div className="consent-actions">
          <button type="button" className="consent-btn ghost" onClick={rejectAll}>Rejeitar todos</button>
          {showPrefs ? (
            <button type="button" className="consent-btn ghost" onClick={saveChoices}>Salvar escolhas</button>
          ) : (
            <button type="button" className="consent-btn ghost" onClick={openPrefs}>Personalizar</button>
          )}
          <button type="button" className="consent-btn solid" onClick={acceptAll}>Aceitar todos</button>
        </div>
      </div>
    </div>
  );
}
