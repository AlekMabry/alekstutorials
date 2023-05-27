import React from "react";
import { Link } from "gatsby"
import { Container, Stack, Vr } from "react-bootstrap";

export default function AFooter() {
    const year = new Date().getFullYear();

    return(
        <Container fluid className="border-top border-primary border-3 bg-dark text-light mt-auto">
            <Stack direction="vertical" className="align-items-center pb-4 pt-4" gap={4}>
                <Stack direction="horizontal" className="justify-content-center" gap={2}>
                    <Link to="privacy-policy" className="text-light-link text-decoration-none">
                        Privacy Policy
                    </Link>
                    <div className="vr"/>
                    <a className="text-light-link text-decoration-none" href="https://www.linkedin.com/in/alek-mabry/">LinkedIn</a>
                    <div className="vr"/>
                    <a className="text-light-link text-decoration-none" href="https://www.upwork.com/freelancers/~0161a93614cf453b78">Upwork</a>
                    <div className="vr"/>
                    <Link className="text-light-link text-decoration-none" to="contact">Contact</Link>
                </Stack>
                <div>Copyright © Aleksander Mabry {year}</div>
            </Stack>
        </Container>
    );
}