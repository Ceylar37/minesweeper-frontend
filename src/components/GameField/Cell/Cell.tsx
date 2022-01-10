import React from 'react';
import {observer} from "mobx-react-lite";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import {ICell} from "../../../models/Field";

interface IProps extends ICell {
    isGameStarted: boolean,
    startGame: (id: number) => void,
    openCell: (id: number) => void,
    markCell: (id: number) => void,
    isGameLose: boolean,
    isGameWin: boolean
}

export const Cell: React.FC<IProps> = observer(({
                                                    id,
                                                    value,
                                                    isMine, isOpen,
                                                    isGameStarted,
                                                    startGame,
                                                    openCell,
                                                    markCell,
                                                    isMarked,
                                                    isGameLose,
                                                    isGameWin
                                                }) => {

    let color = 'white'
    switch (value) {
        case 1:
            color = 'blue'
            break
        case 2:
            color = 'green'
            break
        case 3:
            color = 'red'
            break
        case 4:
            color = 'darkblue'
            break
        case 5:
            color = 'violet'
            break
        case 6:
            color = '#31CEB8'
            break
        case 7:
            color = 'black'
            break
        case 8:
            color = 'orange'
            break
        default:
            color = 'white'
    }

    return (
        isOpen
            ?
            <div style={{
                display: "flex",
                width: 30,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                margin: 0,
                background: 'white',
                float: 'left',
                //border: '1px solid darkgray',
                borderTop: '3px solid darkgray',
                borderLeft: '3px solid darkgray',
                borderBottom: '3px solid white',
                borderRight: '3px solid white',
            }}>
                        <span style={{
                            display: "flex",
                            fontWeight: 'bold',
                            color,
                            fontSize: 25
                        }}>
                            {Boolean(value) && value}
                        </span>
            </div>
            :
            <div onContextMenu={(!isGameLose && !isGameWin && isGameStarted)
                ?
                (e) => {
                    markCell(id)
                    e.preventDefault()
                }
                :
                () => false
            } onMouseDown={(isGameLose || isGameWin)
                ? () => false
                :
                isGameStarted
                    ?
                    (e) => {
                        if (e.button === 0 && !isMarked) {
                            openCell(id)
                        }
                    }
                    :
                    () => {
                        startGame(id)
                    }} style={{
                display: "flex",
                width: 30,
                height: 30,
                margin: 0,
                alignItems: "center",
                justifyContent: 'center',
                background: (isMarked || isGameWin) ? 'red' : (isMine && isGameLose) ? 'black' : "#C1C1C1",
                borderTop: '3px solid white',
                borderLeft: '3px solid white',
                borderBottom: '3px solid darkgray',
                borderRight: '3px solid darkgray',
                float: 'left'
            }}>
                {isGameLose && isMarked && isMine && <CheckOutlined/>}
                {isGameLose && isMarked && !isMine && <CloseOutlined/>}
            </div>
    );
});