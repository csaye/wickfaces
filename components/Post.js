import PostModal from './PostModal';

import { useState } from 'react';

import styles from '../styles/components/Post.module.css';

export default function Post(props) {
  const { text, date } = props;

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        className={styles.container}
      >
        <p>{text}</p>
        <span>{new Date(date).toLocaleDateString()}</span>
      </div>
      <PostModal post={props} open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}
