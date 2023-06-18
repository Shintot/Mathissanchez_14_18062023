import React from 'react';
import './HomePage.css';
import { BsFillCloudFog2Fill } from 'react-icons/bs';
import {Link} from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
          <BsFillCloudFog2Fill className="logoCloud"/>
        <h1>Bienvenue sur notre HRNET</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mattis aliquam velit, a hendrerit nibh ultrices ac.</p>
          <Link to="/Create" className="btn">Créer un employé</Link>
      </div>
      <div className="content-section">
        <h2>Création d'employés</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mattis aliquam velit, a hendrerit nibh ultrices ac.</p>
      </div>
      <div className="content-section">
        <h2>Liste d'employés</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mattis aliquam velit, a hendrerit nibh ultrices ac.</p>
      </div>
      {/* Ajoutez plus de sections de contenu ici */}
    </div>
  );
};

export default HomePage;
