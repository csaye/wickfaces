import Modal from './Modal';

import styles from '../styles/components/PostModal.module.css';

export default function PostModal(props) {
  const { post, open, setOpen } = props;
  const { text, date, uid } = post;

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className={styles.post}>
        <p>{text}</p>
        <span>{new Date(date).toLocaleDateString()}</span>
      </div>
    </Modal>
  );
}
