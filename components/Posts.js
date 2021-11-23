import Post from './Post';

import { getFirestore, collection } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import styles from '../styles/components/Posts.module.css';

export default function Posts(props) {
  const { uid } = props;

  const db = getFirestore();

  // listen for posts
  const postsRef = collection(db, 'users', uid, 'posts');
  const [posts] = useCollectionData(postsRef);

  if (!posts) return <p>Loading...</p>;

  return (
    <div>
      {
        posts.map(post =>
          <Post {...post} />
        )
      }
    </div>
  );
}
