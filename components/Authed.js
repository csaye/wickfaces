import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChatIcon from '@mui/icons-material/Chat';
import Link from 'next/link';

import styles from '../styles/components/Authed.module.css';

export default function Authed(props) {
  const { currUser } = props;

  return (
    <div className={styles.container}>
      <h1>Welcome to Wickfaces!</h1>
      <p><i>To get started:</i></p>
      <div className={styles.links}>
        <span>
          <PeopleIcon />
          <Link href="/users">
            <a>Explore users</a>
          </Link>
        </span>
        <span>
          <AccountCircleIcon />
          <Link href={`/${currUser?.username}`}>
            <a>View your profile</a>
          </Link>
        </span>
        <span>
          <DashboardIcon />
          <Link href="/board">
            <a>Post to the board</a>
          </Link>
        </span>
        <span>
          <ChatIcon />
          <Link href="/messages">
            <a>Send a message</a>
          </Link>
        </span>
      </div>
    </div>
  );
}
