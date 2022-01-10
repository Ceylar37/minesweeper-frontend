import {api, apiWithoutToken} from "./index";
import {AxiosResponse} from 'axios'
import {IAuthResponse} from "../models/Responses/Auth";

export class AuthService {

    static url: string = '/auth'

    static async login(login: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return apiWithoutToken.post<IAuthResponse>(`${this.url}/login`, {login, password})
    }

    static async registration(login: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return apiWithoutToken.post<IAuthResponse>(`${this.url}/registration`, {login, password})
    }

    static async logout(): Promise<AxiosResponse<IAuthResponse>> {
        return api.post<IAuthResponse>(`${this.url}/logout`)
    }

    static async refresh(): Promise<AxiosResponse<IAuthResponse>> {
        return apiWithoutToken.get<IAuthResponse>(`${this.url}/refresh`)
    }
}