import {IUser} from "../models/User";
import {AuthService} from "../http/auth-service";
import {ILoginFormData} from "../models/Forms";
import {makeAutoObservable} from "mobx";
import {gameManager} from "./game-manager";
import {message} from "antd";

class Auth {

    constructor() {
        makeAutoObservable(this)
    }

    user: IUser | null = null
    isAuthorized: boolean = false
    isLoading: boolean = false
    isAuthLoading: boolean = false
    authError: string = ''

    setAuthError(newError: string) {
        this.authError = newError
    }

    setUser(user: IUser | null) {
        this.user = user
    }

    setIsAuthorized(isAuthorized: boolean) {
        this.isAuthorized = isAuthorized
    }

    setIsLoading(isLoading: boolean) {
        this.isLoading = isLoading
    }

    setIsAuthLoading(isAuthLoading: boolean) {
        this.isAuthLoading = isAuthLoading
    }

    authorize(accessToken: string, user: IUser) {
        this.setUser(user)
        this.setIsAuthorized(true)
        localStorage.setItem('accessToken', accessToken)
    }

    async login({password, login}: ILoginFormData) {
        this.setIsAuthLoading(true)
        try {
            const res = await AuthService.login(login, password)
            const {data: {user, accessToken}} = res
            this.authorize(accessToken, user)
        } catch (e: any) {
            message.error({content: e.response.data.message, duration: 5})
        } finally {
            this.setIsAuthLoading(false)
        }
    }

    async logout() {
        this.setIsLoading(true)
        try {
            await AuthService.logout()
            localStorage.removeItem('accessToken')
            this.setIsAuthorized(false)
            this.setUser(null)
            gameManager.refreshGame()
        } catch (e) {
            console.log(e)
        } finally {
            this.setIsLoading(false)
        }
    }

    async registration({password, login}: ILoginFormData) {
        this.setIsAuthLoading(true)
        try {
            const {data: {accessToken, user}} = await AuthService.registration(login, password)
            this.authorize(accessToken, user)
        } catch (e: any) {
            message.error({content: e.response.data.message, duration: 5})
        } finally {
            this.setIsAuthLoading(false)
        }
    }

    async checkAuth() {
        this.setIsLoading(true)
        try {
            const {data: {accessToken, user}} = await AuthService.refresh()
            this.authorize(accessToken, user)
        } catch (e) {
            console.log(e)
        } finally {
            this.setIsLoading(false)
        }
    }


}

export const auth = new Auth()