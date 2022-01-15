import axios from "axios";
import SoftwareDetail from "../../components/SoftwareDetail";
const softwares = ({ software }) => {
    return (

        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-12">
                    <SoftwareDetail software={software} />
                </div>
            </div>
        </div>
    )
}

export default softwares

export async function getStaticProps({ params }) {
    const data = await (await axios.get(`https://linuix-app-api.vercel.app/api/softwares/${params.slug}`)).data;
    return {
        props: {
            software: data,
        },
    };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
    const posts = await axios.get("https://linuix-app-api.vercel.app/api/softwares");
    return {
        paths: posts.data.map(({ slug }) => ({ params: { slug } })),
        fallback: true,
    };
}