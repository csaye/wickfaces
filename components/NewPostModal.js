import Modal from './Modal';

import styles from '../styles/components/NewPostModal.module.css';

export default function NewPostModal(props) {
  const { open, setOpen } = props;

  return (
    <Modal open={open} setOpen={setOpen}>
      <h1>New Post</h1>
      <form onSubmit={e => {
        e.preventDefault();
        createPost();
      }}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <button>Create Post</button>
      </form>
    </Modal>
  );
}
