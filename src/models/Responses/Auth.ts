import {IUser} from "../User";

export interface IAuthResponse {
    accessToken: string,
    user: IUser
}