import React from 'react'
import { graphql } from 'gatsby';
import '../../style/style.scss';

import Navbar from '../../components/Navbar/Navbar';
import TutorialList from '../../components/TutorialList/TutorialList';
import Footer from '../../components/Footer/Footer';

import about from '../../content/portfolio.yml';

export default function IndexPage( { data } ) {
    return (
      <body>
        <div class='content'>
        <Navbar logo={about.logo}/>
        <div class="page-container">
          <div class="page">
              <TutorialList word="test"/>
          </div>
        </div>
        </div>
        <Footer/>
      </body>
    );
  }