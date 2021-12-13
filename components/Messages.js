import Loading from './Loading';
import Message from './Message';

import { useEffect, useState } from 'react';
import { query, orderBy, addDoc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import styles from '../styles/components/Messages.module.css';

// milliseconds before message head expires
const headExpire = 1000 * 60 * 5;

export default function Messages(props) {
  const { messagesRef, currUser, selectedUser } = props;

  const [text, setText] = useState('');

  // listen for posts
  const messagesQuery = query(messagesRef, orderBy('date', 'desc'));
  const [messages] = useCollectionData(messagesQuery, { idField: 'id' });

  // adds a new message in firebase
  async function addMessage() {
    setText('');
    await addDoc(messagesRef, {
      text: text,
      date: new Date().getTime(),
      uid: currUser.uid,
      name: `${currUser.firstName} ${currUser.lastName}`,
      username: currUser.username,
      profile: currUser.profile
    })
  }

  // reset text when selected user changes
  useEffect(() => {
    setText('');
  }, [selectedUser]);

  // returns whether header should be shown
  function showHeader(message, i) {
    // return true if first message
    if (i === 0) return true;
    const last = messages[i - 1];
    // return true if different sender
    if (message.uid !== last.uid) return true;
    // return true if enough time passed
    if (new Date(last.date) - new Date(message.date) > headExpire) return true;
    // return false if invalid for header
    return false;
  }

  // return if loading
  if (!messages) return <Loading />;

  return (
    <div className={styles.container}>
      {
        messages.map((message, i) =>
          <Message
            showHeader={showHeader(message, i)}
            message={message}
            key={message.id}
          />
        )
      }
      <form
        className={styles.form}
        onSubmit={e => {
          e.preventDefault();
          addMessage();
        }}>
        <input
          placeholder={`Message ${selectedUser.firstName}`}
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <button>Send</button>
      </form>
    </div>
  );
}
