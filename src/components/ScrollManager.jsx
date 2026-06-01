import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Em troca de rota: rola para o topo.
// Quando a URL tem hash (ex.: /#produto), rola suavemente ate o elemento.
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // espera o conteudo (injetado) montar
      const id = decodeURIComponent(hash.slice(1));
      const tryScroll = (attempt = 0) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (attempt < 10) {
          setTimeout(() => tryScroll(attempt + 1), 60);
        }
      };
      tryScroll();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
