import Loading from './Loading';
import Post from './Post';
import NewPostModal from './NewPostModal';
import AddIcon from '@mui/icons-material/Add';

import { getAuth } from 'firebase/auth';
import { getFirestore, query, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState } from 'react';

import styles from '../styles/components/Posts.module.css';

export default function Posts(props) {
  const { postsRef, allowPosts } = props;

  const auth = getAuth();
  const db = getFirestore();

  const [modalOpen, setModalOpen] = useState(false);

  // listen for posts
  const postsQuery = query(postsRef, orderBy('date', 'desc'));
  const [posts] = useCollectionData(postsQuery, { idField: 'id' });

  if (!posts) return <Loading />;

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
        allowPosts &&
        <button onClick={() => setModalOpen(true)}>
          <AddIcon />
        </button>
      }
      <NewPostModal
        postsRef={postsRef}
        open={modalOpen}
        setOpen={setModalOpen}
      />
    </div>
  );
}
