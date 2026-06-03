import HtmlContent from '../components/HtmlContent.jsx';
import usePageMeta from '../usePageMeta.js';
import html from '../content/termos.html?raw';

export default function Termos() {
  usePageMeta(
    'Termo de Uso - Kunlatalk',
    'Termo de Uso da Kunlatalk para usuários finais que interagem com atendentes virtuais de inteligência artificial via WhatsApp Business.'
  );
  return <HtmlContent html={html} />;
}
