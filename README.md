# Kunlatalk — site em React

Site institucional da Kunlatalk convertido de HTML estático para **React + Vite**,
pronto para publicar no **GitHub Pages**. O visual, os textos e as animações são
fiéis ao site original.

## Páginas

| Rota           | Página                  |
| -------------- | ----------------------- |
| `/`            | Landing (página inicial) |
| `/sobre`       | Sobre a Kunlatek        |
| `/privacidade` | Políticas de Privacidade |
| `/termos`      | Termo de Uso            |
| `/seguranca`   | Segurança               |

## Rodar localmente

Pré-requisito: [Node.js](https://nodejs.org) 18 ou superior.

```bash
npm install      # instala as dependências (só na primeira vez)
npm run dev      # abre o site em http://localhost:5173
```

Outros comandos:

```bash
npm run build    # gera a versão de produção na pasta dist/
npm run preview  # visualiza o build de produção localmente
```

## Estrutura

```
src/
  main.jsx              # ponto de entrada
  App.jsx               # rotas (React Router)
  styles/site.css       # todo o CSS do site
  components/
    Nav.jsx             # menu fixo do topo
    Footer.jsx          # rodapé
    BrandLogo.jsx       # logo da Kunlatalk (SVG)
    KunlatekLogo.jsx    # assinatura "Kunlatek" (SVG)
    SocialIcon.jsx      # ícones de redes sociais
    HtmlContent.jsx     # renderiza o conteúdo + animações + links
    VideoModal.jsx      # modal do vídeo do YouTube
    ScrollManager.jsx   # rola para o topo / âncoras ao trocar de página
  pages/                # uma página por rota
  content/              # o conteúdo (HTML) de cada página
```

> O conteúdo de cada página vive em `src/content/*.html`. Para editar textos,
> mude esses arquivos. Para mudar o menu ou o rodapé, edite `Nav.jsx` / `Footer.jsx`.

## Publicar no GitHub Pages

O projeto já vem com um fluxo automático (GitHub Actions). Passo a passo:

1. **Crie um repositório** no GitHub com o nome `kunlatalk`.

2. **Envie o projeto** para o repositório (na pasta do projeto). Troque
   `SEU-USUARIO` pelo seu usuário do GitHub:

   ```bash
   git init
   git add .
   git commit -m "Site Kunlatalk em React"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/kunlatalk.git
   git push -u origin main
   ```

3. **Ative o Pages**: no GitHub, vá em **Settings → Pages** e, em
   **Build and deployment → Source**, escolha **GitHub Actions**.

4. **Configure o domínio próprio** no GitHub: em **Settings → Pages**, no campo
   **Custom domain**, digite `kunlatalk.com.br` e clique em **Save**.
   (O projeto já inclui o arquivo `public/CNAME`, então o domínio também é
   aplicado automaticamente a cada deploy.)

5. **Aponte o DNS** no painel onde o domínio `kunlatalk.com.br` está registrado
   (provavelmente o **Registro.br**). Crie estes registros:

   **Registros A** (domínio raiz `kunlatalk.com.br` — campo "host"/"nome" em
   branco ou `@`):

   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

   **Registros AAAA** (IPv6 — opcional, mesmo host raiz):

   ```
   2606:50c0:8000::153
   2606:50c0:8001::153
   2606:50c0:8002::153
   2606:50c0:8003::153
   ```

   **CNAME** para o `www` (host `www` → aponta para `SEU-USUARIO.github.io`),
   assim `www.kunlatalk.com.br` também funciona e redireciona para a raiz.

6. Aguarde a propagação do DNS (de alguns minutos até ~24h). Quando concluir,
   volte em **Settings → Pages** e marque **Enforce HTTPS**.

O site ficará no ar em **https://kunlatalk.com.br**. A cada `git push` na branch
`main`, ele é recompilado e republicado automaticamente.

### Detalhes técnicos

- O build já está configurado para servir a partir da **raiz** (`VITE_BASE: /`
  no workflow), como exige um domínio próprio.
- O arquivo `public/404.html` garante que rotas como `/sobre` funcionem mesmo se
  o visitante abrir o link direto ou apertar F5 (o GitHub Pages não tem servidor,
  então ele redireciona de volta para o app, que mostra a página certa).
- O arquivo `public/CNAME` fixa o domínio `kunlatalk.com.br` no deploy.

### Se mudar de ideia (sem domínio próprio)

Para publicar em `SEU-USUARIO.github.io/kunlatalk/` em vez do domínio:
1. Apague o arquivo `public/CNAME`.
2. No `.github/workflows/deploy.yml`, troque `VITE_BASE: /` por
   `VITE_BASE: /${{ github.event.repository.name }}/`.
3. No `public/404.html`, mude `var pathSegmentsToKeep = 0;` para `= 1;`.

## Observações

- Os links internos usam o React Router (navegação sem recarregar a página).
- Links externos (WhatsApp, Instagram, YouTube) abrem em nova aba.
- O contato de WhatsApp e as redes sociais estão em `Nav.jsx` e `Footer.jsx`.
