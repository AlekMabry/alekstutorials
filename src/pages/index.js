import React from "react"
import { graphql, Link } from "gatsby"

import '../style/style.scss';
import { Container, Row, Col, Card, Ratio} from 'react-bootstrap';
import ANavbar from '../components/ANavbar';
import AFooter from "../components/AFooter";

export default function TutorialsPage( { data } ) {
  const tutorials = data.allMarkdownRemark.nodes;

  const cards = tutorials.map((tutorial) =>
    <Col md={3} mb={1}>
      <div className="pt-4 h-100">
        <Card className="h-100">
          <Ratio className="mt-3" aspectRatio="16x9">
            <Card.Img variant="top" aspectRatio="16x9" src={tutorial.frontmatter.thumb}/>
          </Ratio>
          <Card.Body>
            <Link to={tutorial.frontmatter.slug}>
              <Card.Title>{tutorial.frontmatter.title}</Card.Title>
            </Link>
            <Card.Text className="text-secondary">{tutorial.frontmatter.description}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Col>
  );

  return (
    <body>
      <ANavbar/>
      <Container expand="md" className="mb-4">
        <h1>Articles</h1>
        <Row className="mt-n2">
          {cards}
        </Row>
      </Container>
      <AFooter/>
    </body>
  );
}

export const query = graphql`
query TutorialsPage {
  allMarkdownRemark(
    filter: {frontmatter: {collection: {eq: "articles"}}}
    sort: {fields: frontmatter___date, order: DESC}
  ) {
    nodes {
      frontmatter {
        title
        keywords
        date
        description
        slug
        tags
        thumb
      }
    }
  }
}
`;