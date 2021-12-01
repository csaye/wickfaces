import Modal from './Modal';

import { getFirestore, deleteDoc } from 'firebase/firestore';

import styles from '../styles/components/PostModal.module.css';

export default function PostModal(props) {
  const { Content, open, setOpen, postRef } = props;

  const db = getFirestore();

  // deletes post in firebase
  async function deletePost() {
    if (!window.confirm('Delete post?')) return;
    await deleteDoc(postRef);
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <Content />
      <button onClick={deletePost}>
        Delete Post
      </button>
    </Modal>
  );
}
