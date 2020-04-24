  
// React normal method
import {useState, useEffect} from 'react'
///
import Layout from '../../components/Layout'
import axios from 'axios'


/// React Method

// const User = () => {

//     const [todos, setTodos] = useState([])

//     useEffect(() => {
//         axios.get('https://jsonplaceholder.typicode.com/todos').then(response => setTodos(response.data));
//     },[]);

//         return<Layout>{JSON.stringify(todos)}</Layout>
// }



///  NEXT JS METHOD

const User  = ({todos}) => <Layout>{JSON.stringify(todos)}</Layout>

// first render in the server and after in client side
User.getInitialProps = async() => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos`)
   console.log('SERVER RENDERED', response);
    return {
        todos: response.data
    }
}


export default User