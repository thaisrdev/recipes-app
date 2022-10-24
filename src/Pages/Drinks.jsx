import React, { useEffect } from 'react';
import Header from '../components/Header';

function Drinks() {
  useEffect(() => {
    document.title = 'Drinks';
  });

  return (
    <div>
      <Header title="Drinks" />
    </div>
  );
}

export default Drinks;
