import React from 'react';

interface IProps {
    isGameLose: boolean,
    isGameWin: boolean,
    gameStartTime: Date | null
}

const GameFlag: React.FC<IProps> = ({gameStartTime, isGameLose, isGameWin}) => {
    let time: number | null = null
    if (gameStartTime) {
        time = Math.round(((new Date()).getTime() - gameStartTime.getTime()) / 1000)
    }

    return (
        <div style={{display:"flex", flexDirection:'column', padding: 10}}>
            {isGameLose &&
            <div style={{height: '20px'}}>
                Lose!
            </div>
            }
            {isGameWin &&
            <div style={{height: '20px'}}>
                Win!
            </div>
            }
            {Boolean(gameStartTime) &&
            <div style={{height: '20px'}}>
                Time: {time} s
            </div>
            }
        </div>
    );
};

export default GameFlag;