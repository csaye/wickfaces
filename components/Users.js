import styles from '../styles/components/Users.module.css';

export default function Users() {
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
