import Image from 'next/image';
import Link from 'next/link';
import PostModal from './PostModal';
import Profile from './Profile';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

import { useState } from 'react';
import {
  arrayUnion, arrayRemove, updateDoc, deleteDoc
} from 'firebase/firestore';
import getAgoText from '../util/getAgoText';

import styles from '../styles/components/Post.module.css';

export default function Post(props) {
  const { post, postRef, currUser } = props;
  const { text, date, uid, username, name, likes, profile } = post;

  const [modalOpen, setModalOpen] = useState(false);

  // toggles like on post
  async function toggleLike() {
    await updateDoc(postRef, {
      likes:
        (likes.includes(currUser.uid) ? arrayRemove : arrayUnion)(currUser.uid)
    });
  }

  // deletes post in firebase
  async function deletePost() {
    if (!window.confirm('Delete post?')) return;
    await deleteDoc(postRef);
  }

  function Content() {
    return (
      <div className={styles.container}>
        <Link href={`/${username}`}>
          <a className={styles.profile} onClick={e => e.stopPropagation()}>
            <Profile src={profile} />
          </a>
        </Link>
        <div className={styles.content}>
          <p className={styles.user}>
            <Link href={`/${username}`}>
              <a onClick={e => e.stopPropagation()}>{name}</a>
            </Link>
            <span>{getAgoText(new Date(date))}</span>
          </p>
          <p className={styles.text}>{text}</p>
          <div className={styles.options}>
            <span className={styles.likes}>{likes.length}</span>
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
            {
              currUser.uid === uid &&
              <button
                className={styles.delete}
                onClick={e => {
                  e.stopPropagation();
                  deletePost();
                }}
              >
                <DeleteIcon />
              </button>
            }
          </div>
        </div>
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
        postRef={postRef}
        currUser={currUser}
      />
    </>
  );
}
