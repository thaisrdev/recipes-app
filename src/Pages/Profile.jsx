import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    document.title = 'Profile';
    const storageEmail = JSON.parse(localStorage.getItem('user'));
    if (storageEmail) {
      setEmail(storageEmail);
    }
  }, []);

  const logoutButton = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" />

      <h3 data-testid="profile-email">{email.email}</h3>

      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ logoutButton }
      >
        Logout
      </button>

      <Footer />
    </div>
  );
}

export default Profile;
