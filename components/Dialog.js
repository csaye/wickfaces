import BaseDialog from '@mui/material/Dialog';

import styles from '../styles/components/Dialog.module.css';

export default function Dialog(props) {
  const { open, setOpen } = props;

  // called on dialog close
  function onClose() {
    setOpen(false);
  }

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
    >
      <div>
        {props.children}
      </div>
    </BaseDialog>
  );
}
