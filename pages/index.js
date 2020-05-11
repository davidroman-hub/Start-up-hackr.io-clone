  
import Layout from '../components/Layout'
import axios from 'axios'
import {API} from '../config'

const Home  = ({categories}) => {
    return (
    
    <Layout>{JSON.stringify(categories)}</Layout>
    
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