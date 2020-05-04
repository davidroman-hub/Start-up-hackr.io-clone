  
// React normal method
import {useState, useEffect} from 'react'
///
import Layout from '../../components/Layout'
import axios from 'axios'
import {API} from '../../config'
import {getCookie} from '../../helpers/authHelpers'

/// React Method

// const User = () => {

//     const [todos, setTodos] = useState([])

//     useEffect(() => {
//         axios.get('https://jsonplaceholder.typicode.com/todos').then(response => setTodos(response.data));
//     },[]);

//         return<Layout>{JSON.stringify(todos)}</Layout>
// }



///  NEXT JS METHOD

// const User  = ({todos}) => <Layout>{JSON.stringify(todos)}</Layout>

// // first render in the server and after in client side

// User.getInitialProps = async() => {
//     const response = await axios.get(`https://jsonplaceholder.typicode.com/todos`)
//    console.log('SERVER RENDERED', response);
//     return {
//         todos: response.data
//     }
// }

// before i have this but how i made 'with user '

// const User  = ({user}) => <Layout>{JSON.stringify(user)}</Layout>

// // first render in the server and after in client side

// User.getInitialProps = async context => {
//   const token = getCookie('token', context.req)

//   try {
//     const response = await axios.get(`${API}/user`, {
//         headers: {
//             Authorization:`Bearer ${token}`,
//             contentType: 'application/json'
//         }
//     })
//     return{user: response.data}
//     }catch(error){
//         if(error.response.status == 401){
//             return{user:'No usuario'}
//         }
//   }
// }

//export default User

import withUser from '../withUser'
import withAdmin from '../withAdmin'

const User  = ({user, token}) => <Layout>{JSON.stringify(user,token)}</Layout>



export default withUser(User)