import Link from 'next/link';
import PostModal from './PostModal';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useState } from 'react';

import styles from '../styles/components/Post.module.css';

export default function Post(props) {
  const { post, currUser } = props;
  const { text, date, uid, username, name, likes } = post;

  const [modalOpen, setModalOpen] = useState(false);

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
        {
          likes.includes(currUser.uid) ?
          <button className={styles.heart}>
            <FavoriteIcon />
          </button> :
          <button className={styles.heart}>
            <FavoriteBorderIcon />
          </button>
        }
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
