import styles from '../styles/components/Comment.module.css';

export default function Comment(props) {
  const { comment } = props;
  const { text, date } = comment;

  return (
    <div>
      <p>{text}</p>
      <span>
        {new Date(date).toLocaleDateString()}
        {' '}
        {new Date(date).toLocaleTimeString()}
      </span>
    </div>
  );
}
