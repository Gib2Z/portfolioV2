import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/ProjectDetail.css';

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/projects/${id}`)
      .then(response => {
        setProject(response.data);
      })
      .catch(error => {
        setError('Erreur lors du chargement du projet !');
        console.error('Erreur:', error);
      });
  }, [id]);

  const handleDelete = () => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      return;
    }

    setIsDeleting(true);
    setError('');

    const token = localStorage.getItem('token');
    
    if (!token) {
      setError('Vous devez être connecté pour supprimer un projet');
      setIsDeleting(false);
      return;
    }

    axios.delete(`http://localhost:5000/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      alert('Projet supprimé avec succès !');
      navigate('/projects');
    })
    .catch(error => {
      console.error('❌ Erreur lors de la suppression:', error);
      
      if (error.response) {
        const statusCode = error.response.status;
        const errorMessage = error.response.data?.error || error.response.data?.message;
        
        switch (statusCode) {
          case 401:
            setError('Non autorisé - Veuillez vous reconnecter');
            break;
          case 403:
            setError('Accès interdit - Vous n\'avez pas les permissions');
            break;
          case 404:
            setError('Projet non trouvé');
            break;
          case 500:
            setError('Erreur serveur - Réessayez plus tard');
            break;
          default:
            setError(`Erreur: ${errorMessage || 'Impossible de supprimer le projet'}`);
        }
      } else if (error.request) {
        setError('Erreur de connexion - Vérifiez votre connexion internet');
      } else {
        setError('Erreur inconnue lors de la suppression');
      }
      
      setIsDeleting(false);
    });
  };

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <div className="error-icon">⚠️</div>
          <h2>Oups ! Une erreur s'est produite</h2>
          <p>{error}</p>
          <button 
            onClick={() => navigate('/projects')} 
            className="back-button"
          >
            ← Retour aux projets
          </button>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement du projet...</p>
      </div>
    );
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? project.images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === project.images.length - 1 ? 0 : prevIndex + 1));
  };

  const userRole = localStorage.getItem('role');

  return (
    <div className="project-detail-container">
      {/* Header avec bouton retour */}
      <div className="project-header">
        <button 
          onClick={() => navigate('/projects')} 
          className="back-nav-button"
        >
          ← Retour aux projets
        </button>
      </div>

      <div className="project-detail">
        {/* Section titre et catégorie */}
        <div className="project-meta">
          <div className="category-badge">{project.category}</div>
          <h1 className="project-title">{project.title}</h1>
        </div>

        {/* Carousel d'images amélioré */}
        <div className="carousel-container">
          {project.images && project.images.length > 0 && (
            <div className="carousel">
              <div className="carousel-wrapper">
                <img
                  src={`data:image/png;base64,${project.images[currentImageIndex]}`}
                  alt={`${project.title} ${currentImageIndex + 1}`}
                  className="carousel-image"
                />
                
                {/* Overlay avec navigation */}
                {project.images.length > 1 && (
                  <>
                    <button 
                      className="carousel-button prev-button" 
                      onClick={handlePrevImage}
                      aria-label="Image précédente"
                    >
                      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                      </svg>
                    </button>
                    <button 
                      className="carousel-button next-button" 
                      onClick={handleNextImage}
                      aria-label="Image suivante"
                    >
                      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Indicateurs de pagination */}
              {project.images.length > 1 && (
                <div className="carousel-indicators">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`Aller à l'image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Contenu du projet */}
        <div className="project-content">
          <div className="content-grid">
            {/* Technologies utilisées */}
            <div className="project-technologies">
              <h3>🛠️ Technologies utilisées</h3>
              <div className="tech-tags">
                {project.languages.split(', ').map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Description du projet */}
            <div className="project-description">
              <h3>📋 Description du projet</h3>
              <div className="description-text">
                {project.description.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Actions admin */}
        {userRole === 'admin' && (
          <div className="admin-actions">
            <button 
              onClick={handleDelete} 
              className="delete-button"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <div className="button-spinner"></div>
                  Suppression...
                </>
              ) : (
                <>
                  🗑️ Supprimer le projet
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetail;