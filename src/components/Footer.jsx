import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo.jsx';
import KunlatekLogo from './KunlatekLogo.jsx';
import SocialIcon from './SocialIcon.jsx';
import { trackEvent } from '../analytics.js';

const WHATSAPP = 'https://wa.me/5582936180690';
const WHATSAPP_DEMO =
  'https://wa.me/5582936180690?text=Ol%C3%A1%21%20Gostaria%20de%20agendar%20uma%20demonstra%C3%A7%C3%A3o%20da%20Kunlatalk.';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <BrandLogo className="footer-brand-logo" fill="#ffffff" />
            <p>
              Atendentes de IA com identidade própria. Construídas sob medida,
              treinadas com a alma da sua marca.
            </p>
            <div className="footer-social">
              <a href={WHATSAPP} target="_blank" rel="noopener" aria-label="WhatsApp">
                <SocialIcon name="whatsapp" />
              </a>
              <a
                href="https://www.instagram.com/kunlatalk/"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
              >
                <SocialIcon name="instagram" />
              </a>
              <a
                href="https://www.youtube.com/@Kunlatalk"
                target="_blank"
                rel="noopener"
                aria-label="YouTube"
              >
                <SocialIcon name="youtube" />
              </a>
            </div>
            <div className="kunlatek-signature">
              <span className="signature-label">Um produto</span>
              <a
                href="https://kunlatek.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar o site da Kunlatek"
                className="kunlatek-logo-link"
              >
                <KunlatekLogo className="kunlatek-logo" />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h5>Produto</h5>
            <ul>
              <li><Link to="/#produto">Personalização</Link></li>
              <li><Link to="/#capacidades">Capacidades</Link></li>
              <li><Link to="/#publico">Para quem</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Empresa</h5>
            <ul>
              <li><Link to="/sobre">Sobre a Kunlatek</Link></li>
              <li><a href={WHATSAPP_DEMO} target="_blank" rel="noopener"
                onClick={() => trackEvent('contato_whatsapp', { origem: 'footer' })}>Demonstração</a></li>
              <li><a href={WHATSAPP} target="_blank" rel="noopener"
                onClick={() => trackEvent('contato_whatsapp', { origem: 'footer' })}>Contato</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Recursos</h5>
            <ul>
              <li><Link to="/privacidade">Política de privacidade</Link></li>
              <li><Link to="/termos">Termos de uso</Link></li>
              <li><Link to="/seguranca">Segurança</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Kunlatalk. Todos os direitos reservados. · Kunlatek Tecnologia LTDA · CNPJ 36.899.179/0001-08</span>
          <span>Feito no Brasil 🇧🇷</span>
        </div>
      </div>
    </footer>
  );
}
