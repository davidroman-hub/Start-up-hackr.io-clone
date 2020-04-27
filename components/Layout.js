import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import {isAuth, Logout} from '../helpers/authHelpers'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';


Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Layout = ({children}) => {

const head = () => (
   <React.Fragment>
      <link
         rel="stylesheet"
         href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
         integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
         crossOrigin="anonymous"
      />

      <link rel="stylesheet" href="/static/css/styles.css"/>
         {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" /> */}
   </React.Fragment>
         )

    const nav = () => (
        <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                   <Link href="/">
                      <a className='nav-link text-white'>Home</a>
                   </Link>
                </li>
                

                  {!isAuth() && (
                        
               <React.Fragment>         
                  <li className="nav-item">
                     <Link href='/login'>
                      <a className='nav-link text-white'>Iniciar Sesión</a>
                     </Link>
                  </li>
                  
                  <li className="nav-item">
                     <Link href='/register'>
                           <a className='nav-link text-white'>Registros</a>
                     </Link>
                     
                  </li>
               </React.Fragment>
                  )}

                  {
                     isAuth() && isAuth().role == 'admin' && (
                     <React.Fragment>
                        <li className="nav-item ">
                        <Link href='/admin'>
                             <a className='nav-link text-white'>Admin</a>
                        </Link>
                        
                     </li>
                    

                     </React.Fragment>
                     )
                  }

                  {
                     isAuth() && isAuth().role == 'subscriber' && (
                        <React.Fragment>
                        <li className="nav-item">
                        <Link href='/user'>
                              <a className='nav-link text-white'>{isAuth().name}</a>
                        </Link>
                        
                     </li>
                    
                     </React.Fragment>
                     )
                  }

                  {isAuth() && (
                  <li className="nav-item">
                      <a onClick={Logout} className='nav-link text-white'>Cerrar Sesión</a>
                                
                   </li>
                  )}

               
                
        </ul>
    )

return <React.Fragment>
            {/* we use props children for send the component and we can visializated the first one in home page */}
         {head()}{nav()} <div className="container pt-5 pb-5">{children}</div>
</React.Fragment>

}

export default Layout