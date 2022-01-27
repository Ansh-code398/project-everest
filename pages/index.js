import axios from 'axios';
import SoftwareCard from '../components/SoftwareCard';

export default function Home({ softwares }) {
  return (
    <div>
      <div className='card-body'>
        <div className='container'>
          {softwares && softwares.map((software) => <SoftwareCard software={software} key={software.title} />)}
        </div>
      </div>
    </div>
  )
}

// Fetch data at build time
export async function getServerSideProps() {
  const softwares = (await ((await axios.get('https://linuix-app-api.vercel.app/api/softwares')).data)) || [];
  return {
    props: { softwares },
  };
}