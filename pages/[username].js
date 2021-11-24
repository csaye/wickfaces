import Cover from '../components/Cover';
import Posts from '../components/Posts';
import Modal from '../components/Modal';
import Router from 'next/router';
import Image from 'next/image';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import UploadIcon from '@mui/icons-material/Upload';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddIcon from '@mui/icons-material/Add';

import { getAuth } from 'firebase/auth';
import {
  getFirestore, collection, query, where, getDocs, doc, updateDoc, addDoc
} from 'firebase/firestore';
import {
  getStorage, ref, uploadBytes, getDownloadURL
} from 'firebase/storage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import styles from '../styles/pages/User.module.css';

export default function User(props) {
  const { currUser } = props;

  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  const usersRef = collection(db, 'users');
  const uid = auth.currentUser?.uid;

  const [userData, setUserData] = useState(undefined);
  const [editing, setEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [text, setText] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
    if (!docs.docs.length) {
      setUserData(null);
      return;
    }
    const userDoc = docs.docs[0];
    setUserData({ ...userDoc.data(), id: userDoc.id });
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
    getUserData();
  }

  // updates user in firebase
  async function updateUser() {
    const userRef = doc(usersRef, uid);
    await updateDoc(userRef, { firstName, lastName, college, major });
  }

  // resets user data input
  function resetData() {
    setFirstName(userData.firstName);
    setLastName(userData.lastName);
    setCollege(userData.college);
    setMajor(userData.major);
  }

  // creates post in firebase
  async function createPost() {
    setModalOpen(false);
    setText('');
    const postsRef = collection(usersRef, uid, 'posts');
    await addDoc(postsRef, {
      text: text,
      date: new Date().getTime()
    });
  }

  // route or get user data on start
  useEffect(() => {
    if (currUser === false) Router.replace('/');
    if (currUser && username) getUserData();
  }, [currUser, username]);

  // return if invalid data
  if (!currUser || userData === undefined) return <p>Loading...</p>;
  if (!userData) return <p>{username} not found</p>;

  return (
    <div className={styles.container}>
      <div className={styles.overview}>
        <Cover image={userData.cover} />
        <label>
          <UploadIcon />
          <input
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files[0])}
            hidden
          />
        </label>
        {
          editing ?
          <form onSubmit={e => {
            e.preventDefault();
            updateUser();
          }}>
            <input
              placeholder="First name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
            />
            <input
              placeholder="Last name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
            />
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
            <button>
              <SaveIcon />
            </button>
          </form> :
          <div>
            <h1>{userData.firstName} {userData.lastName} &apos;{userData.year}</h1>
            {college && <p><SchoolIcon /> {college}</p>}
            {major && <p><MenuBookIcon /> {major}</p>}
            {
              userData.id === uid &&
              <button onClick={() => {
                resetData();
                setEditing(true);
              }}>
                <EditIcon />
              </button>
            }
          </div>
        }
        {
          userData.id === uid &&
          <button onClick={() => setModalOpen(true)}>
            <AddIcon />
          </button>
        }
      </div>
      <Posts poster={userData.id} />
      <Modal open={modalOpen} setOpen={setModalOpen}>
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
    </div>
  );
}
