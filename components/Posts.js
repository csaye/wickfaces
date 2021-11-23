import Post from './Post';

import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';
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
  const [posts] = useCollectionData(postsRef);

  if (!posts) return <p>Loading...</p>;

  return (
    <div>
      {
        !posts.length ?
        <p>No posts yet</p> :
        posts.map(post =>
          <Post {...post} />
        )
      }
      {
        poster === uid &&
        <form onSubmit={e => {
          e.preventDefault();
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