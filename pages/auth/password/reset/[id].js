import {useState, useEffect} from 'react'
import {withRouter} from 'next/router'
import axios from 'axios'
import {showSuccessMessage, showErrorMessage} from '../../../../helpers/alerts'
import {API} from '../../../../config'
import Layout from '../../../../components/Layout'
import jwt from 'jsonwebtoken'
import Router from 'next/router'

const ResetPassword = ({router}) => {

    const [state, setState] = useState({
        name: '',
        token:'',
        newPassword: '',
        buttonText:'Resetea tu contraseña',
        success:'',
        error:''
    })
        const {name, token, newPassword, buttonText, success, error} = state

    useEffect(()=>{
        console.log(router)
                                        // if the page name is [token] it will be router.query.token
        const decoded = jwt.decode(router.query.id)
        if(decoded) setState({...state, name: decoded.name, token:router.query.id})
        
    },[router])

    const handleChange = e => {
        setState({...state, newPassword: e.target.value, success:'', error:''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        // console.log('Post e-mail to ', email)
        setState({...state, buttonText:'Enviando'})
        try {
            const response = await axios.put(`${API}/reset-password`,{resetPasswordLink: token, newPassword })
        
            //console.log('Forgot password',response)
            setState({
                ...state,newPassword:'',buttonText:'Enviando', success:response.data.message
            })
        }catch(error){
                console.log('Contraseña olvidada error')
                setState({
                    ...state, buttonText:'Contraseña no valida', error: error.response.data.error
                })
        }
    }

    const passwordResetForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="password" className="form-control" onChange={handleChange} value={newPassword} placeholder="Escribe tu nueva contraseña" required/>
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
                <h1>Hola {name}! Listo para el reseteo de la contraseña??</h1>
                <h5></h5>
                <br/>
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
                {passwordResetForm()}
            </div>
        </div>
    </Layout>
)



}

export default withRouter(ResetPassword)
