import Loading from './Loading';
import Message from './Message';

import { useState } from 'react';
import { query, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import styles from '../styles/components/Messages.module.css';

export default function Messages(props) {
  const { messagesRef } = props;

  const [text, setText] = useState('');

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
      <form onSubmit={e => {
        e.preventDefault();
        addMessage();
      }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <button>Send</button>
      </form>
    </div>
  );
}
