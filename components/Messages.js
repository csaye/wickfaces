import Loading from './Loading';
import Message from './Message';

import { query, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import styles from '../styles/components/Messages.module.css';

export default function Messages(props) {
  const { messagesRef } = props;

  // listen for posts
  const messagesQuery = query(messagesRef, orderBy('date', 'desc'));
  const [messages] = useCollectionData(messagesQuery, { idField: 'id' });

  // return if loading
  if (!messages) return <Loading />;

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
