import getAgoText from '../util/getAgoText';

import styles from '../styles/components/Message.module.css';

export default function Message(props) {
  const { text, date } = props;

  return (
    <div>
      <span>{text}</span>
      <span>{getAgoText(new Date(date))}</span>
    </div>
  );
}
