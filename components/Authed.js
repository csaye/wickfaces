import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
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
      <h1><EmojiPeopleIcon />Welcome to Wickfaces!</h1>
      <p>To get started:</p>
      <div className={styles.links}>
        <Link href="/users">
          <a>
            <PeopleIcon />
            Explore users
          </a>
        </Link>
        <Link href={`/${currUser?.username}`}>
          <a>
            <AccountCircleIcon />
            View your profile
          </a>
        </Link>
        <Link href="/board">
          <a>
            <DashboardIcon />
            Post to the board
          </a>
        </Link>
        <Link href="/messages">
          <a>
            <ChatIcon />
            Send a message
          </a>
        </Link>
      </div>
    </div>
  );
}
