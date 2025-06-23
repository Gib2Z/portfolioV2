import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/Footer.css';

function Footer() {
  const [currentYear] = useState(new Date().getFullYear());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const footerElement = document.querySelector('.footer');
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, []);

  const quickLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/about', label: 'À Propos' },
    { path: '/projects', label: 'Projets' },
    { path: '/contact', label: 'Contact' }
  ];

  const socialLinks = [
    { 
      href: 'https://github.com/gibril-laiadhi', 
      icon: 'fab fa-github', 
      label: 'GitHub',
      color: '#333'
    },
    { 
      href: 'https://linkedin.com/in/gibril-laiadhi', 
      icon: 'fab fa-linkedin-in', 
      label: 'LinkedIn',
      color: '#0077b5'
    },
    { 
      href: 'mailto:gibril.laiadhi@email.com', 
      icon: 'fas fa-envelope', 
      label: 'Email',
      color: '#ea4335'
    },
    { 
      href: 'https://twitter.com/gibril_laiadhi', 
      icon: 'fab fa-twitter', 
      label: 'Twitter',
      color: '#1da1f2'
    }
  ];

  const services = [
    'Développement Web',
    'Applications Mobile',
    'Administration Système',
    'Cybersécurité',
    'Infrastructure Cloud',
    'DevOps & CI/CD'
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={`footer ${isVisible ? 'animate-in' : ''}`}>
      {/* Vague décorative */}
      <div className="footer-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="footer-container">
        {/* Section principale */}
        <div className="footer-main">
          {/* À propos */}
          <div className="footer-section about-section">
            <div className="footer-brand">
              <h3>Gibril Laiadhi</h3>
              <span className="brand-subtitle">DevOps Engineer</span>
            </div>
            <p className="footer-description">
              Passionné par l'innovation technologique, je crée des solutions robustes 
              qui transforment vos idées en réalité numérique. Spécialisé en DevOps, 
              développement full-stack et cybersécurité.
            </p>
            {/* <div className="footer-stats">
              <div className="stat">
                <span className="stat-number">10+</span>
                <span className="stat-label">Projets</span>
              </div>
              <div className="stat">
                <span className="stat-number">3+</span>
                <span className="stat-label">Années</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Satisfaction</span>
              </div>
            </div> */}
          </div>

          {/* Liens rapides */}
          <div className="footer-section links-section">
            <h4>Navigation</h4>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="footer-link">
                    <i className="fas fa-chevron-right"></i>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section services-section">
            <h4>Expertises</h4>
            <ul className="footer-services">
              {services.map((service, index) => (
                <li key={index} className="service-item">
                  <i className="fas fa-check"></i>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section contact-section">
            <h4>Restons connectés</h4>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>gibril.laiadhi@email.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>+33 760306413</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>France</span>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="newsletter">
              <h5>Newsletter</h5>
              <p>Recevez mes derniers projets et articles</p>
              <form className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Votre email"
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="footer-social-section">
          <h4>Suivez-moi</h4>
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a 
                key={index}
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                style={{'--social-color': social.color}}
                aria-label={social.label}
              >
                <i className={social.icon}></i>
                <span className="social-tooltip">{social.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>
                &copy; {currentYear} <strong>Gibril Laiadhi</strong>. 
              </p>
            </div>
            
            {/* <div className="footer-bottom-links">
              <Link to="/privacy">Confidentialité</Link>
              <Link to="/terms">Conditions</Link>
              <Link to="/sitemap">Plan du site</Link>
            </div> */}

            <button 
              className="scroll-to-top-footer"
              onClick={scrollToTop}
              aria-label="Remonter en haut"
            >
              <i className="fas fa-arrow-up"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Particules d'arrière-plan */}
      <div className="footer-particles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className={`particle particle-${i}`}></div>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
