import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from './types';

export function loginUser(dataToSubmit) {

    const request = axios.post('/api/users/login', dataToSubmit).then(res => res.data)

    // reducer로 리턴
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function preRegisterUser(dataToSubmit) {

    const request = axios.post('/api/users/preRegister', dataToSubmit).then(res => res.data)

    // reducer로 리턴
    return {
        type: REGISTER_USER,
        payload: request
    }
}


export function registerUser(dataToSubmit) {

    const request = axios.post('/api/users/register', dataToSubmit).then(res => res.data)

    // reducer로 리턴
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth() {

    const request = axios.get('/api/users/auth').then(res => res.data)

    // reducer로 리턴
    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get('/api/users/logout').then(res => res.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}