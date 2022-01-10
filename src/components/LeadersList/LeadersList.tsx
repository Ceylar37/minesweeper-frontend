import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Table} from "antd";

const columns = [
    {
        title: 'User',
        dataIndex: 'userLogin',
        key: 'userLogin',
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
    }
];

const LeadersList = observer(() => {

    const {gameManager} = useContext(Context)
    let gamesType: keyof typeof gameManager.leaders = "easyGamesList"
    switch (gameManager.difficultLevel) {
        case "easy":
            gamesType = "easyGamesList"
            break;
        case "medium":
            gamesType = "mediumGamesList"
            break;
        case "hard":
            gamesType = "hardGamesList"
            break
    }
    return (
            <Table dataSource={gameManager.leaders[gamesType].map(item => ({...item, key: item.id, time: item.time + 's'}))} columns={columns}/>
    );
});

export default LeadersList;