import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Renderiza o conteudo (HTML fiel ao original) e adiciona o comportamento
// que antes vinha dos <script>: animacoes .reveal via IntersectionObserver,
// navegacao SPA em links internos e abertura do modal de video.
export default function HtmlContent({ html, onOpenVideo }) {
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // 1) Scroll reveals
    const reveals = root.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    reveals.forEach((el) => io.observe(el));

    // 2) Cliques: modal de video + navegacao interna
    const onClick = (e) => {
      const videoBtn = e.target.closest('[data-open-video]');
      if (videoBtn) {
        e.preventDefault();
        onOpenVideo?.();
        return;
      }
      const link = e.target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      const targetBlank = link.getAttribute('target') === '_blank';
      // links internos (rota) -> React Router, sem recarregar a pagina
      const isInternal = href.startsWith('/') && !href.startsWith('//') && !targetBlank;
      if (isInternal) {
        e.preventDefault();
        navigate(href);
      }
      // links externos e ancoras (#) seguem o comportamento padrao
    };
    root.addEventListener('click', onClick);

    return () => {
      io.disconnect();
      root.removeEventListener('click', onClick);
    };
  }, [html, onOpenVideo, navigate]);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
