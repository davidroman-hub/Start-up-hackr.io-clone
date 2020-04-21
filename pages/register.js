
import {useState} from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import {showSuccessMessage, showErrorMessage} from '../helpers/alerts'
import {API} from '../config'

const Register  = () => {

    const [state, setState] = useState({
        name: '',
        email:'',
        password: '',
        error:'',
        success:'',
        buttonText: 'Registrar',        
    })


    // destructure

    const {name, email, password, error, success, buttonText} = state



const handleChange = name => e => {
    setState({...state,[name]: e.target.value,error:'', success:'', buttonText:'Registro' })
}

const handleSubmit = async e => {
    e.preventDefault();
    setState({...state,buttonText:'Registro'});
    try {
       const response = await axios.post(`${API}/register`,{
            name, 
            email, 
            password
        })
        console.log(response)
        setState({
            ...state,
            name:'',
            email:'',
            password:'',
            button:'Enviando',
            success:response.data.message
        })

    } catch (error) {
        console.log(error)
        setState({...state,buttonText:'Registro', error:error.response.data.error})
    }
}


// const handleSubmit = e => {
//     e.preventDefault();
//    //console.table({name, email, password})
//    setState({...state,buttonText:'Registrando'})
//     axios.post(`http://localhost:8000/api/register`,{
//         name, email, password
//     })
//     .then(response => {
//         console.log(response)
//         setState({
//             ...state,
//             name:'',
//             email:'',
//             password:'',
//             button:'Enviando',
//             success:response.data.message
//         })
//     })
//     .catch(error => {
//         console.log(error)
//         setState({...state,buttonText:'Registro', error:error.response.data.error})
//     })
// };


    
    const registerForm = () => (
        <form onSubmit={handleSubmit} >
            <div className="form-group">
                <input value={name} onChange={handleChange('name')} type="text" className="form-control" placeholder="Escribe tu nombre"/>
            </div>
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
        {/* Bootstrap alerts */}
        {/* {success && success}  */}
       
        <br/>
        <div className="text-center col-md-6 offset-md-3">
            <h2>Registro</h2>
            <br/>
            {success && showSuccessMessage(success)}
            {error && showErrorMessage(error)}
            <br/>
            {registerForm()}
            <hr/>
            {/* {JSON.stringify({state})} */}

        </div>
    </Layout>
    
    )
}

export default Register