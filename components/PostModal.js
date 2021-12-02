import Loading from './Loading';
import Comment from './Comment';
import Modal from './Modal';

import {
  getFirestore, deleteDoc, collection, query, orderBy
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import styles from '../styles/components/PostModal.module.css';

export default function PostModal(props) {
  const { Content, open, setOpen, postRef } = props;

  const db = getFirestore();

  // listen for comments
  const commentsRef = collection(postRef, 'comments');
  const commentsQuery = query(commentsRef, orderBy('date', 'desc'));
  const [comments] = useCollectionData(commentsQuery, { idField: 'id' });

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
      {
        !comments ?
        <Loading /> :
        comments.map(comment =>
          <Comment comment={comment} key={comment.id} />
        )
      }
    </Modal>
  );
}
