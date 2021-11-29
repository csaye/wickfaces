import Modal from './Modal';

import { useState } from 'react';
import { addDoc } from 'firebase/firestore';

import styles from '../styles/components/NewPostModal.module.css';

export default function NewPostModal(props) {
  const { open, setOpen, postsRef, currUser } = props;

  const [text, setText] = useState('');

  // creates new post in firebase
  async function createPost() {
    setOpen(false);
    setText('');
    await addDoc(postsRef, {
      name: `${currUser.firstName} ${currUser.lastName}`,
      username: currUser.username,
      uid: currUser.uid,
      text: text,
      date: new Date().getTime()
    });
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <h1>New Post</h1>
      <form onSubmit={e => {
        e.preventDefault();
        createPost();
      }}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <button className="bluebutton">
          Create Post
        </button>
      </form>
    </Modal>
  );
}
