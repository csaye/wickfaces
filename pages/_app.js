import Main from '../components/Main';
import Head from 'next/head';

import '../styles/globals.css';

import { initializeApp, getApps } from 'firebase/app';
import { firebaseConfig } from '../util/firebaseConfig';

// initialize firebase
if (!getApps().length) initializeApp(firebaseConfig);

export default function App(props) {
  return (
    <>
      <Head>
        <title>Wickfaces</title>
        <meta name="description" content="Connect with classmates and stay in touch." />
        <link rel="apple-touch-icon" sizes="180x180" href="favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicons/favicon-16x16.png" />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;900&display=swap" rel="stylesheet" />
      </Head>
      <Main {...props} />
    </>
  );
}
