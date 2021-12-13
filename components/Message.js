import getAgoText from '../util/getAgoText';

import styles from '../styles/components/Message.module.css';

export default function Message(props) {
  const { text, date } = props;

  return (
    <div className={styles.container}>
      <span>{getAgoText(new Date(date))}</span>
      <p>{text}</p>
    </div>
  );
}
