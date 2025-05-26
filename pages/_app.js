import '../styles/globals.css'
import { CurrencyProvider } from '../context/CurrencyContext'
import { AuthProvider } from '../context/AuthContext'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CurrencyProvider>
    </AuthProvider>
  )
}
