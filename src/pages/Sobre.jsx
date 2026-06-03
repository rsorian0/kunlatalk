import HtmlContent from '../components/HtmlContent.jsx';
import usePageMeta from '../usePageMeta.js';
import html from '../content/sobre.html?raw';

export default function Sobre() {
  usePageMeta(
    'Sobre a Kunlatek - Tecnologia sob medida para marcas que vivem da experiência',
    'Kunlatek é a empresa por trás da Kunlatalk. Construímos tecnologia sob medida para marcas onde a experiência é parte do produto.'
  );
  return <HtmlContent html={html} />;
}
