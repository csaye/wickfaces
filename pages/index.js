import Header from '../components/Header';

import styles from '../styles/pages/Index.module.css';

export default function Index() {
  return (
    <div>
      <Header />
      <div className={styles.content}>
        <div className={styles.center}>
          <div className={styles.overview}>
            <h1>Wickfaces</h1>
            <p>Connect with classmates and stay in touch after graduation.</p>
          </div>
          <div className={styles.form}>
            <form onSubmit={e => {
              e.preventDefault();
              register();
            }}>
              <input
                placeholder="School email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
              <button>Register</button>
            </form>
            <p>You must have a Chadwick email to register.</p>
            <p>This website is not affiliated with Chadwick School.</p>
          </div>
        </div>
      </div>
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
