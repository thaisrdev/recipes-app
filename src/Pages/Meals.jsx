import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Meals() {
  useEffect(() => {
    document.title = 'Meals';
  });

  return (
    <div>
      <Header title="Meals" />
      <Footer />
    </div>
  );
}

export default Meals;
