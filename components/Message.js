import Link from 'next/link';

import getAgoText from '../util/getAgoText';

import styles from '../styles/components/Message.module.css';

export default function Message(props) {
  const { message, showHeader } = props;
  const { text, date, name, username } = message;

  return (
    <div className={styles.container}>
      {
        showHeader &&
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
      }
      <p>{text}</p>
    </div>
  );
}
