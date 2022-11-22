import React from 'react';

const getWidth = () => document.documentElement.clientWidth;

function DetectCurrentWidth() {
  const [width, detectWidth] = React.useState(getWidth());

  React.useEffect(() => {
    let timeout = null;
    
    const checkWidth = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => detectWidth(getWidth()), 150)
    }

    window.addEventListener('resize', checkWidth)
    
    return () => {
      window.removeEventListener('resize', checkWidth);
    }
  }, [])

  return width;
}

export default DetectCurrentWidth;