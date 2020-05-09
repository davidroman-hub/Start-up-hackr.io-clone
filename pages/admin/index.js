  
import Layout from '../../components/Layout'
import withAdmin from '../withAdmin'
import Link from 'next/link'
const Admin  = ({user, token}) => {
    return (
    
    <Layout>
    <h1>Tablero de Administrador</h1>    
        <br/>
     <div clasname="row">
        <div clasname="col-md-4">
            <ul className=" nav flex-column">
                <li className="nav-item">
                    <Link href='/admin/category/create'>
                        <a className="nav-link">Crear Categoria</a>
                    </Link>
                </li>
            </ul>
        </div>
        <div clasname="col-md-8">
        
        </div>     
    </div>   
    </Layout>
    
    )
}

export default withAdmin(Admin)