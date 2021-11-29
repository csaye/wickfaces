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
          <span>{name}</span>
          <Link href={`/${username}0`}>
            <a onClick={e => e.stopPropagation()}>@{username}</a>
          </Link>
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
