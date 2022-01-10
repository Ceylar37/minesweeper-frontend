export interface ICreateField {
    width: number,
    height: number,
    mines: number
}

export interface ICell {
    id: number
    value: number | null
    isOpen: boolean
    isMine: boolean,
    isMarked: boolean
}