import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthProvider } from '../utils/auth';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>마음돌봄이 - 당신의 마음을 위한 공간</title>
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;