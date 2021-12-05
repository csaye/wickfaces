import Loading from '../components/Loading';
import Users from '../components/Users';
import MessagesComponent from '../components/Messages';
import Router from 'next/router';

import { getFirestore, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import styles from '../styles/pages/Messages.module.css';

export default function Messages(props) {
  const { currUser } = props;

  const db = getFirestore();

  const [selectedUser, setSelectedUser] = useState(undefined);

  // get messages ref
  const usersId = getUsersId();
  const messagesRef = collection(db, 'messages', usersId, 'messages');

  // returns current users id
  function getUsersId() {
    if (!selectedUser) return '~';
    const uidA = currUser.uid;
    const uidB = selectedUser;
    return uidA < uidB ? `${uidA}-${uidB}` : `${uidB}-${uidA}`;
  }

  // route home if not authed
  useEffect(() => {
    if (currUser === false) Router.replace('/');
  }, [currUser]);

  // return if loading current user
  if (!currUser) return <Loading />;

  return (
    <div>
      <Users
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      {
        selectedUser &&
        <MessagesComponent messagesRef={messagesRef} />
      }
    </div>
  );
}
