import Loading from './Loading';
import Comment from './Comment';
import Modal from './Modal';

import {
  getFirestore, deleteDoc, collection, query, orderBy, addDoc
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState } from 'react';

import styles from '../styles/components/PostModal.module.css';

export default function PostModal(props) {
  const { Content, open, setOpen, postRef, currUser } = props;

  const db = getFirestore();

  const [text, setText] = useState('');

  // listen for comments
  const commentsRef = collection(postRef, 'comments');
  const commentsQuery = query(commentsRef, orderBy('date', 'desc'));
  const [comments] = useCollectionData(commentsQuery, { idField: 'id' });

  // deletes post in firebase
  async function deletePost() {
    if (!window.confirm('Delete post?')) return;
    await deleteDoc(postRef);
  }

  // adds a comment to post
  async function addComment() {
    setText('');
    await addDoc(commentsRef, {
      text: text,
      date: new Date().getTime(),
      username: currUser.username,
      name: `${currUser.firstName} ${currUser.lastName}`,
      profile: currUser.profile,
      uid: currUser.uid,
      likes: []
    });
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
      <form onSubmit={e => {
        e.preventDefault();
        addComment();
      }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <button>Post Comment</button>
      </form>
    </Modal>
  );
}
