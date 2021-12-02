import Link from 'next/link';

import styles from '../styles/pages/404.module.css';

export default function Page404() {
  return (
    <div className={styles.container}>
      <h1>404 <span>| Page not found</span></h1>
      <Link href="/">
        <a>Return home</a>
      </Link>
    </div>
  );
}
