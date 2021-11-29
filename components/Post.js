import Link from 'next/link';
import PostModal from './PostModal';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useState } from 'react';
import { arrayUnion, arrayRemove, updateDoc } from 'firebase/firestore';

import styles from '../styles/components/Post.module.css';

export default function Post(props) {
  const { post, postRef, currUser } = props;
  const { text, date, uid, username, name, likes } = post;

  const [modalOpen, setModalOpen] = useState(false);

  // toggles like on post
  async function toggleLike() {
    await updateDoc(postRef, {
      likes:
        (likes.includes(currUser.uid) ? arrayRemove : arrayUnion)(currUser.uid)
    });
  }

  function Content() {
    return (
      <div className={styles.container}>
        <p className={styles.user}>
          <Link href={`/${username}`}>
            <a onClick={e => e.stopPropagation()}>{name}</a>
          </Link>
          <span>@{username}</span>
        </p>
        <p className={styles.text}>{text}</p>
        <span className={styles.date}>
          {new Date(date).toLocaleDateString()}
          {' '}
          {new Date(date).toLocaleTimeString()}
        </span>
        <span>{likes.length}</span>
        <button
          className={styles.heart}
          onClick={e => {
            e.stopPropagation();
            toggleLike();
          }}
        >
          {
            likes.includes(currUser.uid) ?
            <FavoriteIcon /> :
            <FavoriteBorderIcon />
          }
        </button>
      </div>
    )
  }

  return (
    <>
      <div
        className={styles.outer}
        onClick={() => setModalOpen(true)}
      >
        <Content />
      </div>
      <PostModal
        Content={Content}
        open={modalOpen}
        setOpen={setModalOpen}
      />
    </>
  );
}
