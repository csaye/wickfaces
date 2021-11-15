import Register from '../components/Register';
import LogIn from '../components/LogIn';

import { useState } from 'react';

import styles from '../styles/pages/Index.module.css';

export default function Index() {
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
