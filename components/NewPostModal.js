import Modal from './Modal';
import UploadIcon from '@mui/icons-material/Upload';

import { useState } from 'react';
import { addDoc } from 'firebase/firestore';
import {
  getStorage, ref, uploadBytes, getDownloadURL
} from 'firebase/storage';
import { v4 as uuid } from 'uuid';

import styles from '../styles/components/NewPostModal.module.css';

export default function NewPostModal(props) {
  const { open, setOpen, postsRef, currUser } = props;

  const storage = getStorage();

  const [text, setText] = useState('');
  const [image, setImage] = useState(undefined);

  // uploads image to firebase and returns url
  async function uploadImage() {
    // upload image
    const filePath = `posts/${uuid()}`;
    const fileRef = ref(storage, filePath);
    await uploadBytes(fileRef, image);
    // return download url
    return await getDownloadURL(fileRef);
  }

  // creates new post in firebase
  async function createPost() {
    setOpen(false);
    setText('');
    const imageUrl = await uploadImage();
    await addDoc(postsRef, {
      image: imageUrl,
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
