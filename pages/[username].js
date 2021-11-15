import Image from 'next/image';
import Header from '../components/Header';

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

  // get user data on start
  useEffect(() => {
    if (username) getUserData();
  }, [username]);

  // return if invalid data
  if (userData === undefined) return <p>Loading...</p>;
  if (!userData) return <p>{username} not found</p>;

  return (
    <div className={styles.container}>
      <Header />
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
    </div>
  );
}
