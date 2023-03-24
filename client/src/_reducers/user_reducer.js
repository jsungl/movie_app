import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from "../_actions/types";

export default function reducer(state = {}, action) {
    switch (action.type) {

        case LOGIN_USER:
            return {
                ...state,
                login: action.payload
            }
        case REGISTER_USER:
            return {
                ...state,
                register: action.payload
            }
        case AUTH_USER:
            return {
                ...state,
                userData: action.payload
            }
        case LOGOUT_USER:
            return {
                ...state,
                logout: action.payload
            }
        default:
            return state;
    }

}