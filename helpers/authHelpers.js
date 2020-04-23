import cookie from 'js-cookie'

// set in cookie 'token'
export const setCookie = (key, value) => {
    /// next js method
    if(process.browser){
        // if windoww
        cookie.set(key, value,{
            expires: 1
        })
    }
}

// remove from cookie
export const removeCookie = (key) => {
    if(process.browser){
        cookie.remove(key, {
            expires: 1
        })
    }
}


//get from cookie such as stored token
// will be useful weh  we need to make request to server with the token 
export const getCookie = (key) => {
    if(process.browser){
       return cookie.get(key)
    }
}

// set in the local storage
export const setLocalStorage = (key, value) => {
    if(process.browser ){
        localStorage.setItem(key, JSON.stringify(value)) //<-- whe we want to save something in the local storage have to be json data
    }
}

//remove from the local storage

export const removeLocalStorage = (key) => {
    if(process.browser ){
        localStorage.removeItem(key) //<-- whe we want to remove something in the local storage have to be json data
    }
}

// authenticate user by passing data to cookie and localstorage during signin
//this method its very importan, we have to bring the response when the user has a succes auth for made some stuffs
export const authenticate = (response,next) => {
    console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();}

// export const authenticate = (data, next) => {
//     if(typeof window !== 'undefined') {
//         localStorage.setItem('jwt', JSON.stringify(data))  //<-- setItem its for save
//         next()
//     }
// };

// access user in from localstorage

export const isAuth = () =>{
    if(process.browser ){
        const cookieChecked = getCookie('token')
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false
            }
        }
    }