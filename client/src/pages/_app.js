import Layout from '@/components/Layout'
import { ThemeProvider } from '@/context/ThemeProvider'
import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
  <ThemeProvider>
    <Head>
    <title>Tale</title>
    <link rel="icon" href="/favicon.ico"/>
    </Head>
    <Layout>
  <Component {...pageProps} />
  </Layout>
  </ThemeProvider>
  )
}
