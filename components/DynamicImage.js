import Loading from './Loading';
import Image from 'next/image';

import styles from '../styles/components/DynamicImage.module.css';

export default function DynamicImage(props) {
  const { src, width, height, placeholder } = props;

  return (
    <div
      className={styles.container}
      style={{
        width, height,
        backgroundImage: placeholder ? `url(${placeholder})` : null
      }}
    >
      {
        src === undefined ?
        <Loading /> :
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
