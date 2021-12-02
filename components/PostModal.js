import Loading from './Loading';
import Comment from './Comment';
import Dialog from './Dialog';

import {
  getFirestore, collection, query, orderBy, addDoc
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
    <Dialog open={open} setOpen={setOpen}>
      <Content />
      <h1>Comments</h1>
      <div className={styles.comments}>
        {
          !comments ?
          <Loading /> :
          comments.map(comment =>
            <Comment comment={comment} key={comment.id} />
          )
        }
      </div>
      <div className={styles.form}>
        <form onSubmit={e => {
          e.preventDefault();
          addComment();
        }}>
          <input
            className="smlinput"
            placeholder="Comment"
            value={text}
            onChange={e => setText(e.target.value)}
            required
          />
          <button className="bluebutton">Post Comment</button>
        </form>
      </div>
    </Dialog>
  );
}
