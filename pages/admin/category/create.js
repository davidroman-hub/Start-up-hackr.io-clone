import Layout from '../../../components/Layout';
import withAdmin from '../../withAdmin';
import {useState,useEffect} from 'react';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';
import {API} from '../../../config';
import {showErrorMessage,showSuccessMessage} from '../../../helpers/alerts';


const Create = ({user,token}) => {

    const [state, setState] = useState({
        name: '',
        content:'',
        error:'',
        success:'',
        //formData:process.browser && new FormData(),
        buttonText:'Crear',
        //imageUploadText:'Cargar imagen',
        image:''
    })

    // const {name,
    //      content,
    //       error, 
    //       success, 
    //       formData, 
    //       buttonText, 
    //       imageUploadText
    //     } = state

    const [imageUploadButtonName, setImageUploadName] = useState('Seleccionar imagen')

    const { name, content, success, error, image, buttonText, imageUploadText } = state;
   
    const handleChange = name => e => {
        
        setState({...state, [name]: e.target.value, error:'', success:''})
    };

    // const handleImage = event => {
    //     const image = event.target.files[0];
    //     console.log(image);
    // }
    const handleImage = event => {
        let fileInput = false;
        if (event.target.files[0]) {
            fileInput = true;
        }

        setImageUploadName(event.target.files[0].name)

        if (fileInput) {
            Resizer.imageFileResizer(
                event.target.files[0],
                300,
                300,
                'JPEG',
                100,
                0,
                uri => {
                    // console.log(uri);
                    setState({ ...state, image: uri, success: '', error: '' });
                },
                'base64'
            );
        }
    };


    const handleSubmit = async e => {
        e.preventDefault()
        setState({...state, buttonText:'Creando..'})
        //console.log(...formData)
        try {
            const response = await axios.post(`${API}/category`, {name,content,image},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log('Crear categoria Response', response)
            setImageUploadName('Seleccionar imagen')
            setState({...state, 
            name:'',
            content:'', 
            formData:'', 
            buttonText:'Creado!', 
            imageUploadText:'Cargar imagen',
            success:`${response.data.name} ha sido creado!`
        })
        } catch(error) {
            console.log('Fallo al crear categoria!', error)
            setState({...state, buttonText:'Crear', error: error.response.data.error})
        }
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
                    {imageUploadButtonName}
                <input onChange={handleImage} accept="image/*" type="file" className="form-control" hidden/>
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
                        {success && showSuccessMessage(success)}
                        {error && showErrorMessage(error)}
                        {createCategoryForm()}
                </div>
            </div>
        </Layout>
    )
}

export default withAdmin(Create)