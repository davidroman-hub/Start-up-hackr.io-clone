import {useState} from 'react'
import {withRouter} from 'next/router'
import axios from 'axios'
import {showSuccessMessage, showErrorMessage} from '../../../helpers/alerts'
import {API} from '../../../config'
import Layout from '../../../components/Layout'

const ForgotPassword = () => {
    const [state, setState] = useState({
        email: '',
        buttonText:'Contraseña olvidada',
        success:'',
        error:''
    })
    const {email, buttonText, success, error} = state
   
    const handleChange = e => {
        setState({...state, email: e.target.value, success:'', error:''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        // console.log('Post e-mail to ', email)
        try {
            const response = await axios.put(`${API}/forgot-password`,{email})
            //console.log('Forgot password',response)
            setState({
                ...state,email:'',buttonText:'Enviando', success:response.data.message
            })
        }catch(error){
                console.log('Contraseña olvidada error')
                setState({
                    ...state, buttonText:'Contraseña olvidada', error: error.response.data.error
                })
        }
    }

    const passwordForgotForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="email" className="form-control" onChange={handleChange} value={email} placeholder="Escribe tu E-mail" required/>
            </div>
            <div>
                <button className="btn btn-outline-warning">{buttonText}</button>
            </div>
        </form>
    );


return (
    <Layout>
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h1>Recuperacion de la contraseña</h1>
                <br/>
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
                {passwordForgotForm()}
            </div>
        </div>
    </Layout>
)

}

export default ForgotPassword