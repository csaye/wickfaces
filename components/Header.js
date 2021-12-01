import Image from 'next/image';
import Link from 'next/link';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Tooltip from '@mui/material/Tooltip';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import UploadIcon from '@mui/icons-material/Upload';

import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRef } from 'react';

import styles from '../styles/components/Header.module.css';

export default function Header(props) {
  const { currUser } = props;

  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  const fileRef = useRef();

  const uid = currUser?.uid;
  const usersRef = collection(db, 'users');

  // uploads given profile to firebase
  async function uploadProfile(image) {
    if (!image) return;
    // upload image
    const filePath = `profiles/${uid}`;
    const fileRef = ref(storage, filePath);
    await uploadBytes(fileRef, image);
    // update image
    const url = await getDownloadURL(fileRef);
    const userRef = doc(usersRef, uid);
    await updateDoc(userRef, { profile: url });
  }

  return (
    <div className={styles.container}>
      <Link href="/">
        <a className={styles.logo}>
          <Image
            className={styles.image}
            src="/logo.png"
            width="48"
            height="48"
          />
          <h1>Wick<span>faces</span></h1>
        </a>
      </Link>
      <span className="flexfill" />
      {
        currUser &&
        <>
          <Link href="/users">
            <a className={styles.link}>Users</a>
          </Link>
          <Link href={`/${currUser.username}`}>
            <a className={styles.link}>Profile</a>
          </Link>
          <Link href="/board">
            <a className={styles.link}>Board</a>
          </Link>
          <Link href="/messages">
            <a className={styles.link}>Messages</a>
          </Link>
        </>
      }
      {
        (currUser || (auth.currentUser && !auth.currentUser.emailVerified)) &&
        <div className={styles.dial}>
          <SpeedDial
            ariaLabel="SpeedDial"
            direction="down"
            sx={{
              '& > button': {
                background: `center center / cover url(${
                  currUser.profile ?? '/img/blank/profile.png'
                })`
              }
            }}
          >
            <SpeedDialAction
              onClick={() => signOut(auth)}
              icon={<ExitToAppIcon />}
              tooltipTitle="Log Out"
            />
            <SpeedDialAction
              onClick={() => fileRef.current.click()}
              icon={<UploadIcon />}
              tooltipTitle="Change Profile"
            />
          </SpeedDial>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden={true}
            onChange={e => uploadProfile(e.target.files[0])}
          />
        </div>
      }
    </div>
  );
}
