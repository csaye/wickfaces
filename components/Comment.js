import Link from 'next/link';
import Profile from './Profile';

import getAgoText from '../util/getAgoText';

import styles from '../styles/components/Comment.module.css';

export default function Comment(props) {
  const { comment } = props;
  const { text, date, profile, uid, likes, name, username } = comment;

  return (
    <div className={styles.container}>
      <Link href={`/${username}`}>
        <a className={styles.profile}>
          <Profile src={profile} />
        </a>
      </Link>
      <div className={styles.content}>
        <Link href={`/${username}`}>
          <a>{name}</a>
        </Link>
        <p>{text}</p>
        <span>{getAgoText(new Date(date))}</span>
      </div>
    </div>
  );
}
