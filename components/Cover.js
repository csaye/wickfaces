import Image from 'next/image';

import styles from '../styles/components/Cover.module.css';

export default function Cover(props) {
  const { image } = props;

  return (
    <div className={styles.container}>
      {
        image &&
        <Image
          placeholder="blur"
          blurDataURL={image}
          src={image}
          layout="fill"
          objectFit="cover"
        />
      }
    </div>
  );
}
