import React from 'react';
import './Navbar.css';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to={'/'}>
                <img src="https://res.cloudinary.com/dtx8credj/image/upload/v1685366333/HRNET_p32otl.png"
                             alt="logo" className="logo"/>
            </Link>
            <ul className="navbar-nav">

                <li className="nav-item">
                    <Link className="nav-link" to={'/Create'}>Création d'employé(e)</Link>
                </li>
                <li className="nav-item">
                     <Link className="nav-link" to={'/List'}>Liste d'employé(e)s</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
