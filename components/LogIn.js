import Router from 'next/router';
import Alert from '@mui/material/Alert';

import {
  getAuth, signInWithEmailAndPassword, sendPasswordResetEmail
} from 'firebase/auth';
import { getFirestore, collection, getDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import getError from '../util/getError';

import styles from '../styles/components/LogIn.module.css';

export default function LogIn(props) {
  const { setRegister } = props;

  const auth = getAuth();
  const db = getFirestore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // pushes current user to profile page
  async function pushToProfile() {
    const uid = auth.currentUser.uid;
    const usersRef = collection(db, 'users');
    const userRef = doc(usersRef, uid);
    const userDoc = await getDoc(userRef);
    const username = userDoc.data().username;
    Router.push(`/${username}`);
  }

  // logs user in
  async function logIn() {
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
      setError(getError(e));
      return;
    }
    // if email verified, push to profile
    if (auth.currentUser.emailVerified) pushToProfile();
  }

  return (
    <div className={styles.container}>
      <form onSubmit={e => {
        e.preventDefault();
        logIn();
      }}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <button>Log in</button>
      </form>
      {
        error &&
        <Alert className={styles.error} severity="error">
          {error}
        </Alert>
      }
      <p className={styles.switch}>
        No account?{' '}
        <span onClick={() => setRegister(true)}>
          Register
        </span>
      </p>
      <div className={styles.info}>
        <p>
          Forgot password?{' '}
          <span onClick={() => {}}>
            Reset password
          </span>
        </p>
        <p>This website is not affiliated with Chadwick School.</p>
      </div>
    </div>
  );
}
