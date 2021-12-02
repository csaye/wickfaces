import Link from 'next/link';

import styles from '../styles/components/Comment.module.css';

export default function Comment(props) {
  const { comment } = props;
  const { text, date, profile, uid, likes, name, username } = comment;

  return (
    <div className={styles.container}>
      <Link href={`/${username}`}>
        <a>{name}</a>
      </Link>
      <p>{text}</p>
      <span>
        {new Date(date).toLocaleDateString()}
        {' '}
        {new Date(date).toLocaleTimeString()}
      </span>
    </div>
  );
}
