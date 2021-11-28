import Loading from '../components/Loading';
import NewPostModal from '../components/NewPostModal';
import Router from 'next/router';
import Posts from '../components/Posts';

import { getFirestore, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import styles from '../styles/pages/Board.module.css';

export default function Board(props) {
  const { currUser } = props;

  const [modalOpen, setModalOpen] = useState(false);

  // get posts
  const db = getFirestore();
  const postsRef = collection(db, 'board');

  // route home if not authed
  useEffect(() => {
    if (currUser === false) Router.replace('/');
  }, [currUser]);

  // load if no data yet
  if (!currUser) return <Loading />;

  return (
    <div className={styles.container}>
      <div className={styles.sidepanel}>
        <h1>Board</h1>
        <button
          className={styles.newbtn}
          onClick={() => setModalOpen(true)}
        >
          New Post
        </button>
      </div>
      <Posts postsRef={postsRef} />
      <NewPostModal
        postsRef={postsRef}
        open={modalOpen}
        setOpen={setModalOpen}
      />
    </div>
  );
}
