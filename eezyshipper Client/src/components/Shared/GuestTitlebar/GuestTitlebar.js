import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Icon, Nav, Navbar } from 'rsuite';
import logo from '../../../images/admin-logo.png';

const GuestTitlebar = () => {
    
    return (
        <Navbar appearance="inverse">
        <Navbar.Header>
          <a href="/" className="navbar-brand logo">
            <img src={logo} width={150} alt="logo"/>
          </a>
        </Navbar.Header>
        <Navbar.Body>
          <Nav pullRight>
            <Nav.Item href={`/dashboard/summery`} icon={<Icon icon="cog" />}>Admin</Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>
    );
};

export default GuestTitlebar;