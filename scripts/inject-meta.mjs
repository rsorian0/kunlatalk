import { readFileSync, writeFileSync, mkdirSync } from 'fs';

const BASE = 'https://kunlatalk.com.br';
const OG_IMAGE = `${BASE}/og-image.png`;

const routes = [
  {
    dir: 'dist',
    url: `${BASE}/`,
    title: 'Kunlatalk — Atendentes de IA com a identidade da sua marca',
    description: 'A Kunlatalk cria atendentes de IA com nome, rosto e personalidade próprios da sua marca. Vende, atende e fideliza pelo WhatsApp — 24 horas por dia.',
  },
  {
    dir: 'dist/sobre',
    url: `${BASE}/sobre`,
    title: 'Sobre a Kunlatek — Tecnologia sob medida para marcas que vivem da experiência',
    description: 'Kunlatek é a empresa por trás da Kunlatalk. Construímos tecnologia sob medida para marcas onde a experiência é parte do produto.',
  },
  {
    dir: 'dist/privacidade',
    url: `${BASE}/privacidade`,
    title: 'Política de Privacidade — Kunlatalk',
    description: 'Saiba como a Kunlatalk e a Kunlatek tratam seus dados pessoais. Política em conformidade com a LGPD.',
  },
  {
    dir: 'dist/termos',
    url: `${BASE}/termos`,
    title: 'Termos de Uso — Kunlatalk',
    description: 'Termos e condições de uso da plataforma Kunlatalk para empresas e usuários finais.',
  },
  {
    dir: 'dist/seguranca',
    url: `${BASE}/seguranca`,
    title: 'Segurança da Informação — Kunlatalk',
    description: 'Práticas e compromissos de segurança da plataforma Kunlatalk: criptografia, controle de acesso e conformidade.',
  },
];

const template = readFileSync('dist/index.html', 'utf8');

for (const route of routes) {
  const esc = (s) => s.replace(/"/g, '&quot;');

  let html = template
    // title
    .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
    // description
    .replace(/(<meta name="description" content=")[^"]*(")/,
      `$1${esc(route.description)}$2`)
    // og:title
    .replace(/(<meta property="og:title" content=")[^"]*(")/,
      `$1${esc(route.title)}$2`)
    // og:description
    .replace(/(<meta property="og:description" content=")[^"]*(")/,
      `$1${esc(route.description)}$2`)
    // og:url
    .replace(/(<meta property="og:url" content=")[^"]*(")/,
      `$1${route.url}$2`)
    // twitter:title
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/,
      `$1${esc(route.title)}$2`)
    // twitter:description
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/,
      `$1${esc(route.description)}$2`)
    // canonical
    .replace(/(<link rel="canonical" href=")[^"]*(")/,
      `$1${route.url}$2`);

  mkdirSync(route.dir, { recursive: true });
  writeFileSync(`${route.dir}/index.html`, html, 'utf8');
  console.log(`✓ ${route.dir}/index.html`);
}

console.log('Meta injection complete.');
