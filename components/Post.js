import styles from '../styles/components/Post.module.css';

export default function Post(props) {
  const { text, date } = props;

  return (
    <div>
      <p>{text}</p>
      <p>{new Date(date).toLocaleDateString()}</p>
    </div>
  );
}
