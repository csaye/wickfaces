import Post from './Post';
import Modal from './Modal';

import { getAuth } from 'firebase/auth';
import { getFirestore, query, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import styles from '../styles/components/Posts.module.css';

export default function Posts(props) {
  const { postsRef } = props;

  const auth = getAuth();
  const db = getFirestore();

  // listen for posts
  const postsQuery = query(postsRef, orderBy('date', 'desc'));
  const [posts] = useCollectionData(postsQuery, { idField: 'id' });

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
    </div>
  );
}
