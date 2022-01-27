import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SoftwareDetail from "../../components/SoftwareDetail";
const Softwares = ({ software }) => {
    const [softwares, setSoftwares] = useState(null);
    const router = useRouter();
    useEffect(() => {
        const fd = () => {
            axios.get(`https://linuix-app-api.vercel.app/api/softwares/${router.query.slug}`).then(res => {
                setSoftwares(res.data);
            });
        }
        fd();
    }, [router.query.slug])
    return (

        <>
            {software && <Head>
                <title>{software.title}</title>
                <meta name="description" content={`${software.desc} \n Author - ${software.author.name}`} />
                <meta property="og:title" content={software.title} />
                <meta property="og:description" content={`${software.desc} \n Author - ${software.author.name}`} />
                <meta property="og:image" content={software.featuredImage.url} />
                <link rel="icon" href={software.featuredImage.url} type="image" />
                <meta property="og:url" content={`https://project-everest.vercel.app/applications/${software.slug}`} />
            </Head>}
            <div className="container mx-auto px-10 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="col-span-1 lg:col-span-12">
                        <SoftwareDetail software={softwares ? softwares : software}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Softwares

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