import { AuthProvider } from '../contexts/AuthContext';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Exam Generator</title>
        <meta name="description" content="Generate exams with ease" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="beforeInteractive"
      />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
} 