import Image from 'next/image';
import Link from 'next/link';
import Cover from './Cover';

import styles from '../styles/components/UserCard.module.css';

export default function UserCard(props) {
  const { username, firstName, lastName, year, cover } = props;

  return (
    <div className={styles.container}>
      <Link href={`/${username}`}>
        <a>
          <p>{firstName} {lastName} &apos;{year}</p>
          <Cover image={cover} />
        </a>
      </Link>
    </div>
  );
}
