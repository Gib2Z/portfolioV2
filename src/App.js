import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Accueil from './components/Accueil';
import APropos from './components/APropos';
import Contact from './components/Contact';
import Projects from './components/Project';
import ProjectDetail from './components/ProjectDetail';
import Login from './components/Login';
import AddProject from './components/AddProject'; 
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute'; // 👈 Nouveau
import './style/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/apropos" element={<APropos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/login" element={<Login />} />
          
          {/* 🔒 Route protégée ADMIN SEULEMENT */}
          <Route 
            path="/add-project" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <AddProject />
              </ProtectedRoute>
            } 
          />
          
          {/* 🔐 Route admin (si différente de add-project) */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <AddProject />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
