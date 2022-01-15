import Navbar from './Navbar.jsx'
const Layout = (props) => {
    
    return (
        <div>
            <Navbar user={props.user} setUser={props.setUser}/>
            {props.children}
        </div>
    )
}

export default Layout
