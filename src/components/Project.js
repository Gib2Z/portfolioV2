import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard';
import '../style/Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Animation des cartes
  const [visibleProjects, setVisibleProjects] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/projects')
      .then(response => {
        setProjects(response.data);
        setLoading(false);
        // Animation progressive des cartes
        setTimeout(() => {
          setVisibleProjects(response.data.map((_, index) => index));
        }, 300);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des projets!', error);
        setError('Impossible de charger les projets. Veuillez réessayer plus tard.');
        setLoading(false);
      });
  }, []);

  const filterProjects = (category) => {
    setSelectedCategory(category);
    // Reset animation pour les nouvelles cartes
    setVisibleProjects([]);
    setTimeout(() => {
      const filteredProjects = category === 'All' 
        ? projects 
        : projects.filter(project => project.category === category);
      setVisibleProjects(filteredProjects.map((_, index) => index));
    }, 100);
  };

  const filteredProjects = projects.filter(project => 
    selectedCategory === 'All' || project.category === selectedCategory
  );

  // Catégories disponibles dynamiquement
  const categories = ['All', ...new Set(projects.map(project => project.category))];

  if (loading) {
    return (
      <section className="projects-section">
        <div className="projects-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <h2>Chargement des projets...</h2>
            <p>Préparation de mes réalisations</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="projects-section">
        <div className="projects-container">
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h2>Erreur de chargement</h2>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="retry-button"
            >
              🔄 Réessayer
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="projects-section">
      <div className="projects-container">
        {/* Header section */}
        <div className="projects-header">
          <div className="header-content">
            <h1 className="projects-title">
              <span className="title-gradient">Mes Projets</span>
            </h1>
            <p className="projects-description">
              Découvrez une sélection de mes projets les plus récents, allant du développement web 
              et mobile à l'administration de systèmes et réseaux. Chaque projet met en avant mes 
              compétences et mon engagement à fournir des solutions de haute qualité.
            </p>
          </div>
        </div>

        {/* Filtres modernes */}
        <div className="projects-filters">
          <div className="filters-wrapper">
            <h3 className="filters-title">Filtrer par catégorie</h3>
            <div className="filters-grid">
              {categories.map((category) => {
                const projectCount = category === 'All' 
                  ? projects.length 
                  : projects.filter(p => p.category === category).length;
                
                return (
                  <button
                    key={category}
                    onClick={() => filterProjects(category)}
                    className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
                  >
                    <span className="filter-text">
                      {category === 'All' ? 'Tous les projets' : category}
                    </span>
                    <span className="project-count">{projectCount}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="projects-stats">
          <div className="stat-item">
            <span className="stat-number">{projects.length}</span>
            <span className="stat-label">Projets réalisés</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{categories.length - 1}</span>
            <span className="stat-label">Domaines d'expertise</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{filteredProjects.length}</span>
            <span className="stat-label">Projets affichés</span>
          </div>
        </div>

        {/* Liste des projets */}
        <div className="projects-content">
          {filteredProjects.length === 0 ? (
            <div className="no-projects">
              <div className="no-projects-icon">📂</div>
              <h3>Aucun projet trouvé</h3>
              <p>Aucun projet ne correspond à cette catégorie pour le moment.</p>
            </div>
          ) : (
            <div className="projects-grid">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`project-item ${visibleProjects.includes(index) ? 'visible' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Projects;
