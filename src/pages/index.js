import React from 'react'
import { graphql } from 'gatsby';
//import '../style/style.scss';

import Navbar from '../components/Navbar/Navbar';
import AboutHeader from '../components/AboutHeader/AboutHeader';
import ProjectGallery from '../components/ProjectGallery/ProjectGallery';
import Footer from '../components/Footer/Footer';

import about from '../content/portfolio.yml';

export default function IndexPage( { data } ) {
  const services = data.services.nodes;
  const projects = data.projects.nodes;

  return (
    <body>
      <div class='content'>
      <Navbar logo={about.logo}/>
      <div class="page-container">
        <div class="page">
          <AboutHeader about={about}/>
          <ProjectGallery services={services} projects={projects}/>
        </div>
      </div>
      </div>
      <Footer/>
    </body>
  );
}

export const query = graphql`
query IndexPage {
  services: allMarkdownRemark(
    filter: {frontmatter: {collection: {eq: "services"}}}
    sort: {fields: frontmatter___order}
  ) {
    nodes {
      frontmatter {
        collection
        title
        keywords
        slug
        thumb
      }
    }
  }
  projects: allMarkdownRemark(
    filter: {frontmatter: {collection: {eq: "projects"}}}
    sort: {fields: frontmatter___date, order: DESC}
  ) {
    nodes {
      frontmatter {
        collection
        slug
        title
        thumb
      }
    }
  }
}`;