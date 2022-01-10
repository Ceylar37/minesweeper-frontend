import {makeAutoObservable} from "mobx";
import {gameManager} from "./game-manager";
import {ICell} from "../models/Field";

class GameFieldManager {

    openedCellsCounter: number = 0
    width: number = 9
    height: number = 9
    totalMines: number = 10
    minesCounter: number = 10
    field: ICell[] = []

    constructor() {
        makeAutoObservable(this, {}, {deep: true})
    }

    changeWidth(newWidth: number) {
        this.width = newWidth
    }

    changeHeight(newHeight: number) {
        this.height = newHeight
    }

    changeMines(newMines: number) {
        this.totalMines = newMines
        this.minesCounter = newMines
    }

    changeField() {
        const newField: ICell[] = []
        for (let i = 0; i < this.width * this.height; i++) {
            newField.push({id: i, isMine: false, value: null, isOpen: false, isMarked: false})
        }
        this.field = newField
    }

    refreshField(id: number) {
        this.openedCellsCounter = 0
        while (this.minesCounter > 0) {
            const rand = Math.round(Math.random() * (this.width * this.height - 1))
            if (this.field[rand].id !== id && !this.field[rand].isMine) {
                this.field[rand].isMine = true
                this.minesCounter--
            }
        }
        this.field = this.field.map((cell) => {
            if (cell.isMine)
                return cell
            let counter = 0
            if (cell.id === 0) {
                if (this.field[1].isMine)
                    counter++
                if (this.field[this.width].isMine)
                    counter++
                if (this.field[this.width + 1].isMine)
                    counter++
                return {...cell, value: counter}
            }
            if (cell.id === this.width - 1) {
                if (this.field[this.width - 1 - 1].isMine)
                    counter++
                if (this.field[this.width - 1 + this.width - 1].isMine)
                    counter++
                if (this.field[this.width - 1 + this.width].isMine)
                    counter++
                return {...cell, value: counter}
            }
            if (cell.id === this.width * this.height - this.width) {
                if (this.field[cell.id - this.width].isMine)
                    counter++
                if (this.field[cell.id - this.width + 1].isMine)
                    counter++
                if (this.field[cell.id + 1].isMine)
                    counter++
                return {...cell, value: counter}
            }
            if (cell.id === this.width * this.height - 1) {
                if (this.field[cell.id - this.width].isMine)
                    counter++
                if (this.field[cell.id - this.width - 1].isMine)
                    counter++
                if (this.field[cell.id - 1].isMine)
                    counter++
                return {...cell, value: counter}
            }
            if (cell.id > 0 && cell.id < this.width - 1) {
                if (this.field[cell.id - 1].isMine)
                    counter++
                if (this.field[cell.id + 1].isMine)
                    counter++
                if (this.field[cell.id + this.width + 1].isMine)
                    counter++
                if (this.field[cell.id + this.width - 1].isMine)
                    counter++
                if (this.field[cell.id + this.width].isMine)
                    counter++
                return {...cell, value: counter}
            }
            if (cell.id < this.width * this.height - 1 && cell.id > this.width * this.height - this.width) {
                if (this.field[cell.id - 1].isMine)
                    counter++
                if (this.field[cell.id + 1].isMine)
                    counter++
                if (this.field[cell.id - this.width - 1].isMine)
                    counter++
                if (this.field[cell.id - this.width + 1].isMine)
                    counter++
                if (this.field[cell.id - this.width].isMine)
                    counter++
                return {...cell, value: counter}
            }
            if (cell.id > 0 && cell.id < this.width * this.height - this.width && !(cell.id % this.width)) {
                if (this.field[cell.id - this.width].isMine)
                    counter++
                if (this.field[cell.id - this.width + 1].isMine)
                    counter++
                if (this.field[cell.id + this.width].isMine)
                    counter++
                if (this.field[cell.id + this.width + 1].isMine)
                    counter++
                if (this.field[cell.id + 1].isMine)
                    counter++
                return {...cell, value: counter}
            }
            if (cell.id > this.width - 1 && cell.id < this.width * this.height - 1 && !((cell.id + 1) % this.width)) {
                if (this.field[cell.id - this.width].isMine)
                    counter++
                if (this.field[cell.id - this.width - 1].isMine)
                    counter++
                if (this.field[cell.id + this.width].isMine)
                    counter++
                if (this.field[cell.id + this.width - 1].isMine)
                    counter++
                if (this.field[cell.id - 1].isMine)
                    counter++
                return {...cell, value: counter}
            }
            if (this.field[cell.id - this.width].isMine)
                counter++
            if (this.field[cell.id - this.width - 1].isMine)
                counter++
            if (this.field[cell.id - this.width + 1].isMine)
                counter++
            if (this.field[cell.id - 1].isMine)
                counter++
            if (this.field[cell.id + 1].isMine)
                counter++
            if (this.field[cell.id + this.width].isMine)
                counter++
            if (this.field[cell.id + this.width - 1].isMine)
                counter++
            if (this.field[cell.id + this.width + 1].isMine)
                counter++
            return {...cell, value: counter}
        })
        this.openCell(id)
    }

