import Layout from '../components/Layout'
import '../styles/globals.css'
import { useState } from 'react';
import '../styles/SoftwareCard.css';
import '../styles/SoftwareDetails.css';


function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  return <Layout user={user} setUser={setUser}>
    <div className='p-12 bg-[#131313]'/>
    <Component {...pageProps} user={user} setUser={setUser} />
  </Layout>
}

export default MyApp
