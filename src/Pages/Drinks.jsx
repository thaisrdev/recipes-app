import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks() {
  useEffect(() => {
    document.title = 'Drinks';
  });

  return (
    <div>
      <Header title="Drinks" />
      <Footer />
    </div>
  );
}

export default Drinks;
