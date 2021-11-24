import styles from '../styles/components/Post.module.css';

export default function Post(props) {
  const { text, date } = props;

  return (
    <div className={styles.container}>
      <p>{text}</p>
      <span>{new Date(date).toLocaleDateString()}</span>
      <div className={styles.arrow} />
    </div>
  );
}
