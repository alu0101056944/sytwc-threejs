import * as React from 'react';

import Tabs from '../templates/tabs';
import ContentAndSidebar from '../templates/content-and-sidebar';

import '../styles/main.scss';
import { StaticImage } from 'gatsby-plugin-image';

const IndexPage = () => {

  const tabsContent = [
        {
          title: 'Foo',
          content: (
                <ContentAndSidebar
                    sidebarContent={<p>fooodsadsjdjsj</p>}>
                  <p>This is the FIRST tab's content</p>
                </ContentAndSidebar>
              )
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
      <div className='logoDiv'>
          <StaticImage src='../images/icon.png' alt='Gastby logo'/>
      </div>

      <div className='animationDiv'>
        <p>A 3D animation goes here</p>
      </div>

      <Tabs allContent={tabsContent}/>
    </div>
  );
}

export default IndexPage;
