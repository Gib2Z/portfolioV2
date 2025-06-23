import React from 'react';
import '../style/APropos.css';
import profileImage from '../images/65397801-9227-40b4-a8d9-4c7c0bea4ee8-.jpg'; 

function APropos() {
  return (
    <section className="apropos-section">
      <div className="apropos-image">
        <img 
          src={profileImage} 
          alt="Gibril Laiadhi - DevOps"
        />
      </div> 

      <div className="apropos-content">
        <h2>A propos de moi</h2>
        <p>
          Je suis étudiant en 3e année de BUT Informatique spécialisé en déploiement d'applications communicantes et sécurisées, passionné avec une expertise diversifiée en développement d'applications, administration de systèmes et réseaux, configuration de serveurs, et développement web. Fort de plusieurs années d'expérience, je suis capable de concevoir, développer, et maintenir des solutions technologiques complètes, allant de la conception d'interfaces utilisateur intuitives à la gestion de l'infrastructure réseau sécurisée et performante. Toujours à la recherche de nouveaux défis, je m'efforce de rester à la pointe des technologies et de fournir des solutions innovantes et efficaces.
        </p>
      </div>
    </section>
  );
}

export default APropos;
