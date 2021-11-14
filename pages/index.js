import CircularProgress from '@mui/material/CircularProgress';

import Header from '../components/Header';

import { useEffect, useState } from 'react';
import {
  getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink
} from 'firebase/auth';
import getError from '../util/getError';

import styles from '../styles/pages/Index.module.css';

export default function Index() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(undefined);

  const auth = getAuth();

  // check for email sign in
  useEffect(() => {
    // if sign in link opened
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // get email
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation:');
      }
      // sign in with email link
      signInWithEmailLink(auth, email, window.location.href)
      .then(result => {
        window.localStorage.removeItem('emailForSignIn');
      })
      .catch(e => setError(getError(e)));
    }
  }, [auth]);

  // sends user registration email
  async function register() {
    // verify chadwick email
    if (!email.endsWith('@chadwickschool.org')) {
      setError('Please use your Chadwick email.');
      return;
    }
    setSent(undefined);
    const settings = {
      url: 'http://localhost:3000',
      handleCodeInApp: true
    };
    // send sign in link
    sendSignInLinkToEmail(auth, email, settings)
    .then(() => {
      setSent(true);
      window.localStorage.setItem('emailForSignIn', email);
    })
    .catch(e => setError(getError(e)));
  }

  return (
    <div>
      <Header />
      <div className={styles.content}>
        <div className={styles.center}>
          <div className={styles.overview}>
            <h1>Wickfaces</h1>
            <p>Connect with classmates and stay in touch after graduation.</p>
          </div>
          {
            error ?
            <div className={styles.form}>
              <div className={styles.error}>
              <p>{error}</p>
              <button onClick={() => {
                setError(null);
                setSent(false);
              }}>
                Back
              </button>
              </div>
            </div> :
            sent === undefined ?
            <div className={styles.form}>
              <div className={styles.loading}>
                <CircularProgress />
              </div>
            </div> :
            sent ?
            <div className={styles.form}>
              <div className={styles.sent}>
                <p>Email sucessfully sent to <span>{email}</span></p>
              </div>
            </div> :
            <div className={styles.form}>
              <form onSubmit={e => {
                e.preventDefault();
                register();
              }}>
                <input
                  placeholder="Chadwick email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
                <button>Register</button>
              </form>
              <p>You must have a Chadwick email to register.</p>
              <p>This website is not affiliated with Chadwick School.</p>
            </div>
          }
        </div>
      </div>
      <div className={styles.footer}>
        <div>
        <p>
          &copy; SayeCo {new Date().getFullYear()}
          {' | '}
          <a href="mailto:contact@saye.co">Contact</a>
        </p>
        </div>
      </div>
    </div>
  );
}
