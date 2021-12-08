import Link from 'next/link';
import Profile from './Profile';
import DeleteIcon from '@mui/icons-material/Delete';

import getAgoText from '../util/getAgoText';
import { deleteDoc } from 'firebase/firestore';

import styles from '../styles/components/Comment.module.css';

export default function Comment(props) {
  const { comment, commentRef, currUser } = props;
  const { text, date, profile, uid, likes, name, username } = comment;

  // deletes comment in firebase
  async function deleteComment() {
    if (!window.confirm('Delete comment?')) return;
    await deleteDoc(commentRef);
  }

  return (
    <div className={styles.container}>
      <Link href={`/${username}`}>
        <a className={styles.profile}>
          <Profile src={profile} />
        </a>
      </Link>
      <div className={styles.content}>
        <Link href={`/${username}`}>
          <a>{name}</a>
        </Link>
        <p>{text}</p>
        <span>{getAgoText(new Date(date))}</span>
      </div>
      {
        currUser.uid === uid &&
        <button onClick={deleteComment}>
          <DeleteIcon />
        </button>
      }
    </div>
  );
}
