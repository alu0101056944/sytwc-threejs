import { useState } from 'react';
import React from 'react';

/**
 * allContent is expected to be an array of objects with title and content
 *    properties.
 */
const Tabs = ({allContent = [{title: 'default'}]}) => {
  const [nameOfActiveTab, setNameOfActiveTab] = useState(allContent[0].title);
  Tabs.buttonAmount ??= 0; // for keys

  return (
    <div className='tabsContainer'>
      <nav>
        {
          allContent.map((content, index) => {
                Tabs.buttonAmount++;
                return <button
                        className={nameOfActiveTab === content.title ? 'activeTab' : 'inactiveTab'}
                        key={`${content.title}${index}${Tabs.buttonAmount}`}
                        onClick={() => setNameOfActiveTab(content.title)}>
                      {content.title}
                    </button>
              })
        }
      </nav>
      <main>
        {
          allContent.filter(content => content.title === nameOfActiveTab)
              .map(content => content.content)
        }
      </main>
    </div>
  );
}

export default Tabs;
