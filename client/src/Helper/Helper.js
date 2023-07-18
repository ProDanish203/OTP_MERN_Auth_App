import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

export const getUser = async ({ username }) => {
    try{
        const { data } = await axios.get(`/api/v1/auth/user/${username}`)
        return { data }
    }
    catch(error) {
        return { error: "Passwords doesn't match"}
    }
} 


export const registerUser = async (credentials) => {
    try{
        console.log(credentials)
        const { data: { message }, success } = axios.post(`/api/v1/auth/register`, credentials)

        let { username, email } = credentials
        if(success){
            await axios.post('/api/v1/auth/registerMail', { username, userEmail: email, text: message })
        }

        return Promise.resolve(message)
    }
    catch(error){
        return Promise.reject({ error })
    }
}


export const loginUser = async ({ username, password }) => {
    try{
        const { data } = await axios.post(`/api/v1/auth/login`, {username, password} )
        return Promise.resolve({ data });
    }catch(error){
        return Promise.reject({ error: "Invalid Credentials"})
    }
}


export const updateUser = async (response) => {
    try{

        const token = await localStorage.getItem('token') 
        const data = axios.put('/api/v1/auth/updateUser', response, {
            headers: {
                "Authorization": `Beares ${token}`
            }
        })

        return Promise.resolve({ data })

    }catch(error){
        return Promise.reject({ error: "Couldn't update profile"})
    }
} 


export const generateOTP = async (username) => {
    try{
        const { data: { code }, success} = await axios.get('/api/v1/auth/genOTP')

        if(success){
            let { data: { email }} = await getUser({ username })
            let text = `Your password recovery OTP is: ${code}. Verify the otp and recover your passsword`;
            let subject = "Password Revovery OTP"
            await axios.post('/api/v1/auth/registerMail', {
                username, 
                userEmail: email,
                text,
                subject
            })
        }
        return Promise.resolve(code)
    }catch(error){
        return Promise.reject({ error })
    }
}


export const verifyOTP = async ({ username, code}) => {
    try{
        const {data, success} = await axios.get('/api/v1/auth/verifyOTP', { params: {code}})
        return { data, success} 
    }catch(error){
        return Promise.reject({ error })
    }
}


export const resetPassword = async ({ username, password }) => {
    try{
        const {data, success} = await axios.put('/api/v1/auth/resetPassword', { username, password })
        return Promise.resolve({ data, success})
    }catch(error){
        return Promise.reject({ error })
    }
}