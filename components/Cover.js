import Image from 'next/image';

import styles from '../styles/components/Cover.module.css';

export default function Cover(props) {
  const { uid } = props;

  const url = `https://firebasestorage.googleapis.com/v0/b/wickfaces.appspot.com/o/covers%2F${uid}?alt=media`;

  return (
    <div className={styles.container}>
      {
        uid &&
        <Image
          placeholder="blur"
          blurDataURL={url}
          src={url}
          layout="fill"
          objectFit="cover"
        />
      }
    </div>
  );
}
