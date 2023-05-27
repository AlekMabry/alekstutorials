import React from "react"
import { graphql, Link } from "gatsby"

import '../style/style.scss';
import { Container, Form, Button} from 'react-bootstrap';
import ANavbar from '../components/ANavbar';
import AFooter from "../components/AFooter";

export default function ContactPage() {
    return (
        <body className="d-flex flex-column min-vh-100">
            <ANavbar/>
            <Container expand="md">
                <h1>Contact</h1>
                <Form>
                    <Form.Group controlId="formBasicEmail" className="mt-3 mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicSubject" className="mb-3">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control type="text" placeholder="Enter subject" />
                    </Form.Group>

                    <Form.Group controlId="formBasicMessage" className="mb-3">
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter message" />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mb-3">
                        Submit
                    </Button>
                </Form>
            </Container>
            <AFooter/>
        </body>
    );
}