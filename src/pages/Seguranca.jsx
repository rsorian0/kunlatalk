import HtmlContent from '../components/HtmlContent.jsx';
import usePageMeta from '../usePageMeta.js';
import html from '../content/seguranca.html?raw';

export default function Seguranca() {
  usePageMeta(
    'Segurança — Kunlatalk',
    'Como a Kunlatalk protege dados, infraestrutura e operações. Detalhamento técnico sobre Meta, DeepSeek, MongoDB, controles de acesso, retenção e resposta a incidentes.'
  );
  return <HtmlContent html={html} />;
}
