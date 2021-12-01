import Image from 'next/image';

import styles from '../styles/components/Profile.module.css';

export default function Profile(props) {
  const { src } = props;

  return (
    <div className={styles.container}>
      {
        src &&
        <Image
          placeholder="blur"
          blurDataURL={src}
          src={src}
          layout="fill"
          objectFit="cover"
        />
      }
    </div>
  );
}
