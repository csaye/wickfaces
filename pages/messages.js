import Router from 'next/router';

import { useEffect } from 'react';

import styles from '../styles/pages/Messages.module.css';

export default function Messages(props) {
  const { currUser } = props;

  // route home if not authed
  useEffect(() => {
    if (currUser === false) Router.replace('/');
  }, [currUser]);

  // load if no current user
  if (!currUser) return <p>Loading...</p>;

  return (
    <div>
    </div>
  );
}
