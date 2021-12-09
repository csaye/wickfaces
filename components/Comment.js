import Link from 'next/link';
import DynamicImage from './DynamicImage';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

import getAgoText from '../util/getAgoText';
import {
  deleteDoc, updateDoc, arrayRemove, arrayUnion
} from 'firebase/firestore';

import styles from '../styles/components/Comment.module.css';

export default function Comment(props) {
  const { comment, commentRef, currUser } = props;
  const { text, date, profile, uid, likes, name, username } = comment;

  // toggles like on post
  async function toggleLike() {
    await updateDoc(commentRef, {
      likes:
        (likes.includes(currUser.uid) ? arrayRemove : arrayUnion)(currUser.uid)
    });
  }

  // deletes comment in firebase
  async function deleteComment() {
    if (!window.confirm('Delete comment?')) return;
    await deleteDoc(commentRef);
  }

  return (
    <div className={styles.container}>
      <Link href={`/${username}`}>
        <a className={styles.profile}>
          <DynamicImage
            src={profile}
            width="48px"
            height="48px"
            placeholder="/img/blank/profile.png"
          />
        </a>
      </Link>
      <div className={styles.content}>
        <Link href={`/${username}`}>
          <a>{name}</a>
        </Link>
        <span>{getAgoText(new Date(date))}</span>
        <p>{text}</p>
      </div>
      <div className={styles.options}>
        <span>{likes.length}</span>
        <button
          className={styles.heart}
          onClick={toggleLike}
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
            onClick={deleteComment}
          >
            <DeleteIcon />
          </button>
        }
      </div>
    </div>
  );
}
