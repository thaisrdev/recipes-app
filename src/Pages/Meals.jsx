import React, { useEffect } from 'react';
import Header from '../components/Header';

function Meals() {
  useEffect(() => {
    document.title = 'Meals';
  });

  return (
    <div>
      <Header title="Meals" />
    </div>
  );
}

export default Meals;
