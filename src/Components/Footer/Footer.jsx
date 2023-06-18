import React from 'react';
import './Footer.css';
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <h3>HRNET</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus ullamcorper sodales.</p>
        </div>
        <div className="footer-content">
          <h4>Links</h4>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/Create">Création d'employé</Link></li>
            <li><Link to="/List">Liste d'employés</Link></li>
          </ul>
        </div>
        <div className="footer-content">
          <h4>Contact</h4>
          <p>123 Main Street, City, Country</p>
          <p>Email: info@company.com</p>
          <p>Phone: +1 123-456-7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} HRNET. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
