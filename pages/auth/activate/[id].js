import {useState, useEffect} from 'react'
import {withRouter} from 'next/router'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import {showSuccessMessage, showErrorMessage} from '../../../helpers/alerts'
import {API} from '../../../config'

import Layout from '../../../components/Layout'
const ActivateAccount = ({ router }) => {
    const [state,setState] = useState({
        name: '',
        token:'',
        buttonText:'Activar Cuenta',
        success:'',
        error:''
    })
    const {name,token,buttonText,success,error} = state

    useEffect(()=>{
        let token = router.query.id
        if(token){
            const {name} = jwt.decode(token)
            setState({...state, name, token})
        }
    },[router])

// method for activate the account

    const clickSubmit = async e => {
        e.preventDefault()
        console.log('activateAccount')
        //
    };

    return (
    <Layout>
        <div className="row">
            <div className="col-md-6 offset-md-3">
                {/* {JSON.stringify(state)} */}
                <h1>Hola {name}! Estas list@ para activar tu cuenta??</h1>
                <br/>
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
                    <button className="btn btn-outline-warning btn-block" onClick={clickSubmit}>{buttonText}</button>

            </div>
        </div>
    </Layout>
    )
}


export default withRouter(ActivateAccount)