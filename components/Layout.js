

const Layout = ({children}) => {

    const nav = () => (
        <ul className="nav">
                <li className="nav-item">
                    <a className='nav-link' href="#">Home</a>
                </li>
                
                <li className="nav-item">
                    <a className='nav-link' href="#">Login</a>
                </li>
                
                <li className="nav-item">
                    <a  className='nav-link' href="#">Register</a>
                </li>
        </ul>
    )

return <React.Fragment>
            {/* we use props children for send the component and we can visializated the first one in home page */}
    {nav()}{children}
</React.Fragment>

}

export default Layout