import React, {useContext} from 'react';
import {Button, Col, Layout, Row, Select} from "antd";
import CustomDifficultForm from "../CustomDifficultForm/CustomDifficultForm";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const {Option} = Select
const {Header} = Layout;

const MyHeader = observer(() => {

    const {auth, gameManager} = useContext(Context)

    return (
        <Header>
            <Row justify={"space-between"}>
                <Col>
                    <Row>
                        <Col>
                            <Select value={gameManager.difficultLevel} style={{width: 120}} onChange={(e) => {
                                gameManager.changeDifficult(e)
                            }}>
                                <Option value={'easy'}>Easy</Option>
                                <Option value={'medium'}>Medium</Option>
                                <Option value={'hard'}>Hard</Option>
                                <Option value={'custom'}>Custom</Option>
                            </Select>
                        </Col>
                        <Col>
                            <Row align={'middle'} style={{height: '100%'}}>
                                {gameManager.difficultLevel === 'custom'
                                    ?
                                    <CustomDifficultForm refreshGame={gameManager.refreshGame.bind(gameManager)}/>
                                    :
                                    <button style={{
                                        marginLeft: 25, width: 120, height: 30,
                                        outline: 'none', display: "flex", alignItems: 'center'
                                    }} onClick={() => {
                                        gameManager.refreshGame()
                                    }}>
                                    <span>
                                        New Game
                                    </span>
                                    </button>
                                }
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row align={'middle'}>
                        <Col>
                                <span style={{color: 'white', fontSize: "large"}}>
                                    {auth.user?.login}
                                </span>
                        </Col>
                        <Button onClick={() => {
                            auth.logout()
                        }}>
                            Logout
                        </Button>
                    </Row>
                </Col>
            </Row>
        </Header>
    );
});

export default MyHeader;