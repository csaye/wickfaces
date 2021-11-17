import Link from 'next/link';

import styles from '../styles/components/Authed.module.css';

export default function Authed(props) {
  const { currUser } = props;

  return (
    <div className={styles.container}>
      <h1>Welcome to Wickfaces!</h1>
      <p><i>To get started:</i></p>
      <div className={styles.links}>
        <Link href="/users">
          <a>Explore users</a>
        </Link>
        <Link href={`/${currUser?.username}`}>
          <a>View your profile</a>
        </Link>
        <Link href="/board">
          <a>Post to the board</a>
        </Link>
        <Link href="/messages">
          <a>Send a message</a>
        </Link>
      </div>
    </div>
  );
}
