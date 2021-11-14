import Head from 'next/head';

import '../styles/globals.css';

import { initializeApp, getApps } from 'firebase/app';
import { firebaseConfig } from '../util/firebaseConfig';

// initialize firebase
if (!getApps().length) initializeApp(firebaseConfig);

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Wickfaces</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
