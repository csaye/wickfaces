import Router from 'next/router';
import Posts from '../components/Posts';

import { getFirestore, collection } from 'firebase/firestore';
import { useEffect } from 'react';

import styles from '../styles/pages/Board.module.css';

export default function Board(props) {
  const { currUser } = props;

  // get posts
  const db = getFirestore();
  const postsRef = collection(db, 'board');

  // route home if not authed
  useEffect(() => {
    if (currUser === false) Router.replace('/');
  }, [currUser]);

  // load if no data yet
  if (!currUser) return <p>Loading...</p>;

  return (
    <Posts postsRef={postsRef} />
  );
}
