import React from "react"
import { graphql, Link } from "gatsby"

import "../style/style.scss"
import { Container, Card, Row, Col } from "react-bootstrap";
import ANavbar from "../components/ANavbar";
import AFooter from "../components/AFooter";

export default function ArticlePage( {data} )
{
    const articleInfo = data.article.frontmatter;
    const article = data.article.html;

    return(
        <body className="d-flex flex-column min-vh-100">
            <ANavbar></ANavbar>
            <article>
                <Container expand="md">
                    <Row>
                        <div className="col-3 d-none d-xl-block">
                            <div className="pt-3 sticky-top">
                                <Card className="bg-light">
                                    <Card.Body>
                                        <Card.Title className="mt-0">Contents</Card.Title>
                                        <div className="table-of-contents" dangerouslySetInnerHTML={{ __html: data.article.tableOfContents }}></div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                        <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 mt-3">
                            <Link to="/">Articles</Link> &#187; {articleInfo.title}
                            <h1>{articleInfo.title}</h1>
                            <hr></hr>
                            <div className="d-xl-none" dangerouslySetInnerHTML={{ __html: data.article.tableOfContents }}></div>
                            <div dangerouslySetInnerHTML={{ __html: article }}></div>
                        </div>
                        <div className="col-3 d-none d-xl-block">
                            <Card>
                                <Card.Body className="bg-gray bg-light">
                                    If you're running AdBlock, please consider whitelisting this site if
                                    you'd like to support my tutorials!
                                </Card.Body>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </article>
            <AFooter/>
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