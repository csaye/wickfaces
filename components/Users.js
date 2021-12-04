import Loading from '../components/Loading';

import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import styles from '../styles/components/Users.module.css';

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

  // get users on start
  useEffect(() => {
    getUsers();
  }, []);

  // return if loading
  if (!usersData) return <Loading />;

  return (
    <div>
      {
        usersData.map(userData =>
          <div key={userData.id}>
            {userData.username}
          </div>
        )
      }
    </div>
  );
}