    openCell(id: number) {
        if (this.field[id].isOpen)
            return;
        if (this.field[id].isMine) {
            gameManager.loseGame()
        } else {
            this.field[id].isOpen = true
            this.openedCellsCounter++
            if (this.openedCellsCounter === this.width * this.height - this.totalMines)
                return gameManager.winGame()
            if (this.field[id].value === 0) {
                if (id === 0) {
                    this.openCell(1)
                    this.openCell(this.width)
                    this.openCell(this.width + 1)
                    return;
                }
                if (id === this.width - 1) {
                    this.openCell(this.width - 1 - 1)
                    this.openCell(this.width - 1 + this.width - 1)
                    this.openCell(this.width - 1 + this.width)
                    return;
                }
                if (id === this.width * this.height - this.width) {
                    this.openCell(id - this.width)
                    this.openCell(id - this.width + 1)
                    this.openCell(id + 1)
                    return;
                }
                if (id === this.width * this.height - 1) {
                    this.openCell(id - this.width)
                    this.openCell(id - this.width - 1)
                    this.openCell(id - 1)
                    return;
                }
                if (id > 0 && id < this.width - 1) {
                    this.openCell(id - 1)
                    this.openCell(id + 1)
                    this.openCell(id + this.width + 1)
                    this.openCell(id + this.width - 1)
                    this.openCell(id + this.width)
                    return;
                }
                if (id < this.width * this.height - 1 && id > this.width * this.height - this.width) {
                    this.openCell(id - 1)
                    this.openCell(id + 1)
                    this.openCell(id - this.width - 1)
                    this.openCell(id - this.width + 1)
                    this.openCell(id - this.width)
                    return;
                }
                if (id > 0 && id < this.width * this.height - this.width && !(id % this.width)) {
                    this.openCell(id - this.width)
                    this.openCell(id - this.width + 1)
                    this.openCell(id + this.width)
                    this.openCell(id + this.width + 1)
                    this.openCell(id + 1)
                    return;
                }
                if (id > this.width - 1 && id < this.width * this.height - 1 && !((id + 1) % this.width)) {
                    this.openCell(id - this.width)
                    this.openCell(id - this.width - 1)
                    this.openCell(id + this.width)
                    this.openCell(id + this.width - 1)
                    this.openCell(id - 1)
                    return;
                }
                this.openCell(id - this.width)
                this.openCell(id - this.width - 1)
                this.openCell(id - this.width + 1)
                this.openCell(id - 1)
                this.openCell(id + 1)
                this.openCell(id + this.width)
                this.openCell(id + this.width - 1)
                this.openCell(id + this.width + 1)
            } else {
                if (id === 0) {
                    if (this.field[1].value === 0)
                        this.openCell(1)
                    if (this.field[this.width].value === 0)
                        this.openCell(this.width)
                    if (this.field[this.width + 1].value === 0)
                        this.openCell(this.width + 1)
                    return;
                }
                if (id === this.width - 1) {
                    if (this.field[this.width - 1 - 1].value === 0)
                        this.openCell(this.width - 1 - 1)
                    if (this.field[this.width - 1 + this.width - 1].value === 0)
                        this.openCell(this.width - 1 + this.width - 1)
                    if (this.field[this.width - 1 + this.width].value === 0)
                        this.openCell(this.width - 1 + this.width)
                    return;
                }
                if (id === this.width * this.height - this.width) {
                    if (this.field[id - this.width].value === 0)
                        this.openCell(id - this.width)
                    if (this.field[id - this.width + 1].value === 0)
                        this.openCell(id - this.width + 1)
                    if (this.field[id + 1].value === 0)
                        this.openCell(id + 1)
                    return;
                }
                if (id === this.width * this.height - 1) {
                    if (this.field[id - this.width].value === 0)
                        this.openCell(id - this.width)
                    if (this.field[id - this.width - 1].value === 0)
                        this.openCell(id - this.width - 1)
                    if (this.field[id - 1].value === 0)
                        this.openCell(id - 1)
                    return;
                }
                if (id > 0 && id < this.width - 1) {
                    if (this.field[id - 1].value === 0)
                        this.openCell(id - 1)
                    if (this.field[id - 1].value === 0)
                        this.openCell(id - 1)
                    if (this.field[id + this.width + 1].value === 0)
                        this.openCell(id + this.width + 1)
                    if (this.field[id + this.width - 1].value === 0)
                        this.openCell(id + this.width - 1)
                    if (this.field[id + this.width].value === 0)
                        this.openCell(id + this.width)
                    return;
                }
                if (id < this.width * this.height - 1 && id > this.width * this.height - this.width) {
                    if (this.field[id - 1].value === 0)
                        this.openCell(id - 1)
                    if (this.field[id + 1].value === 0)
                        this.openCell(id + 1)
                    if (this.field[id - this.width - 1].value === 0)
                        this.openCell(id - this.width - 1)
                    if (this.field[id - this.width + 1].value === 0)
                        this.openCell(id - this.width + 1)
                    if (this.field[id - this.width].value === 0)
                        this.openCell(id - this.width)
                    return;
                }
                if (id > 0 && id < this.width * this.height - this.width && !(id % this.width)) {
                    if (this.field[id - this.width].value === 0)
                        this.openCell(id - this.width)
                    if (this.field[id - this.width + 1].value === 0)
                        this.openCell(id - this.width + 1)
                    if (this.field[id + this.width].value === 0)
                        this.openCell(id + this.width)
                    if (this.field[id + this.width + 1].value === 0)
                        this.openCell(id + this.width + 1)
                    if (this.field[id + 1].value === 0)
                        this.openCell(id + 1)
                    return;
                }
                if (id > this.width - 1 && id < this.width * this.height - 1 && !((id + 1) % this.width)) {
                    if (this.field[id - this.width].value === 0)
                        this.openCell(id - this.width)
                    if (this.field[id - this.width - 1].value === 0)
                        this.openCell(id - this.width - 1)
                    if (this.field[id + this.width].value === 0)
                        this.openCell(id + this.width)
                    if (this.field[id + this.width - 1].value === 0)
                        this.openCell(id + this.width - 1)
                    if (this.field[id - 1].value === 0)
                        this.openCell(id - 1)
                    return;
                }
                if (this.field[id - this.width].value === 0)
                    this.openCell(id - this.width)
                if (this.field[id - this.width - 1].value === 0)
                    this.openCell(id - this.width - 1)
                if (this.field[id - this.width + 1].value === 0)
                    this.openCell(id - this.width + 1)
                if (this.field[id - 1].value === 0)
                    this.openCell(id - 1)
                if (this.field[id + 1].value === 0)
                    this.openCell(id + 1)
                if (this.field[id + this.width].value === 0)
                    this.openCell(id + this.width)
                if (this.field[id + this.width - 1].value === 0)
                    this.openCell(id + this.width - 1)
                if (this.field[id + this.width + 1].value === 0)
                    this.openCell(id + this.width + 1)
            }
        }
    }

    markCell(id: number) {
        this.field[id].isMarked = !this.field[id].isMarked
    }
}

export const gameField = new GameFieldManager()