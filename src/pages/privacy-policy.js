import React from "react";
import { Container } from "react-bootstrap";
import "../style/style.scss";
import ANavbar from '../components/ANavbar';
import AFooter from "../components/AFooter";

export default function PrivacyPolicyPage()
{
    return (
        <body className="d-flex flex-column min-vh-100">
            <ANavbar/>
            <Container expand="md">
                <h1>Privacy Policy</h1>
                This website does not collect any user information.
            </Container>
            <AFooter/>
        </body>
    );
}