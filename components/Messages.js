import Loading from './Loading';
import Message from './Message';

import { useState } from 'react';
import { query, orderBy, addDoc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import styles from '../styles/components/Messages.module.css';

export default function Messages(props) {
  const { messagesRef, currUser } = props;

  const [text, setText] = useState('');

  // listen for posts
  const messagesQuery = query(messagesRef, orderBy('date', 'desc'));
  const [messages] = useCollectionData(messagesQuery, { idField: 'id' });

  // adds a new message in firebase
  async function addMessage() {
    await addDoc(messagesRef, {
      text: text,
      date: new Date().getTime(),
      uid: currUser.uid,
      name: `${currUser.firstName} ${currUser.lastName}`,
      username: currUser.username,
      profile: currUser.profile
    })
  }

  // return if loading
  if (!messages) return <Loading />;

  return (
    <div className={styles.container}>
      {
        messages.map(message =>
          <Message {...message} key={message.id} />
        )
      }
      <form
        className={styles.form}
        onSubmit={e => {
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
