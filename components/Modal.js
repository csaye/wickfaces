import BaseModal from '@mui/material/Modal';

export default function Modal(props) {
  const { open, setOpen } = props;

  // called on modal close
  function onClose() {
    setOpen(false);
  }

  return (
    <BaseModal
      open={open}
      onClose={onClose}
    >
    </BaseModal>
  );
}
