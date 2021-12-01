import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

import styles from '../styles/components/Verify.module.css';

import { useState } from 'react';
import { getAuth, sendEmailVerification } from 'firebase/auth';

export default function Verify() {
  const auth = getAuth();

  const [sent, setSent] = useState(false);

  return (
    <div className={styles.container}>
      <h1><LibraryAddCheckIcon />You&apos;re almost there.</h1>
      <p className={styles.check}>
        Check <u>{auth.currentUser.email}</u> to verify your account.
      </p>
      <div className={styles.info}>
        {
          sent ?
          <p>Resent. Please check your email.</p> :
          <p>
            Didn&apos;t see an email?{' '}
            <span onClick={() => {
              setSent(true);
              sendEmailVerification(auth.currentUser);
            }}>
              Resend verification
            </span>
          </p>
        }
        <p>This website is not affiliated with Chadwick School.</p>
      </div>
    </div>
  );
}
