import axios from "axios";


export const getUser = async ({ username }) => {
    try{
        const { data } = await axios.get(`api/v1/auth/user/${username}`)
        return { data }
    }
    catch(error) {
        return { error: "Passwords doesn't match"}
    }
} 


export const registerUser = async (credentials) => {
    try{
        const { data: { message }, success } = axios.post(`api/v1/auth/register`, credentials)

        let { username, email } = credentials
        if(success){
            await axios.post('api/v1/auth/registerMail', { username, userEmail: email, text: message })
        }

        return Promise.resolve(message)
    }
    catch(error){
        return Promise.reject({ error })
    }
}


export const loginUser = async ({ username, password }) => {
    try{
        const { data } = await axios.post(`api/v1/auth/login`, {username, password} )
        return Promise.resolve({ data });
    }catch(error){
        return Promise.reject({ error: "Invalid Credentials"})
    }
}


export const updateUser = async (response) => {
    try{

        const token = await localStorage.getItem('token') 
        const data = axios.put('api/v1/auth/updateUser', response, {
            headers: {
                "Authorization": `Beares ${token}`
            }
        })

        return Promise.resolve({ data })

    }catch(error){
        return Promise.reject({ error: "Couldn't update profile"})
    }
} 


export const generateOTP = async () => {
    try{

    }catch(error){
        return Promise.reject({ error })
    }
}