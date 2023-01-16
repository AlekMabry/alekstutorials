import React from "react"
import { graphql } from "gatsby"

import "../../style/theme.scss"
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import about from '../../content/portfolio.yml';

export default function ArticlePage( {data} )
{
    const articleInfo = data.article.frontmatter;
    const article = data.article.html;

    return(
        <body>
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand className="navbar-logo-container">
                        <img src={"../"+about.logo} alt=''/>
                        <h1>Alek's Tutorials</h1>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"/>
                        <Nav>
                            <Nav.Link href="#home">About</Nav.Link>
                            <Nav.Link href="./tutorials">Tutorials</Nav.Link>
                            <Nav.Link href="#home">Projects</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <article>
                <Container expand="md">
                    <Row expand="md">
                        <Col className="d-none d-xl-block">
                            <div className="pt-3 sticky-top">
                                <Card className="bg-light">
                                    <Card.Body>
                                        <Card.Title className="mt-0">Contents</Card.Title>
                                        <div className="table-of-contents" dangerouslySetInnerHTML={{ __html: data.article.tableOfContents }}></div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                        <Col>
                            <Container style={{"max-width": "100em"}} expand="lg" className="text-dark bg-white mt-3">
                                <a href="tutorials/">Tutorials</a> &#187; {articleInfo.title}
                                <h1>{articleInfo.title}</h1>
                                <hr></hr>
                                <div className="d-xl-none" dangerouslySetInnerHTML={{ __html: data.article.tableOfContents }}></div>
                                <div dangerouslySetInnerHTML={{ __html: article }}></div>
                            </Container>
                        </Col>
                        <Col className="mt-3 d-none d-xl-block">
                            <Card>
                                <Card.Body className="bg-gray bg-light">
                                    If you're running AdBlock, please consider whitelisting this site if
                                    you'd like to support my tutorials; and no worries, I won't be mad if you don't :)
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </article>
        </body>     
    );
}

export const query = graphql`
query ArticlePage($id: String) {
    article: markdownRemark(id: { eq: $id })
    {
        frontmatter {
            title
        }
        html
        tableOfContents
        headings {
            value
            id
            depth
        }
    }
}`;