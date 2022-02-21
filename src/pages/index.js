import React from 'react'
import { graphql } from 'gatsby';
import '../style/style.scss';

import Navbar from '../components/Navbar/Navbar';
import ProjectGallery from '../components/ProjectGallery/ProjectGallery';

export default function IndexPage( { data } ) {
  const projects= data.allMarkdownRemark.nodes;

  return (
    <main>
      <title>Alek's Tutorials</title>
      <body>
        <Navbar/>
        <div class="page-container">
          <div class="page">
            <ProjectGallery projects={projects}/>
          </div>
        </div>
      </body>
    </main>
  );
}

export const query = graphql`
query IndexPage {
  allMarkdownRemark {
    nodes {
      frontmatter {
        slug
        title
        thumb
      }
    }
  }
}`;