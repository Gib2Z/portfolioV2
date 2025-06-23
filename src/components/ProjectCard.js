import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/ProjectCard.css';

function ProjectCard({ project }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const imageUrl = project.images && project.images.length > 0 
    ? `data:image/png;base64,${project.images[0]}` 
    : null;

  // Fonction pour obtenir l'icône de la catégorie
  const getCategoryIcon = (category) => {
    const icons = {
      'Développement web': '🌐',
      'Développement mobile': '📱',
      'Administration de Systeme et Reseau': '🔧',
      'Réseau & Cybersécurité': '🔒',
      'Développement (Web, Mobile, Logiciel)': '💻'
    };
    return icons[category] || '⚡';
  };

  // Fonction pour obtenir la couleur de la catégorie
  const getCategoryColor = (category) => {
    const colors = {
      'Développement web': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'Développement mobile': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'Administration de Systeme et Reseau': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'Réseau & Cybersécurité': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'Développement (Web, Mobile, Logiciel)': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    };
    return colors[category] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  };

  // Extraire un aperçu de la description
  const getDescriptionPreview = (description) => {
    if (!description) return '';
    return description.length > 120 
      ? description.substring(0, 120) + '...' 
      : description;
  };

  // Extraire les principales technologies
  const getTechPreview = (languages) => {
    if (!languages) return [];
    return languages.split(', ').slice(0, 3);
  };

  return (
    <div className="project-card">
      <Link to={`/projects/${project.id}`} className="project-link">
        {/* Image container avec placeholder */}
        <div className="project-image-container">
          {imageUrl && !imageError ? (
            <>
              {!imageLoaded && (
                <div className="image-placeholder">
                  <div className="placeholder-spinner"></div>
                </div>
              )}
              <img
                src={imageUrl}
                alt={project.title}
                className={`project-image ${imageLoaded ? 'loaded' : ''}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageError(true);
                  setImageLoaded(true);
                }}
              />
            </>
          ) : (
            <div className="project-image-fallback">
              <div className="fallback-icon">
                {getCategoryIcon(project.category)}
              </div>
              <span>Aperçu non disponible</span>
            </div>
          )}
          
          {/* Overlay avec animation */}
          <div className="image-overlay">
            <div className="overlay-content">
              <span className="view-project">Voir le projet</span>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Contenu de la carte */}
        <div className="project-content">
          {/* Badge catégorie */}
          <div 
            className="category-badge"
            style={{ background: getCategoryColor(project.category) }}
          >
            <span className="category-icon">{getCategoryIcon(project.category)}</span>
            <span className="category-text">{project.category}</span>
          </div>

          {/* Titre */}
          <h3 className="project-title">{project.title}</h3>

          {/* Description preview */}
          {project.description && (
            <p className="project-description-preview">
              {getDescriptionPreview(project.description)}
            </p>
          )}

          {/* Technologies */}
          {project.languages && (
            <div className="tech-preview">
              <div className="tech-items">
                {getTechPreview(project.languages).map((tech, index) => (
                  <span key={index} className="tech-item">
                    {tech.trim()}
                  </span>
                ))}
                {project.languages.split(', ').length > 3 && (
                  <span className="tech-more">
                    +{project.languages.split(', ').length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer avec call to action */}
        <div className="project-footer">
          <span className="cta-text">En savoir plus</span>
          <div className="cta-arrow">→</div>
        </div>
      </Link>
    </div>
  );
}

export default ProjectCard;
