import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Image from 'next/image';

import { getAuth } from 'firebase/auth';
import {
  getFirestore, collection, query, where, getDocs, doc, updateDoc
} from 'firebase/firestore';
import {
  getStorage, ref, uploadBytes, getDownloadURL
} from 'firebase/storage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import styles from '../styles/pages/User.module.css';

export default function User() {
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  const usersRef = collection(db, 'users');
  const uid = auth.currentUser?.uid;

  const [userData, setUserData] = useState(undefined);
  const [editing, setEditing] = useState(false);

  const [college, setCollege] = useState('');
  const [major, setMajor] = useState('');

  const router = useRouter();
  const { username } = router.query;

  // gets user data from firebase
  async function getUserData() {
    // query user
    const userQuery = query(usersRef, where('username', '==', username));
    const docs = await getDocs(userQuery);
    // set user data
    if (!docs.docs.length) setUserData(null);
    else setUserData(docs.docs[0].data());
  }

  // uploads and sets image to given file
  async function setImage(image) {
    if (!image) return;
    // upload image
    const filePath = `covers/${uid}`;
    const fileRef = ref(storage, filePath);
    await uploadBytes(fileRef, image);
    // update image
    const url = await getDownloadURL(fileRef);
    const userRef = doc(usersRef, uid);
    await updateDoc(userRef, { cover: url });
  }

  // get user data on start
  useEffect(() => {
    if (username) getUserData();
  }, [username]);

  // return if invalid data
  if (userData === undefined) return <p>Loading...</p>;
  if (!userData) return <p>{username} not found</p>;

  return (
    <div className={styles.container}>
      <label>
        <div
          className={styles.image}
          style={{
            background: userData.cover ?
            `center center / cover url(${userData.cover})` : '#ddd'
          }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files[0])}
          hidden
        />
      </label>
      <h1>{userData.firstName} {userData.lastName} &apos;{userData.year}</h1>
      <input
        placeholder="College"
        value={college}
        onChange={e => setCollege(e.target.value)}
      />
      <input
        placeholder="Major"
        value={major}
        onChange={e => setMajor(e.target.value)}
      />
      {
        userData.uid === uid &&
        (
          editing ?
          <button onClick={() => setEditing(false)}>
            <SaveIcon />
          </button> :
          <button onClick={() => setEditing(true)}>
            <EditIcon />
          </button>
        )
      }
    </div>
  );
}
