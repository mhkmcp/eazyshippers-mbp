
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import customerLogo from '../../../images/customer-logo.png';
import adminLogo from '../../../images/admin-logo.png';

const Titlebar = ({user}) => {
    return (
        <>
        {
            user === 'admin' ?
            <>
                <Navbar className="py-0" bg="primary" variant="dark">
                    <Navbar.Brand href="#home">
                        <img src={adminLogo} alt=""/>
                        <p>Back Office</p>
                    </Navbar.Brand>
                    <Nav className="text-white ml-auto mt-5">
                        <Link className="mx-5 text-white" to="/home">Track Parcel</Link>
                        <Link className="mx-5 text-white" to="/dashboard">Global Setting</Link>
                        <Link className=" mx-5 text-white" to="/login">Log Out</Link>
                        {/* <Link className=" mr-3 text-white" to="/register">Register</Link> */}
                    </Nav>
                    
                    
                </Navbar>
            </>
            :
            <>
                <Navbar className="py-0" bg="light" variant="dark">
                    <Navbar.Brand href="#home">
                        <img width={250} src={customerLogo} alt=""/>
                        <p className="text-dark ml-5">User Area</p>
                    </Navbar.Brand>
                    <Nav className="ml-auto mt-5">
                        <Link className="mx-5 text-dark" to="/home">Track Parcel</Link>
                        <Link className="mx-5 text-dark" to="/dashboard">Support</Link>
                        <Link className=" mx-5 text-dark" to="/login">Log Out</Link>
                        {/* <Link className=" mr-3 text-white" to="/register">Register</Link> */}
                    </Nav>
                    
                    
                </Navbar>
            </>
        }
            

        </>
    );
};

export default Titlebar;