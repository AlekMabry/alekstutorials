import React from 'react'
import { graphql } from 'gatsby';
import '../../style/style.scss';

import Navbar from '../../components/Navbar/Navbar';
import TutorialList from '../../components/TutorialList/TutorialList';
import Footer from '../../components/Footer/Footer';

import about from '../../content/portfolio.yml';

export default function TutorialsPage( { data } ) {
  const tutorials = data.allMarkdownRemark.nodes;

  return (
    <body>
      <div class='content'>
        <Navbar logo={about.logo}/>
        <div class="page-container">
          <div class="page">
              <h1>TUTORIALS</h1>
              <TutorialList tutorials={tutorials}/>
          </div>
        </div>
      </div>
      <Footer/>
    </body>
  );
}

export const query = graphql`
query TutorialsPage {
  allMarkdownRemark(
    filter: {frontmatter: {collection: {eq: "tutorials"}}}
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