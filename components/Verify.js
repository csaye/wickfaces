import styles from '../styles/components/Verify.module.css';

import { getAuth, sendEmailVerification } from 'firebase/auth';

export default function Verify() {
  const auth = getAuth();

  return (
    <div className={styles.container}>
      <p>You&apos;re almost there.</p>
      <p>Check {auth.currentUser.email} to verify your account.</p>
      <button onClick={() => sendEmailVerification(auth.currentUser)}>
        Resend Verification
      </button>
    </div>
  );
}
