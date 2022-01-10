import React, {useContext} from 'react';
import {Cell} from "./Cell/Cell";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

interface IProps {
    isGameStarted: boolean,
    startGame: (id: number) => void,
    isGameLose: boolean,
    isGameWin: boolean
}

export const GameField: React.FC<IProps> = observer(({isGameStarted, startGame, isGameLose, isGameWin}) => {

    const {gameField} = useContext(Context)

    return (
        <div style={{display: 'block', width: gameField.width * 30, height: 'max-content'}}>
            {gameField.field.map((cell) =>
                <Cell key={cell.id} {...cell}
                      markCell={gameField.markCell.bind(gameField)}
                      isGameStarted={isGameStarted}
                      startGame={startGame}
                      openCell={gameField.openCell.bind(gameField)}
                      isGameLose={isGameLose}
                      isGameWin={isGameWin}
                />
            )}
        </div>
    );
});
