import {api} from "./index";
import {DifficultLevel} from "../store/game-manager";
import {AxiosResponse} from "axios";
import {ILeadersResponse} from "../models/Responses/Game";

export class GameService {
    static url: string = '/game'

    static getLeadersList(): Promise<AxiosResponse<ILeadersResponse>> {
        return api.get(`${this.url}`)
    }

    static createGame(time: number, difficult: DifficultLevel) {
        return api.post(`${this.url}`, {time, difficult})
    }
}