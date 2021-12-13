import getAgoText from '../util/getAgoText';

import styles from '../styles/components/Message.module.css';

export default function Message(props) {
  const { text, date, name } = props;

  return (
    <div className={styles.container}>
      <p className={styles.head}>
        <span className={styles.name}>
          {name}
        </span>
        <span className={styles.date}>
          {getAgoText(new Date(date))}
        </span>
      </p>
      <p>{text}</p>
    </div>
  );
}
