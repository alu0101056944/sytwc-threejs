import * as React from 'react';

import Tabs from '../templates/tabs';
import ContentAndSidebar from '../templates/content-and-sidebar';

import '../styles/main.scss';
import { StaticImage } from 'gatsby-plugin-image';

const IndexPage = () => {

  const tabsContent = [
        {
          title: '1. Obtención de información',
          content: (
                <ContentAndSidebar
                    sidebarContent={<p>It's information content here</p>}>
                  <p>A first 3D Scene here</p>
                </ContentAndSidebar>
              )
        },
        {
          title: '2. Arquitectura de la base de datos',
          content: (
                <ContentAndSidebar
                      sidebarContent={<p>It's information content here</p>}>
                  <p>A second 3D Scene here</p>
                </ContentAndSidebar>
              )
        },
      ];

  return (
    <div className='mainDiv'>
      <div className='logoDiv'>
          <StaticImage src='../images/icon.png' alt='Gastby logo'/>
      </div>

      <h1 className='mainTitle'>Sistema de Business Intelligence para la selección de herramientas de proyecto</h1>

      <div className='animationDiv'>
        <p>A 3D animation goes here</p>
      </div>

      <Tabs allContent={tabsContent}/>
    </div>
  );
}

export default IndexPage;
