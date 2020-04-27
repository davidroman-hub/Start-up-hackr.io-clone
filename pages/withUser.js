import axios from 'axios'
import {API} from '../config'
import {getCookie} from '../helpers/authHelpers'

// with this method we can usee all the time the user information without export all the time, 
//and we can use whenever we want in every page, because we broght the information from the index.js as props


const withUser = Page => { 
    const WithAuthUser = props => <Page {...props}/>
    //with this we can use the initial props
    WithAuthUser.getInitialProps = async context => {
        const token = getCookie('token', context.req)
        let user = null
            //veryfy if is the token here
        if(token){
            try{
                const response = await axios.get(
                    `${API}/user`,{
                        headers: {
                            authorization:`Bearer ${token}`,
                            contentType: 'application/json'
                        }
                    }
                )
                user = response.data
            } catch(err) {
                if(error.response.status == 401){
                    user : null
                }
            }
        }
        if(user == null){
            // redirect 
            context.res.writeHead(302 ,{
                Location: '/'
            })
        } else { 
            return {
                ...(Page.getInitialProps ? await Page.getInitialProps(context) : {}),
                user,
                token
                
            };
        }

    };

    return WithAuthUser
};

export default withUser