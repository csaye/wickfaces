import Header from '../components/Header';

import styles from '../styles/pages/Index.module.css';

export default function Index() {
  return (
    <div>
      <Header />
      <div className={styles.footer}>
        <div>
        <p>
          &copy; SayeCo {new Date().getFullYear()}
          {' | '}
          <a href="mailto:contact@saye.co">Contact</a>
        </p>
        </div>
      </div>
    </div>
  );
}
