import React, { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import APropos from './APropos';
import ProjectsPreview from './Project';
import ServicesSection from './APropos';
import ContactPreview from './Contact';
import Footer from './Footer';
import '../style/Accueil.css';

function Accueil() {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleSections, setVisibleSections] = useState([]);

  useEffect(() => {
    // Simulation du chargement initial
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Animation progressive des sections
      const sections = ['hero', 'about', 'services', 'projects', 'contact'];
      sections.forEach((section, index) => {
        setTimeout(() => {
          setVisibleSections(prev => [...prev, section]);
        }, index * 200);
      });
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loader">
          <div className="loader-circle"></div>
          <div className="loader-text">
            <h2>Gibril Laiadhi</h2>
            <p>Chargement du portfolio...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="accueil">
      {/* Hero Section */}
      <div className={`section-wrapper ${visibleSections.includes('hero') ? 'visible' : ''}`}>
        <HeroSection />
      </div>



      {/* Particles d'arrière-plan */}
      <div className="background-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i}`}></div>
        ))}
      </div>

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
}

// Composant pour remonter en haut
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button 
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Remonter en haut"
    >
      ↑
    </button>
  );
}

export default Accueil;
