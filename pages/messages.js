import Loading from '../components/Loading';
import Users from '../components/Users';
import Router from 'next/router';

import { useEffect, useState } from 'react';

import styles from '../styles/pages/Messages.module.css';

export default function Messages(props) {
  const { currUser } = props;

  const [selectedUser, setSelectedUser] = useState(undefined);

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
    </div>
  );
}
