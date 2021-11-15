import Image from 'next/image';
import Link from 'next/link';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Tooltip from '@mui/material/Tooltip';

import { getAuth, signOut } from 'firebase/auth';

import styles from '../styles/components/Header.module.css';

export default function Header() {
  const auth = getAuth();

  return (
    <div className={styles.container}>
      <Link href="/">
        <a className={styles.logo}>
          <Image
            className={styles.image}
            src="/logo.png"
            width="48"
            height="48"
          />
          <h1>Wick<span>faces</span></h1>
        </a>
      </Link>
      <span className="flexfill" />
      {
        auth.currentUser &&
        <>
          <Link href="/profile">
            <a className={styles.link}>Profile</a>
          </Link>
          <Link href="/board">
            <a className={styles.link}>Board</a>
          </Link>
          <Link href="/messages">
            <a className={styles.link}>Messages</a>
          </Link>
          <Tooltip title="Sign Out" arrow>
            <button onClick={() => signOut(auth)}>
              <ExitToAppIcon />
            </button>
          </Tooltip>
        </>
      }
    </div>
  );
}
