import Modal from './Modal';

import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { addDoc } from 'firebase/firestore';

import styles from '../styles/components/NewPostModal.module.css';

export default function NewPostModal(props) {
  const { open, setOpen, postsRef } = props;

  const [text, setText] = useState('');

  const auth = getAuth();

  // creates new post in firebase
  async function createPost() {
    setOpen(false);
    setText('');
    await addDoc(postsRef, {
      uid: auth.currentUser.uid,
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
        <button>Create Post</button>
      </form>
    </Modal>
  );
}
