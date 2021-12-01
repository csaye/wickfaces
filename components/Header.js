import Image from 'next/image';
import Link from 'next/link';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Tooltip from '@mui/material/Tooltip';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

import { getAuth, signOut } from 'firebase/auth';

import styles from '../styles/components/Header.module.css';

export default function Header(props) {
  const { currUser } = props;

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
        currUser &&
        <>
          <Link href="/users">
            <a className={styles.link}>Users</a>
          </Link>
          <Link href={`/${currUser.username}`}>
            <a className={styles.link}>Profile</a>
          </Link>
          <Link href="/board">
            <a className={styles.link}>Board</a>
          </Link>
          <Link href="/messages">
            <a className={styles.link}>Messages</a>
          </Link>
        </>
      }
      {
        (currUser || (auth.currentUser && !auth.currentUser.emailVerified)) &&
        <SpeedDial
          ariaLabel="SpeedDial"
          icon={<SpeedDialIcon />}
          direction="down"
        >
          <SpeedDialAction
            onClick={() => signOut(auth)}
            icon={<ExitToAppIcon />}
            name="Log Out"
            tooltipTitle="Log Out"
          />
        </SpeedDial>
      }
    </div>
  );
}
