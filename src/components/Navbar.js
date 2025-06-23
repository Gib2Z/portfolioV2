import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../style/Navbar.css';

function Navbar() {
  const [userRole, setUserRole] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  
  const location = useLocation();
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);
  const profileMenuRef = useRef(null);

  // Navigation items
  const navigationItems = [
    { path: '/', label: 'Accueil', icon: 'fas fa-home' },
    { path: '/apropos', label: 'À propos', icon: 'fas fa-user' },
    { path: '/projects', label: 'Projets', icon: 'fas fa-code' },
    { path: '/contact', label: 'Contact', icon: 'fas fa-envelope' }
  ];

  const adminItems = [
    { path: '/add-project', label: 'Ajouter Projet', icon: 'fas fa-plus-circle' },
    { path: '/admin-dashboard', label: 'Dashboard', icon: 'fas fa-chart-line' }
  ];

  // Hook pour détecter le scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hook pour la gestion du rôle utilisateur
  useEffect(() => {
    const updateRole = () => {
      const role = localStorage.getItem('role');
      setUserRole(role);
    };

    updateRole();
    window.addEventListener('storage', updateRole);
    
    return () => window.removeEventListener('storage', updateRole);
  }, []);

  // Hook pour fermer les menus en cliquant ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Hook pour suivre la page active
  useEffect(() => {
    setActiveLink(location.pathname);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isAdmin = () => userRole === 'admin';

  const handleLogout = () => {
    // Animation de déconnexion
    document.body.classList.add('logging-out');
    
    setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      setUserRole(null);
      setIsProfileMenuOpen(false);
      navigate('/');
      document.body.classList.remove('logging-out');
    }, 300);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsProfileMenuOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo/Brand */}
          <Link to="/" className="navbar-brand">
            <div className="brand-content">
              <div className="brand-icon">
                <span className="brand-letter">G</span>
                <div className="brand-dot"></div>
              </div>
              <div className="brand-text">
                <span className="brand-name">Gibril</span>
                <span className="brand-title">DevOps</span>
              </div>
            </div>
          </Link>

          {/* Navigation principale - Desktop */}
          <div className="nav-center">
            <ul className="nav-list">
              {navigationItems.map((item) => (
                <li key={item.path} className="nav-item">
                  <Link 
                    to={item.path}
                    className={`nav-link ${activeLink === item.path ? 'active' : ''}`}
                    onClick={() => setActiveLink(item.path)}
                  >
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                    <div className="nav-link-bg"></div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions à droite */}
          <div className="nav-actions">
            {/* Bouton CV */}
            <a 
              href="/CV.pdf" 
              className="download-btn"
              download
              aria-label="Télécharger le CV"
            >
              <i className="fas fa-download"></i>
              <span>CV</span>
              <div className="btn-glow"></div>
            </a>

            {/* Menu Admin/Profile */}
            {isAdmin() && (
              <div className="profile-menu" ref={profileMenuRef}>
                <button 
                  className="profile-toggle"
                  onClick={toggleProfileMenu}
                  aria-label="Menu administrateur"
                >
                  <div className="profile-avatar">
                    <i className="fas fa-user-shield"></i>
                  </div>
                  <div className="profile-indicator"></div>
                </button>

                <div className={`profile-dropdown ${isProfileMenuOpen ? 'open' : ''}`}>
                  <div className="dropdown-header">
                    <div className="user-info">
                      <h4>Administrateur</h4>
                      <p>Gibril Laiadhi</p>
                    </div>
                  </div>
                  
                  <div className="dropdown-content">
                    {adminItems.map((item) => (
                      <Link 
                        key={item.path}
                        to={item.path}
                        className="dropdown-item"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <i className={item.icon}></i>
                        <span>{item.label}</span>
                      </Link>
                    ))}
                    
                    <div className="dropdown-divider"></div>
                    
                    <button 
                      className="dropdown-item logout-btn"
                      onClick={handleLogout}
                    >
                      <i className="fas fa-sign-out-alt"></i>
                      <span>Se déconnecter</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Theme Toggle */}
            <button 
              className="theme-toggle"
              aria-label="Changer le thème"
            >
              <i className="fas fa-moon"></i>
            </button>

            {/* Menu Mobile Toggle */}
            <button 
              className={`mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Menu de navigation"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Indicateur de progression de lecture */}
        <div className="reading-progress">
          <div className="progress-bar"></div>
        </div>
      </nav>

      {/* Menu Mobile */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} ref={mobileMenuRef}>
        <div className="mobile-menu-header">
          <h3>Navigation</h3>
          <button 
            className="close-mobile-menu"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="mobile-menu-content">
          <ul className="mobile-nav-list">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={`mobile-nav-link ${activeLink === item.path ? 'active' : ''}`}
                  onClick={() => {
                    setActiveLink(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                  <i className="fas fa-chevron-right"></i>
                </Link>
              </li>
            ))}
            
            {isAdmin() && (
              <>
                <li className="mobile-divider"><span>Administration</span></li>
                {adminItems.map((item) => (
                  <li key={item.path}>
                    <Link 
                      to={item.path}
                      className="mobile-nav-link admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <i className={item.icon}></i>
                      <span>{item.label}</span>
                      <i className="fas fa-chevron-right"></i>
                    </Link>
                  </li>
                ))}
                
                <li>
                  <button 
                    className="mobile-nav-link logout"
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Se déconnecter</span>
                  </button>
                </li>
              </>
            )}
          </ul>

          <div className="mobile-menu-footer">
            <a 
              href="/CV.pdf" 
              className="mobile-download-btn"
              download
            >
              <i className="fas fa-download"></i>
              <span>Télécharger CV</span>
            </a>
          </div>
        </div>
      </div>

      {/* Overlay pour le menu mobile */}
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
    </>
  );
}

export default Navbar;
