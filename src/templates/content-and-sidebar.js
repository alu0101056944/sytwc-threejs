import * as React from 'react';

const ContentAndSidebar = ({sidebarContent, children}) => {
  return (
    <div className='contentAndSidebar'>
      <div className='content'>
        {children}
      </div>
      <div className='sidebar'>
        {sidebarContent}
      </div>
    </div>
  )
}

export default ContentAndSidebar
