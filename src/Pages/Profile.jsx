import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  useEffect(() => {
    document.title = 'Profile';
  });

  return (
    <div>
      <Header title="Profile" />
      <Footer />
    </div>
  );
}

export default Profile;
