import Router from 'next/router';
import Alert from '@mui/material/Alert';

import { useState } from 'react';
import {
  getAuth, createUserWithEmailAndPassword, sendEmailVerification
} from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import getError from '../util/getError';

import styles from '../styles/components/Register.module.css';

export default function Register(props) {
  const { setRegister } = props;

  const auth = getAuth();
  const db = getFirestore();

  const usersRef = collection(db, 'users');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // sends user registration email
  async function register() {
    setError('');
    // verify email
    if (!email.endsWith('@chadwickschool.org')) {
      setError('Please use your Chadwick email.');
      return;
    }
    // create user
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      setError(getError(e));
      return;
    }
    // create user doc on success
    const uid = auth.currentUser.uid;
    const userRef = doc(usersRef, uid);
    const username = email.split('@')[0];
    const yearStr = username.substring(username.length - 2);
    const year = parseInt(yearStr);
    const joined = new Date().getTime();
    setDoc(userRef, {
      firstName, lastName, username, year, joined,
      college: '', major: ''
    });
    sendEmailVerification(auth.currentUser);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={e => {
        e.preventDefault();
        register();
      }}>
        <div className={styles.nameinput}>
          <input
            placeholder="First name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
          <input
            placeholder="Last name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
          </div>
        <input
          placeholder="Chadwick email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <input
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          autoComplete="new-password"
          required
        />
        <button>Register</button>
      </form>
      {
        error &&
        <Alert className={styles.error} severity="error">
          {error}
        </Alert>
      }
      <p className={styles.switch}>
        Have an account?{' '}
        <span onClick={() => setRegister(false)}>
          Log in
        </span>
      </p>
      <div className={styles.info}>
        <p>You must have a Chadwick email to register.</p>
        <p>This website is not affiliated with Chadwick School.</p>
      </div>
    </div>
  );
}
