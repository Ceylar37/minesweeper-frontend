import {makeAutoObservable} from "mobx";
import {gameField} from "./game-field";
import {ICreateField} from "../models/Field";
import {GameService} from "../http/game-service";
import {ILeaders} from "../models/Game";

export type DifficultLevel = 'easy' | 'medium' | 'hard' | 'custom'

class GameManager {
    difficultLevel: DifficultLevel = 'easy'
    gameStartTime: Date | null = null
    gameEndTime: Date | null = null
    isGameStarted: boolean = false
    isGameWin: boolean = false
    isGameLose: boolean = false
    leaders: ILeaders = {
        easyGamesList: [],
        mediumGamesList: [],
        hardGamesList: []
    }

    constructor() {
        makeAutoObservable(this)
    }

    setLeaders(newLeaders: ILeaders) {
        this.leaders = newLeaders
    }

    changeDifficult(newDiff: DifficultLevel) {
        this.isGameStarted = false
       switch (newDiff) {
           case "easy":
               gameField.changeWidth(9)
               gameField.changeHeight(9)
               gameField.changeMines(10)
               this.difficultLevel = newDiff
               gameField.changeField()
               this.refreshGame()
               break
           case "medium":
               gameField.changeWidth(16)
               gameField.changeHeight(16)
               gameField.changeMines(40)
               this.difficultLevel = newDiff
               gameField.changeField()
               this.refreshGame()
               break
           case "hard":
               gameField.changeWidth(30)
               gameField.changeHeight(16)
               gameField.changeMines(99)
               this.difficultLevel = newDiff
               gameField.changeField()
               this.refreshGame()
               break
           default:
               this.difficultLevel = newDiff
               gameField.changeWidth(9)
               gameField.changeHeight(9)
               gameField.changeMines(10)
               gameField.changeField()
       }
    }

    startGame(id: number) {
        this.isGameStarted = true
        this.gameStartTime = new Date()
        this.isGameWin = false
        this.gameEndTime = null
        gameField.refreshField(id)
    }

    loseGame() {
        this.isGameStarted = false
        this.isGameLose = true
        this.gameEndTime = new Date()
    }

    async winGame() {
        this.isGameStarted = false
        this.isGameWin = true
        this.gameEndTime = new Date()
        if (this.gameStartTime && this.difficultLevel !== 'custom') {
            const time = Math.round((this.gameEndTime.getTime() - this.gameStartTime.getTime()) / 1000)
            try {
                await GameService.createGame(time, this.difficultLevel)
                await this.fetchLeaders()
            } catch (e) {
                console.log(e)
            }

        }
    }

    refreshGame(payload?: ICreateField) {
        if (payload) {
            gameField.changeMines(payload.mines)
            gameField.changeHeight(payload.height)
            gameField.changeWidth(payload.width)
        } else {
            gameField.changeMines(gameField.totalMines)
        }
        this.isGameStarted = false
        this.isGameWin = false
        this.isGameLose = false
        this.gameStartTime = null
        this.gameEndTime = null
        gameField.changeField()
    }

    async fetchLeaders() {
        try {
            const {data} = await GameService.getLeadersList()
            this.setLeaders(data)
        } catch (e) {
            console.log(e)
        }

    }

}

export const gameManager = new GameManager()