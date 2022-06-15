import React, {useContext, useEffect} from 'react';
import 'antd/dist/antd.css'
import {Layout} from 'antd';
import {observer} from "mobx-react-lite";
import {Route, Switch} from 'react-router-dom';
import MainContent from "./components/Content/MainContent";
import MyForm from "./components/Form/MyForm";
import {Context} from "./index";

export const App = observer(() => {

    const {gameManager, auth} = useContext(Context)

    useEffect(() => {
        gameManager.changeDifficult('easy')
        if (localStorage.getItem('accessToken')) {
            auth.checkAuth()
        }
    }, [])

    if (auth.isLoading) {
        return (
            <Layout style={{
                minWidth: '100vw',
                minHeight: '100vh',
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <h1>
                    Loading...
                </h1>
            </Layout>
        )
    }

    return (
        <Layout style={{minWidth: '100vw', minHeight: '100vh'}}>
            <Switch>
                {
                    auth.isAuthorized
                        ?
                        <Route key={'content'} path={'/'}>
                            <MainContent/>
                        </Route>
                        :
                        <>
                            <Route key={'login'} path={'/'} exact={true}>
                                <MyForm isAuthLoading={auth.isAuthLoading} onSubmit={auth.login.bind(auth)}/>
                            </Route>
                            <Route key={'registration'} path={'/registration'}>
                                <MyForm isAuthLoading={auth.isAuthLoading} onSubmit={auth.registration.bind(auth)}/>
                            </Route>
                        </>
                }
            </Switch>
        </Layout>
    );
})