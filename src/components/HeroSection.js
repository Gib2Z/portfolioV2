import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/HeroSection.css';
import profileImage from '../images/65397801-9227-40b4-a8d9-4c7c0bea4ee8-.jpg';

function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const skills = [
    "DevOps Engineer",
    "Développeur Full-Stack", 
    "Administrateur Système",
    "Expert en Cybersécurité",
    "Architecte Cloud"
  ];

  const stats = [
    { number: "3+", label: "Années d'expérience" },
    { number: "10+", label: "Projets réalisés" },
    { number: "15+", label: "Technologies maîtrisées" },
    // { number: "100%", label: "Satisfaction client" }
  ];

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Contenu principal */}
        <div className="hero-content">
          <div className={`intro-animation ${animationStarted ? 'started' : ''}`}>
            <div className="greeting">
              <span className="wave">👋</span>
              <span>Salut, je suis</span>
            </div>
            
            <h1 className="hero-name">
              <span className="first-name">Gibril</span>
              <span className="last-name">Laiadhi</span>
            </h1>



            <p className="hero-description">
              Passionné par l'innovation technologique, je crée des solutions robustes 
              qui allient <strong>développement </strong>, <strong>infrastructure cloud </strong> 
              et <strong>sécurité </strong>. Mon expertise couvre l'ensemble du cycle 
              de vie des applications, de la conception à la mise en production.
            </p>

            <div className="hero-actions">
              <Link to="/contact" className="cta-primary">
                <span>Collaborons ensemble</span>
                <i className="arrow">→</i>
              </Link>
              
              <Link to="/projects" className="cta-secondary">
                <span>Voir mes projets</span>
                <i className="icon">🚀</i>
              </Link>
            </div>

            <div className="social-links">
              <a href="https://linkedin.com/in/gibril-laiadhi" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/gibril-laiadhi" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href="mailto:gibril.laiadhi@email.com">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Image et animations */}
        <div className="hero-visual">
          <div className="image-container">
            <div className={`profile-image ${imageLoaded ? 'loaded' : ''}`}>
              <img 
                src={profileImage} 
                alt="Gibril Laiadhi - DevOps Engineer"
                onLoad={() => setImageLoaded(true)}
              />
              <div className="image-overlay">
                <div className="status-indicator">
                  <span className="status-dot"></span>
                  Disponible pour projets
                </div>
              </div>
            </div>
            
            {/* Éléments décoratifs flottants */}
            <div className="floating-elements">
              <div className="tech-badge badge-1">⚡ DevOps</div>
              <div className="tech-badge badge-2">🔧 Infrastructure</div>
              <div className="tech-badge badge-3">🛡️ Sécurité</div>
              <div className="tech-badge badge-4">☁️ Cloud</div>
            </div>
          </div>
        </div>
      </div>

      {/* Section statistiques */}
      <div className="hero-stats">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className={`stat-item ${animationStarted ? 'animate' : ''}`}>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
        <span>Découvrir</span>
      </div>
    </section>
  );
}

export default HeroSection;
