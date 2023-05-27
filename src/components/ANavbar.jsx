import React from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import config from '../content/settings.yml';

export default function ANavbar( )
{
    return (
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className="mb-3">
            <Container>
                <Navbar.Brand className="navbar-logo-container">
                    <img src={"../"+config.logo} alt=''/>
                    <h1>Alek's Tutorials</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"/>
                    <Nav>
                        <Nav.Link href=".">Articles</Nav.Link>
                        <Nav.Link href="contact">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}