import styles from '../styles/components/Message.module.css';

export default function Message(props) {
  const { text } = props;

  return (
    <div>
      <span>{text}</span>
    </div>
  );
}
