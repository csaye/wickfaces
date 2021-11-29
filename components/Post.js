import Link from 'next/link';
import PostModal from './PostModal';

import { useState } from 'react';

import styles from '../styles/components/Post.module.css';

export default function Post(props) {
  const { text, date, uid, username, name } = props;

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        className={styles.container}
      >
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
      </div>
      <PostModal post={props} open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}
