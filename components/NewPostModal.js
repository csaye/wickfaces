import Modal from './Modal';
import UploadIcon from '@mui/icons-material/Upload';

import { useState } from 'react';
import { addDoc } from 'firebase/firestore';

import styles from '../styles/components/NewPostModal.module.css';

export default function NewPostModal(props) {
  const { open, setOpen, postsRef, currUser } = props;

  const [text, setText] = useState('');
  const [image, setImage] = useState(undefined);

  // creates new post in firebase
  async function createPost() {
    setOpen(false);
    setText('');
    await addDoc(postsRef, {
      name: `${currUser.firstName} ${currUser.lastName}`,
      profile: currUser.profile,
      username: currUser.username,
      uid: currUser.uid,
      text: text,
      date: new Date().getTime(),
      likes: []
    });
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <h1>New Post</h1>
      <form
        className={styles.form}
        onSubmit={e => {
          e.preventDefault();
          createPost();
        }}
      >
        <label>
          <UploadIcon />
          <input
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files[0])}
            hidden
          />
        </label>
        <textarea
          placeholder="What's happening?"
          value={text}
          onChange={e => setText(e.target.value)}
          cols="32"
          rows="4"
          required
        />
        <button className="bluebutton">
          Create Post
        </button>
      </form>
    </Modal>
  );
}
