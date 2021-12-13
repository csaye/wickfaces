import Link from 'next/link';

import getAgoText from '../util/getAgoText';

import styles from '../styles/components/Message.module.css';

export default function Message(props) {
  const { text, date, name, username } = props;

  return (
    <div className={styles.container}>
      <p>
        <Link href={`/${username}`}>
          <a className={styles.name}>
            {name}
          </a>
        </Link>
        <span className={styles.date}>
          {getAgoText(new Date(date))}
        </span>
      </p>
      <p>{text}</p>
    </div>
  );
}
