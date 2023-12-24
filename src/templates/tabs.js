import { useState } from 'react';
import React from 'react';

/**
 * allContent is expected to be an array of objects with title and content
 *    properties.
 */
const Tabs = ({allContent = [{title: 'default'}]}) => {
  const [nameOfActiveTab, setNameOfActiveTab] = useState(allContent[0].title);

  return (
    <div className='tabsContainer'>
      <nav>
        {
          allContent.map((content) => (
                <button
                    className={nameOfActiveTab === content.title ? 'activeTab' : 'inactiveTab'}
                    onClick={() => setNameOfActiveTab(content.title)}>
                  {content.title}
                </button>
              ))
        }
      </nav>
      <main>
        {
          allContent.filter(content => content.title === nameOfActiveTab).content
        }
      </main>
    </div>
  );
}

export default Tabs;
