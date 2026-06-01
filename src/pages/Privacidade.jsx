import HtmlContent from '../components/HtmlContent.jsx';
import usePageMeta from '../usePageMeta.js';
import html from '../content/privacidade.html?raw';

export default function Privacidade() {
  usePageMeta(
    'Políticas de Privacidade — Kunlatalk',
    'Políticas de Privacidade da Kunlatalk, produto da Kunlatek. Como tratamos dados pessoais em conformidade com a LGPD e as políticas da Meta/WhatsApp Business.'
  );
  return <HtmlContent html={html} />;
}
