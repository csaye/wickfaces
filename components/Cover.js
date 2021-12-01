import Loading from './Loading';
import Image from 'next/image';

import styles from '../styles/components/Cover.module.css';

export default function Cover(props) {
  const { src } = props;

  return (
    <div className={styles.container}>
      {
        src === undefined ?
        <Loading /> :
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
