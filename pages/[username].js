import styles from '../styles/pages/User.module.css';

export default function User() {
  return (
    <div className={styles.container}>
      <Header />
      <h1>{userData.firstName} {userData.lastName} &apos;{userData.year}</h1>
      <input
        placeholder="College"
        value={college}
        onChange={e => setCollege(e.target.value)}
      />
      <input
        placeholder="Major"
        value={major}
        onChange={e => setMajor(e.target.value)}
      />
    </div>
  );
}
