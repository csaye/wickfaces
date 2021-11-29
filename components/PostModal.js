import Modal from './Modal';

import styles from '../styles/components/PostModal.module.css';

export default function PostModal(props) {
  const { Content, open, setOpen } = props;

  return (
    <Modal open={open} setOpen={setOpen}>
      <Content />
    </Modal>
  );
}
