import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import {BrowserRouter} from "react-router-dom";
import {auth} from "./store/auth";
import {gameField} from "./store/game-field";
import {gameManager} from "./store/game-manager";

export const Context = createContext({
    auth,
    gameField,
    gameManager
})

ReactDOM.render(
    <Context.Provider value={{
        auth,
        gameManager,
        gameField
    }}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Context.Provider>,
    document.getElementById('root')
);