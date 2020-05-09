import Layout from '../../../components/Layout'
import withAdmin from '../../withAdmin'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {API} from '../../../config'
import {showErrorMessage,showSuccessMessage} from '../../../helpers/alerts'


const Create = () => {

    const [state, setState] = useState({
        name: '',
        content:'',
        error:'',
        success:'',
        formData:process.browser && new FormData(),
        buttonText:'Crear',
        imageUploadText:'Cargar imagen',
    })

    const {name, content, error, success, formData, buttonText, imageUploadText} = state

    const handleChange = name => e => {
        const value = name == 'image' ? e.target.files[0] : e.target.value
        const imageName = name == 'image' ? event.target.files[0].name : 'Cargar imagen' // for put the photo name
        formData.set(name, value) 
        setState({...state,[name]: value, error:'', success:'', imageUploadText:imageName })
    };

    const handleSubmit = async e => {
        e.preventDefault()
        setState({...state, buttonText:'Creando..'})
        console.log(...formData)
    }

    const createCategoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">
                    Nombre
                </label>
                <input onChange={handleChange('name')}  value={name} type="text" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">
                    Contenido
                </label>
                <textarea onChange={handleChange('content')}  value={content} className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="btn btn-outline-secondary ">
                    {imageUploadText}
                <input onChange={handleChange('image')} accept="image/*" type="file" className="form-control" hidden/>
                </label>
            </div>
            <div>
                <button className="btn btn-outline-warning">
                    {buttonText}
                </button>
            </div>
        </form>
    )




    return(
        <Layout>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Crear categoria</h1>
                    <br/>
                        {createCategoryForm()}
                </div>
            </div>
        </Layout>
    )
}

export default Create