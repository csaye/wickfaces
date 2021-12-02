import Loading from '../components/Loading';
import Cover from '../components/Cover';
import Posts from '../components/Posts';
import NewPostModal from '../components/NewPostModal';
import Page404 from '../pages/404';
import Router from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import UploadIcon from '@mui/icons-material/Upload';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocationCityIcon from '@mui/icons-material/LocationCity';

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

export default function User(props) {
  const { currUser } = props;

  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  const usersRef = collection(db, 'users');
  const uid = auth.currentUser?.uid;

  const [userData, setUserData] = useState(undefined);
  const [coverSrc, setCoverSrc] = useState(undefined);
  const [editing, setEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [college, setCollege] = useState('');
  const [major, setMajor] = useState('');

  const router = useRouter();
  const { username } = router.query;

  const postsRef = userData ?
    collection(usersRef, userData.uid, 'posts') : undefined;

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
    setUserData({ ...userDoc.data(), uid: userDoc.id });
    setCoverSrc(userDoc.data().cover ?? null);
  }

  // uploads and sets image to given file
  async function setImage(image) {
    if (!image) return;
    setCoverSrc(undefined);
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
    setEditing(false);
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

  // route or get user data on start
  useEffect(() => {
    if (currUser === false) Router.replace('/');
    if (currUser && username) getUserData();
  }, [currUser, username]);

  // return if invalid data
  if (!currUser || userData === undefined) return <Loading />;
  if (!userData) return <Page404 />;

  return (
    <div className={styles.container}>
      <div className={styles.overview}>
        <div className={styles.cover}>
          <Cover src={coverSrc} />
          {
            userData.uid === uid &&
            <label>
              <UploadIcon />
              <input
                type="file"
                accept="image/*"
                onChange={e => setImage(e.target.files[0])}
                hidden
              />
            </label>
          }
        </div>
        {
          editing ?
          <div className={styles.editing}>
            <form onSubmit={e => {
              e.preventDefault();
              updateUser();
            }}>
              <div className={styles.name}>
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
              </div>
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
            </form>
          </div> :
          <div className={styles.info}>
            <h1>{userData.firstName} {userData.lastName}</h1>
            <p><SchoolIcon /><span>Class of &apos;{userData.year}</span></p>
            {
              userData.college &&
              <p><LocationCityIcon /><span>{userData.college}</span></p>
            }
            {
              userData.major &&
              <p><MenuBookIcon /><span>{userData.major}</span></p>
            }
            {
              userData.uid === uid &&
              <button
                className={styles.editbtn}
                onClick={() => {
                  resetData();
                  setEditing(true);
                }}
              >
                <EditIcon />
              </button>
            }
          </div>
        }
        {
          userData.uid === uid &&
          <button
            className="bluebutton"
            onClick={() => setModalOpen(true)}
          >
            New Post
          </button>
        }
      </div>
      <Posts postsRef={postsRef} currUser={currUser} />
      <NewPostModal
        currUser={currUser}
        postsRef={postsRef}
        open={modalOpen}
        setOpen={setModalOpen}
      />
    </div>
  );
}
