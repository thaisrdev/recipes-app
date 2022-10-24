import React, { useEffect } from 'react';
import Header from '../components/Header';

function Profile() {
  useEffect(() => {
    document.title = 'Profile';
  });

  return (
    <div>
      <Header title="Profile" />
    </div>
  );
}

export default Profile;
