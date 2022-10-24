import React, { useEffect } from 'react';

function NotFound() {
  useEffect(() => {
    document.title = 'Not Found';
  });

  return (
    <h1>Not Found</h1>
  );
}

export default NotFound;
