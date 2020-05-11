  
import Layout from '../components/Layout'
import axios from 'axios'
import {API} from '../config'
import Link from 'next/link'

const Home  = ({categories}) => {
    
    
    const listCAtegories = () => (
        categories.map((c,i) => (
            <Link href={'/'}>
                <a style={{border: '1px solid grey'}} className='bg-light p-3 col-md-4'>
                    <div >
                        <div className='row'>
                            <div className='col-md-4'>
                                <img src={c.image.url}
                                 alt={c.name} 
                                 style={{width:'80px', height:'auto'}}
                                 className='pr-3'
                                 />
                            </div>
                            <div className='col-md-8'>
                                <h4>{c.name}</h4>
                            </div>    
                        </div>
                    </div>
                </a>
            </Link>            
        ))
    )

    
    
    return (
   <Layout> 
     {/* <Layout>{JSON.stringify(categories)}</Layout> */}
    <div className="row">
        <div className="col-md-12">
            <h1 className="font-weight-bold">Busca Tutoriales/Cursos</h1>  
        </div>
    </div>

    <div className="row">{listCAtegories()}</div>

</Layout>
    
    )
}

//for render without use effect

Home.getInitialProps = async () => {
    const response = await axios.get(`${API}/categories`)
    return {
        categories: response.data
    }
}

export default Home