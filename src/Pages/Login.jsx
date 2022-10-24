/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  const validateEmail = () => {
    const validEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return email.match(validEmail);
  };

  const validatePassword = () => {
    const minPswdLength = 6;
    return password.length > minPswdLength;
  };

  const handleButtonClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktaislToken', '1');
    history.push('/meals');
  };

  useEffect(() => {
    if (validateEmail() && validatePassword()) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  return (
    <div>
      <label htmlFor="email-input">
        <input
          type="email"
          data-testid="email-input"
          value={ email }
          placeholder="Email"
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>
      <label htmlFor="password-input">
        <input
          type="email"
          data-testid="password-input"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          placeholder="Password"
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        className="login-submit-btn"
        disabled={ isDisabled }
        onClick={ handleButtonClick }
      >
        Login
      </button>
    </div>
  );
}

export default Login;
