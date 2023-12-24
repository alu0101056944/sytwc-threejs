import * as React from 'react';

import Tabs from '../templates/tabs';

import '../styles/main.scss';

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
      <Tabs allContent={tabsContent}/>
    </div>
  );
}

export default IndexPage;
