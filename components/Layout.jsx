import Navbar from './Navbar.jsx'
import Head from 'next/head'
const Layout = (props) => {

    return (
        <div>
            <Head>
                <title>Project Everest</title>
                <meta name="description" content="Project Everest" />
                <meta name="keywords" content="Project Everest" />
                <meta name="author" content="Project Everest" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" type='image/png' href="https://media.discordapp.net/attachments/890475885470285864/920662213293924412/calinix.jpg" />
                <meta property='og:image' content='https://media.discordapp.net/attachments/890475885470285864/920662213293924412/calinix.jpg'/>
            </Head>
            <Navbar user={props.user} setUser={props.setUser} />
            {props.children}
        </div>
    )
}

export default Layout
