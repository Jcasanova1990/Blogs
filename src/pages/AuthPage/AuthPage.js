import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import styles from './AuthPage.module.scss'; // Correct import path

export default function AuthPage(props) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className={styles.authContainer}> {/* Use the correct class name */}
      <button className={styles.button} onClick={() => setShowLogin(!showLogin)}>
        {!showLogin ? 'Already Have An account. Click Here To Sign In' : 'New Here. Click Here Sign Up'}
      </button>
      {!showLogin ? <SignUpForm signUp={props.signUp} /> : <LoginForm login={props.login} />}
      <Link to="/" className={styles.link}>Go to Home</Link>
    </div>
  );
}
