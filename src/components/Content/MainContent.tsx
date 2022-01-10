import React, {useContext, useEffect} from 'react';
import {Col, Layout, Row} from "antd";
import {GameField} from "../GameField/GameField";
import GameFlag from "../GameFlag/GameFlag";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import MyHeader from "../MyHeader/MyHeader";
import LeadersList from "../LeadersList/LeadersList";

const {Content} = Layout;

const MainContent: React.FC = observer(() => {

    const {gameManager} = useContext(Context)

    useEffect(() => {
        gameManager.fetchLeaders()
    }, [])

    return (
        <>
            <MyHeader/>
            <Content style={{background: 'white', padding: 10}}>
                <Row justify={"space-between"}>
                    <Col>
                        <Row>
                            <Col>
                                <GameField isGameStarted={gameManager.isGameStarted}
                                           startGame={gameManager.startGame.bind(gameManager)}
                                           isGameLose={gameManager.isGameLose}
                                           isGameWin={gameManager.isGameWin}/>
                            </Col>
                            {(gameManager.isGameLose || gameManager.isGameWin) &&
                            <Col>
                                <GameFlag isGameWin={gameManager.isGameWin}
                                          isGameLose={gameManager.isGameLose}
                                          gameStartTime={gameManager.gameStartTime}/>
                            </Col>}
                        </Row>
                    </Col>
                    {gameManager.difficultLevel !== "custom" &&
                    <Col style={{width: 300}}>
                        <LeadersList/>
                    </Col>}
                </Row>
            </Content>
        </>
    );
});

export default MainContent;