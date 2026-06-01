import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base` precisa apontar para o subcaminho do GitHub Pages.
//
//  - Em projeto comum (https://USUARIO.github.io/REPOSITORIO/) o base e "/REPOSITORIO/".
//    O workflow do GitHub Actions injeta isso automaticamente via VITE_BASE,
//    usando o nome do repositorio — voce nao precisa editar nada.
//
//  - Para rodar localmente (npm run dev / preview), o base e "/".
//
//  - Se voce usar dominio proprio OU um repositorio chamado USUARIO.github.io,
//    defina VITE_BASE="/" (veja o README).
const base = process.env.VITE_BASE || '/';

export default defineConfig({
  base,
  plugins: [react()],
});
