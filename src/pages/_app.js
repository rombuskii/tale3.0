import Layout from '@/components/Layout'
import { ThemeProvider } from '@/context/ThemeProvider'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
    <Layout>
  <Component {...pageProps} />
  </Layout>
  </ThemeProvider>
  )
}
