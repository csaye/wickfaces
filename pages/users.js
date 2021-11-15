import Link from 'next/link';

import { useEffect, useState } from 'react';

export default function Users(props) {
  const [usersData, setUsersData] = useState(undefined);

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
