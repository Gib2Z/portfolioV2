import React from 'react';
import './style/Home.css';
import Accueil from './components/Accueil';
import APropos from './components/APropos';
import Contact from './components/Contact';
import Parcours from './components/Parcours';
import Realisations from './components/Realisation';

function Home() {
  return (
    <div className="home">
      <h1>Bienvenue sur mon portfolio</h1>
      <Accueil />
      <APropos />
      <Parcours />
      <Realisations />
      <Contact />
    </div>
  );
}

export default Home;
