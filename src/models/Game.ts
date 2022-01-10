export interface IGame {
    id: number
    userId: number
    time: number
    userLogin: string
}

export interface ILeaders {
    easyGamesList: IGame[]
    mediumGamesList: IGame[]
    hardGamesList: IGame[]
}