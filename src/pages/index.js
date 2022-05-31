import React from 'react'
import { graphql } from 'gatsby';
import '../style/style.scss';

import Navbar from '../components/Navbar/Navbar';
import AboutHeader from '../components/AboutHeader/AboutHeader';
import ProjectGallery from '../components/ProjectGallery/ProjectGallery';
import Footer from '../components/Footer/Footer';

import about from '../content/portfolio.yml';

export default function IndexPage( { data } ) {
  const projects = data.allMarkdownRemark.nodes;

  return (
    <body>
      <div class='content'>
      <Navbar logo={about.logo}/>
      <div class="page-container">
        <div class="page">
          <AboutHeader about={about}/>
          <ProjectGallery projects={projects}/>
        </div>
      </div>
      </div>
      <Footer/>
    </body>
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