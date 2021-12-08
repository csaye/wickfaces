import Image from 'next/image';

import styles from '../styles/components/DynamicImage.module.css';

export default function DynamicImage(props) {
  const { src } = props;

  return (
    <div>
      <Image src={src} />
    </div>
  );
}
