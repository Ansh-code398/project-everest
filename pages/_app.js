import Layout from '../components/Layout'
import '../styles/globals.css'
import { useState } from 'react';
import '../styles/SoftwareCard.css';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  return <Layout user={user} setUser={setUser}>
    <Component {...pageProps} user={user} setUser={setUser} />
  </Layout>
}

export default MyApp
