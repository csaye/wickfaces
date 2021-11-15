import styles from '../styles/components/LogIn.module.css';

export default function LogIn(props) {
  return (
    <div className={styles.container}>
      <form onSubmit={e => {
        e.preventDefault();
        logIn();
      }}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <button>Log in</button>
      </form>
      {
        error &&
        <Alert className={styles.error} severity="error">
          {error}
        </Alert>
      }
      <p className={styles.switch}>
        No account?{' '}
        <span onClick={() => setRegister(true)}>
          Register
        </span>
      </p>
      <div className={styles.info}>
        <p>
          Forgot password?{' '}
          <span onClick={() => {}}>
            Reset password
          </span>
        </p>
        <p>This website is not affiliated with Chadwick School.</p>
      </div>
    </div>
  );
}
