import * as React from 'react';

import Tabs from '../templates/tabs';

import '../styles/main.scss';
import { StaticImage } from 'gatsby-plugin-image';
import MainAnimation from '../templates/main-animation';
import FirstGLBlock from '../templates/first-gl-block';
import SecondGLBlock from '../templates/second-gl-block';

const IndexPage = () => {
  const tabsContent = [
        {
          title: '1. Obtención de información y modelado',
          content: <FirstGLBlock key='ap1'/>
        },
        {
          title: '2. Key Performance Indicator (KPI)',
          content: <SecondGLBlock key='ap2'/>
        },
      ];

  return (
    <div className='mainDiv'>
      <div className='logoDiv'>
          <StaticImage src={'../images/ull.png'} alt='Gastby logo' width={200} height={100}/>
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
