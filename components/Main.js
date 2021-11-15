import Header from './Header';

import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

function MainAuthed(props) {
  const { Component, pageProps } = props;

  const db = getFirestore();
  const auth = getAuth();

  // get user doc
  const uid = auth.currentUser.uid;
  const usersRef = collection(db, 'users');
  const userRef = doc(usersRef, uid);
  const [userDoc] = useDocument(userRef);

  // get curr user
  const currUser = !userDoc ? undefined :
  userDoc.exists() ? userDoc.data() : null;

  return (
    <>
      <Header currUser={currUser} />
      <Component currUser={currUser} {...pageProps} />
    </>
  );
}

export default function Main(props) {
  const { Component, pageProps } = props;

  const auth = getAuth();

  const [authed, setAuthed] = useState(undefined);

  // listen for user auth
  useEffect(() => {
    const authListener = auth.onAuthStateChanged(() => {
      setAuthed(!!auth.currentUser);
    });
    return () => authListener();
  }, []);

  return (
    authed ?
    <MainAuthed {...props} /> :
    <>
      <Header currUser={authed} />
      <Component currUser={authed} {...pageProps} />
    </>
  );
}
