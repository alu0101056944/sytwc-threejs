import * as React from 'react';

import Tabs from '../templates/tabs';

import '../styles/main.scss';
import { StaticImage } from 'gatsby-plugin-image';

const IndexPage = () => {

  const tabsContent = [
        {
          title: 'Foo',
          content: <p>This is the FIRST tab's content</p>
        },
        {
          title: 'Bar',
          content: <p>This is the SECOND tab's content</p>
        },
        {
          title: 'Baz',
          content: <p>This is the THIRD tab's content</p>
        },
      ];

  return (
    <div className='mainDiv'>
      <div style={{width: 150, height: 150, margin: '40px 0 40px 0'}}>
          <StaticImage src='../images/icon.png' alt='Gastby logo'/>
      </div>
      <div style={{width: '98%', minHeight: 150, backgroundColor: 'gray'}}>
        A 3D animation goes here
      </div>
      <Tabs allContent={tabsContent}/>
    </div>
  );
}

export default IndexPage;
