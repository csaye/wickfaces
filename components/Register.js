import styles from '../styles/components/Register.module.css';

export default function Register(props) {
  return (
    <div className={styles.container}>
      <form onSubmit={e => {
        e.preventDefault();
        register();
      }}>
        <div className={styles.nameinput}>
          <input
            placeholder="First name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
          <input
            placeholder="Last name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
          </div>
        <input
          placeholder="Chadwick email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <input
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          autoComplete="new-password"
          required
        />
        <button>Register</button>
      </form>
      {
        error &&
        <Alert className={styles.error} severity="error">
          {error}
        </Alert>
      }
      <p className={styles.switch}>
        Have an account?{' '}
        <span onClick={() => setRegister(false)}>
          Log in
        </span>
      </p>
      <div className={styles.info}>
        <p>You must have a Chadwick email to register.</p>
        <p>This website is not affiliated with Chadwick School.</p>
      </div>
    </div>
  );
}
