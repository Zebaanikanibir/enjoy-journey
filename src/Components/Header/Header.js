import React, { createContext, useState } from 'react';
import {Nav, Navbar, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css'
export const UserContext = createContext();
const Header = () => {
  
  const [loggedInUser, setLoggedInUser] = useState({})
    return(
        <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
          <Navbar collapseOnSelect expand="lg" variant="dark">
        <Navbar.Brand to="#home" ><h1 className="name">Enjoy Journey</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            
           </Nav>
          <Nav>
          <Link className='header' to="/home">Home</Link>
          <Link className='header' to="/buildfeatures">Destination</Link>
          <Link className='header' to="/pricing">Pricing</Link>
          <Link className='header' to="/features">Blog</Link>
          <Link className='header'  to="/pricing">Contact</Link>
          <Link className='header' id="login" to="/features"><Link to="/login">Login</Link></Link>
          <Link className='header'  to="/pricing">{loggedInUser.email}</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>   
        </UserContext.Provider>
    );
};

export default Header;