import axios from "axios";
import {IAuthResponse} from "../interfaces/unsplash.interface";
import {baseURL} from "../constants/global.constants";

const instance = axios.create({
    baseURL,
})

class AuthUnsplashApi {

    async auth(code: string): Promise<IAuthResponse> {
        return instance
            .post('/oauth/token', {
                client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
                client_secret: process.env.REACT_APP_UNSPLASH_SECRET_KEY,
                redirect_uri: process.env.REACT_APP_UNSPLASH_REDIRECT_URL,
                code,
                grant_type: 'authorization_code'
            })
            .then(response => response.data)
    }
}

export const authUnsplashAPI = new AuthUnsplashApi();