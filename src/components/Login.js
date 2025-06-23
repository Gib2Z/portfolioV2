import React, { useState } from 'react';
import axios from 'axios';
import '../style/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('🔍 Tentative de connexion...', { username, password });
      
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      console.log('🔍 Login response:', response.data);

      // ✅ Sauvegarder le token ET le rôle
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      
      console.log('🔍 Saved token:', response.data.token);
      console.log('🔍 Saved role:', response.data.role);
      
      // ✅ Déclencher un événement pour notifier les autres composants
      window.dispatchEvent(new Event('storage'));
      
      // ✅ Message de succès
      alert('Connexion réussie !');
      
      // ✅ Redirection avec délai
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
      
    } catch (error) {
      console.error('❌ Login error:', error);
      
      // Gestion des erreurs plus précise
      if (error.response && error.response.status === 401) {
        setError('Nom d\'utilisateur ou mot de passe incorrect');
      } else if (error.response) {
        setError('Erreur serveur: ' + error.response.status);
      } else if (error.request) {
        setError('Impossible de contacter le serveur. Vérifiez qu\'il est démarré.');
      } else {
        setError('Erreur de connexion');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Connexion Admin</h2>
        
        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur :</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              placeholder="admin"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Mot de passe :</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="admin123"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="login-button"
          >
            {loading ? '⏳ Connexion...' : '🔐 Se connecter'}
          </button>
        </form>
        
        {/* 🔍 DEBUG - À enlever après les tests */}
        <div className="debug-info">
          <h4>🔍 Debug Info:</h4>
          <p>Username: {username}</p>
          <p>Password: {password}</p>
          <p>Current role: {localStorage.getItem('role') || 'null'}</p>
        </div>
      </div>
    </div>
  );
}

export default Login;