import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Vérifier si l'utilisateur est connecté
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Vérifier si l'admin est requis
  if (requireAdmin && role !== 'admin') {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '50px',
        backgroundColor: '#ffebee',
        margin: '20px',
        borderRadius: '8px',
        border: '1px solid #f44336'
      }}>
        <h2>🚫 Accès refusé</h2>
        <p>Vous devez être administrateur pour accéder à cette page.</p>
        <button 
          onClick={() => window.history.back()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Retour
        </button>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
