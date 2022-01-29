
import Navbar from "./Navbar.jsx"

import { useRouter } from 'next/router'
import { useProgressStore } from '../useProgressStore'
import { useEffect } from 'react'
import Head from "next/head"

const Layout = (props) => {
    const setIsAnimating = useProgressStore((state) => state.setIsAnimating);
    const isAnimating = useProgressStore((state) => state.isAnimating);
    const router = useRouter();
    useEffect(() => {
        const handleStart = () => {
            setIsAnimating(true);
        };
        const handleStop = () => {
            setIsAnimating(false);
        };

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleStop);
        router.events.on('routeChangeError', handleStop);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleStop);
            router.events.off('routeChangeError', handleStop);
        };
    }, [router]);

    return (
        <div>
            <Head>
                <title>Project Everest</title>
                <meta name="description" content="Project Everest" />
                <meta name="keywords" content="Project Everest" />
                <meta name="author" content="Project Everest" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" type='image/png' href="https://media.discordapp.net/attachments/890475885470285864/920662213293924412/calinix.jpg" />
            </Head>
            <div className="sticky top-0 z-50">
                <Navbar user={props.user} setUser={props.setUser} isAnimating={isAnimating}/>
            </div>
            {props.children}
        </div>
    )
}

export default Layout
