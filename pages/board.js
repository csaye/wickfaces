import Router from 'next/router';
import Post from '../components/Post';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirestore, collection } from 'firebase/firestore';
import { useEffect } from 'react';

import styles from '../styles/pages/Board.module.css';

export default function Board(props) {
  const { currUser } = props;

  const db = getFirestore();

  // get posts
  const postsRef = collection(db, 'board');
  const [posts] = useCollectionData(postsRef);

  // route home if not authed
  useEffect(() => {
    if (currUser === false) Router.replace('/');
  }, [currUser]);

  // load if no data yet
  if (!currUser || !posts) return <p>Loading...</p>;

  return (
    <div>
      {
        !posts.length ?
        <p>No posts yet</p> :
        posts.map(post =>
          <Post key={post.id} />
        )
      }
    </div>
  );
}
