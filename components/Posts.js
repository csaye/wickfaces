import Post from './Post';

import { getAuth } from 'firebase/auth';
import {
  getFirestore, collection, addDoc, query, orderBy
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState } from 'react';

import styles from '../styles/components/Posts.module.css';

export default function Posts(props) {
  const { poster } = props;

  const [text, setText] = useState('');

  const auth = getAuth();
  const db = getFirestore();

  const uid = auth.currentUser.uid;

  // listen for posts
  const postsRef = collection(db, 'users', poster, 'posts');
  const postsQuery = query(postsRef, orderBy('date', 'desc'));
  const [posts] = useCollectionData(postsQuery, { idField: 'id' });

  // creates post in firebase
  async function createPost() {
    setText('');
    await addDoc(postsRef, {
      text: text,
      date: new Date().getTime()
    });
  }

  if (!posts) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        {
          !posts.length ?
          <p>No posts yet</p> :
          posts.map(post =>
            <Post {...post} key={post.id} />
          )
        }
      </div>
      {
        poster === uid &&
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
      }
    </div>
  );
}
