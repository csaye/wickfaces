import Message from './Message';

import styles from '../styles/components/Messages.module.css';

export default function Messages() {
  return (
    <div>
      {
        messages.map(message =>
          <Message {...message} key={message.id} />
        )
      }
    </div>
  );
}
