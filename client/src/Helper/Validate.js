import { toast } from "react-hot-toast";

const usernameVerify = (error = {}, values) => {
    if(!values.username){
        error.username = toast.error('Username Required!!!')
    }
    else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username!!!')
    }

    return error;
}

export const usernameValidate = async (values) => {
    const errors = usernameVerify({}, values);
    return errors;
}


const passwordVerify = (error = {}, values) => {
    if(!values.password){
        error.username = toast.error('Password Required!!!')
    }
    else if(values.password.includes(" ")){
        error.username = toast.error('Wrong Password!!!')
    }
    else if(values.password.length < 6){
        error.username = toast.error('Password must be greater than 6 characters!!!')
    }
    return error;
}

export const passwordValidate = async (values) => {
    const errors = passwordVerify({}, values);
    return errors;
}

export const resetPasswordValidate = async (values) => {
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirmPassword){
        errors.exist = toast.error('Password do not match!!!')
    }

    return errors;
}

const emailVerify = (error = {}, values) => {
    if(!values.email){
        error.email = toast.error("Email is Required!!!")
    }
    else if(values.email.includes(" ")){
        error.email = toast.error("Invalid Email Address!!!")
    }
    else if(!/^[A-Z0-9._%+-@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid Email Address!!!")
    }

    return error;
}

export const validateRegister = async (values) => {
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values)

    return errors;
}

export const validateProfile = async (values) => {
    const errors = emailVerify({}, values);
    return errors
}