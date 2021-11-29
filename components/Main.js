import Header from './Header';

import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

function Comp(props) {
  const { Component, pageProps, currUser } = props;

  return (
    <>
      <Header currUser={currUser} />
      <Component currUser={currUser} {...pageProps} />
    </>
  );
}

function MainAuthed(props) {
  const db = getFirestore();
  const auth = getAuth();

  // get user doc
  const uid = auth.currentUser.uid;
  const usersRef = collection(db, 'users');
  const userRef = doc(usersRef, uid);
  const [userDoc] = useDocument(userRef);

  // get curr user
  const currUser = !userDoc ? undefined :
  userDoc.exists() ? { ...userDoc.data(), uid: userDoc.id } : null;

  return (
    auth.currentUser.emailVerified ?
    <Comp currUser={currUser} {...props} /> :
    <Comp currUser={false} {...props} />
  );
}

export default function Main(props) {
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
    <Comp currUser={authed} {...props} />
  );
}
