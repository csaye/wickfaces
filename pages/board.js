import Post from '../components/Post';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirestore, collection } from 'firebase/firestore';

import styles from '../styles/pages/Board.module.css';

export default function Board() {
  const db = getFirestore();

  // get posts
  const postsRef = collection(db, 'board');
  const [posts] = useCollectionData(postsRef);

  return (
    <div>
      {
        !posts ?
        <p>Loading...</p> :
        !posts.length ?
        <p>No posts yet</p> :
        posts.map(post =>
          <Post key={post.id} />
        )
      }
    </div>
  );
}
