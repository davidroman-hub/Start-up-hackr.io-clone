
import {useState, useEffect} from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import {showSuccessMessage, showErrorMessage} from '../helpers/alerts'
import {API} from '../config'
import Link from 'next/link'
import Router from 'next/router'
import {authenticate, isAuth} from '../helpers/authHelpers'


const Login  = () => {
  
    const [state, setState] = useState({
        email:'jobroman83@gmail.com',
        password: 'sandra7373',
        error:'',
        success:'',
        buttonText: 'Iniciar Sesión',        
    })

useEffect(()=>{
    isAuth() && Router.push('/') /// if is auth the user cant return to login again
},[])


    // destructure

    const {email, password, error, success, buttonText} = state



const handleChange = name => e => {
    setState({...state,[name]: e.target.value,error:'', success:'', buttonText:'Registro' })
}

const handleSubmit = async e => {
    e.preventDefault();
    setState({...state,buttonText:'Registro'});
    try {
       const response = await axios.post(`${API}/login`,{
            email, 
            password
        })
        console.log(response);
            authenticate( response, () => {
      // return Router.push('/')
       isAuth() && isAuth().role === 'admin' ? Router.push('/admin') : Router.push('/user')
         })
    } catch (error) {
        console.log(error)
        setState({...state,buttonText:'Accediendo', error:error.response.data.error})
    }
}
  

  
    const loginForm = () => (
        <form onSubmit={handleSubmit} >
    
            <div className="form-group">
                <input value={email} onChange={handleChange('email')} type="email" className="form-control" placeholder="Escribe tu E-mail"/>
            </div>
            <div className="form-group">
                <input value={password} onChange={handleChange('password')} type="password" className="form-control" placeholder="Tu Contraseña"/>
            </div>
            <div className="form-group">
                <button className="btn btn-outline-warning">{buttonText}</button>
            </div>
        </form>
    )
    
  
  
  
    return (
    
    <Layout>
             <br/>
        <div className="text-center col-md-6 offset-md-3">
            <h2>Inicia Sesión</h2>
            <br/>
            {/* {JSON.stringify(isAuth())} */}
            {success && showSuccessMessage(success)}
            {error && showErrorMessage(error)}
            <br/>
            {loginForm()}
            <hr/>
            {/* {JSON.stringify({state})} */}
            <Link href='/auth/password/forgot'>
                <a className='text-danger float-right'>Olvidaste tu contraseña??</a>
            </Link>

        </div>

    </Layout>
    
    )
}

export default Login