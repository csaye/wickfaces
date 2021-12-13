import Link from 'next/link';
import Loading from '../components/Loading';
import DynamicImage from '../components/DynamicImage';

import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import styles from '../styles/components/Users.module.css';

export default function Users(props) {
  const { selectedUser, setSelectedUser } = props;

  const db = getFirestore();

  const [usersData, setUsersData] = useState(undefined);

  // retrieves users from firebase
  async function getUsers() {
    const usersRef = collection(db, 'users');
    const users = await getDocs(usersRef);
    setUsersData(users.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  }

  // get users on start
  useEffect(() => {
    getUsers();
  }, []);

  // return if loading
  if (!usersData) return <Loading />;

  return (
    <div className={styles.container}>
      {
        usersData.map(userData =>
          <div
            className={styles.user}
            key={userData.id}
          >
            <Link href={`/${userData.username}`}>
              <a onClick={e => e.stopPropagation()}>
                <DynamicImage
                  src={userData.profile}
                  width="48px"
                  height="48px"
                  placeholder="/img/blank/profile.png"
                />
              </a>
            </Link>
            <div>
              <p>
                <Link href={`/${userData.username}`}>
                  <a onClick={e => e.stopPropagation()}>
                    {userData.firstName} {userData.lastName}
                  </a>
                </Link>
                <span>@{userData.username}</span>
              </p>
            </div>
            {
              selectedUser?.id !== userData.id &&
              <button onClick={() => setSelectedUser(userData)}>
                Select
              </button>
            }
          </div>
        )
      }
    </div>
  );
}
