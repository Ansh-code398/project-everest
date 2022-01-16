import axios from 'axios';
import SoftwareCard from '../components/SoftwareCard';
export default function Home({ softwares }) {
  console.log(softwares);
  return (
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-12 col-span-1'>
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