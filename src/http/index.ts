import axios from "axios";
import {IAuthResponse} from "../models/Responses/Auth";

export const API_URL = 'https://minesweeper-backend-postgres.herokuapp.com/'

export const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    }
    return config
})

api.interceptors.response.use(
    (config) => config,
    async (error) => {
        debugger
        const originalRequest = error.config
        if (error.response.status === 401 && !error.config._isRetry) {
            originalRequest._isRetry = true
            try {
                const {data: {accessToken}} = await apiWithoutToken.get<IAuthResponse>('auth/refresh')
                localStorage.setItem('accessToken', accessToken)
                return api.request(originalRequest)
            } catch (e) {
                console.log(e)
            }
        }
        throw error
    }
)

export const apiWithoutToken = axios.create({
    withCredentials: true,
    baseURL: API_URL
})