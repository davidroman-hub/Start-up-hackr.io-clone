import Head from 'next/head'


const Layout = ({children}) => {

const head = () => (
    <link rel="stylesheet" 
         href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" 
         integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" 
         crossorigin="anonymous"/>

    )

    const nav = () => (
        <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <a className='nav-link text-white' href="#">Home</a>
                </li>
                
                <li className="nav-item">
                    <a className='nav-link text-white' href="#">Iniciar Sesión</a>
                </li>
                
                <li className="nav-item">
                    <a  className='nav-link text-white' href="#">Registros</a>
                </li>
        </ul>
    )

return <React.Fragment>
            {/* we use props children for send the component and we can visializated the first one in home page */}
         {head()}{nav()} <div className="container pt-5 pb-5">{children}</div>
</React.Fragment>

}

export default Layout