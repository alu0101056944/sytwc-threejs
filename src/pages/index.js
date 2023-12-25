import * as React from 'react';

import Tabs from '../templates/tabs';
import ContentAndSidebar from '../templates/content-and-sidebar';

import '../styles/main.scss';
import { StaticImage } from 'gatsby-plugin-image';
import MainAnimation from '../templates/main-animation';

const IndexPage = () => {
  const tabsContent = [
        {
          title: '1. Obtención de información',
          content: (
                <ContentAndSidebar
                    key='content1'
                    sidebarContent={<p>It's information content here</p>}>
                  <p>A first 3D Scene here</p>
                </ContentAndSidebar>
              )
        },
        {
          title: '2. Arquitectura de la base de datos',
          content: (
                <ContentAndSidebar
                      key='content2'
                      sidebarContent={<p>It's information content here</p>}>
                  <p>A second 3D Scene here</p>
                </ContentAndSidebar>
              )
        },
      ];

  return (
    <div className='mainDiv'>
      <div className='logoDiv'>
          <StaticImage src='../images/ull.png' alt='Gastby logo' width={200} height={100}/>
          <div style={{display: 'flex', justifyContent: 'center', marginLeft: 20}}>
            <p>Marcos Barrios Lorenzo, alu0101056944, 24/12/2023</p>
          </div>
      </div>

      <h1 className='mainTitle'>
        Sistema de Business Intelligence para la selección de herramientas de proyecto
      </h1>

      <div className='animationDiv'>
        <MainAnimation>dasda</MainAnimation>
      </div>

      <Tabs allContent={tabsContent}/>
    </div>
  );
}

export default IndexPage;
