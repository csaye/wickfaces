import Verify from '../components/Verify';
import Register from '../components/Register';
import LogIn from '../components/LogIn';

import { useEffect, useState } from 'react';
import { getAuth, sendEmailVerification } from 'firebase/auth';

import styles from '../styles/pages/Index.module.css';

export default function Index(props) {
  const { currUser, verifyEmail } = props;

  const auth = getAuth();

  const [register, setRegister] = useState(false);

  return (
    <div>
      <div className={styles.content}>
        <div className={styles.center}>
          <div className={styles.overview}>
            <h1>Wickfaces</h1>
            <p>Connect with classmates and stay in touch after graduation.</p>
          </div>
          {
            currUser ?
            <p>You are authed.</p> :
            (auth.currentUser && !auth.currentUser.emailVerified) ?
            <Verify /> :
            register ?
            <Register setRegister={setRegister} /> :
            <LogIn setRegister={setRegister} />
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
