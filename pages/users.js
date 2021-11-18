import Router from 'next/router';
import UserCard from '../components/UserCard';

import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import styles from '../styles/pages/Users.module.css';

export default function Users(props) {
  const { currUser } = props;

  const db = getFirestore();

  const [usersData, setUsersData] = useState(undefined);

  // retrieves users from firebase
  async function getUsers() {
    const usersRef = collection(db, 'users');
    const users = await getDocs(usersRef);
    setUsersData(users.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  }

  // route home if not authed
  useEffect(() => {
    if (currUser === false) Router.replace('/');
    if (currUser) getUsers();
  }, [currUser]);

  // load if no current user
  if (!currUser || !usersData) return <p>Loading...</p>;

  return (
    <div>
      <div className={styles.users}>
        {
          usersData.map(userData =>
            <UserCard {...userData} key={userData.id} />
          )
        }
      </div>
    </div>
  );
}
