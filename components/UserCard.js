import Link from 'next/link';
import DynamicImage from './DynamicImage';

import styles from '../styles/components/UserCard.module.css';

export default function UserCard(props) {
  const { username, firstName, lastName, year, cover } = props;

  return (
    <div className={styles.container}>
      <Link href={`/${username}`}>
        <a>
          <p>{firstName} {lastName} &apos;{year}</p>
          <DynamicImage
            src={cover}
            width="240px"
            height="320px"
            placeholder="/img/blank/cover.png"
          />
        </a>
      </Link>
    </div>
  );
}
