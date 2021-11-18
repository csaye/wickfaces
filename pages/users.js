import Link from 'next/link';
import Router from 'next/router';

import { useEffect, useState } from 'react';

export default function Users(props) {
  const [usersData, setUsersData] = useState(undefined);

  // route home if not authed
  useEffect(() => {
    if (currUser === false) Router.replace('/');
    if (currUser) getUsers();
  }, [currUser]);

  // load if no current user
  if (!currUser || !usersData) return <p>Loading...</p>;

  return (
    <div>
      {
        usersData.map(userData =>
          <div key={userData.id}>
            <Link href={`/${userData.username}`}>
              <a>{userData.username}</a>
            </Link>
          </div>
        )
      }
    </div>
  );
}
