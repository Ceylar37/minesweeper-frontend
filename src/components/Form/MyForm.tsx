import React from 'react';
import {Button, Form, Input, Row} from "antd";
import {ILoginFormData} from "../../models/Forms";
import FormItemLabel from "antd/es/form/FormItemLabel";
import {useHistory} from "react-router-dom";
import {observer} from "mobx-react-lite";

interface IProps {
    onSubmit: (values: ILoginFormData) => Promise<void>
    isAuthLoading: boolean
}

const {Item} = Form

const MyForm: React.FC<IProps> = observer(({onSubmit, isAuthLoading}) => {
    const history = useHistory()
    const isLogin = history.location.pathname === '/'
    return (
        <Row align={'middle'} justify={'center'} style={{height: '100vh'}}>
            <Form autoComplete="off" onFinish={(values) => {
                history.push('/')
                onSubmit(values)
            }}>
                <h3>{isLogin ? 'Login' : 'Registration'}</h3>
                <FormItemLabel prefixCls={'Login'} label={'Login'}/>
                <Item name={'login'} rules={[{ required: true}]}>
                    <Input style={{width: 300}} disabled={isAuthLoading} placeholder={'Login'}/>
                </Item>
                <FormItemLabel prefixCls={'Password'} label={'Password'}/>
                <Item name={'password'} rules={[{ required: true}]}>
                    <Input style={{width: 300}} disabled={isAuthLoading} type={'password'} placeholder={'Password'}/>
                </Item>
                <Row align={'middle'} justify={'space-between'}>
                    <Button disabled={isAuthLoading} type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button disabled={isAuthLoading} type="link" onClick={() => {
                        history.push(isLogin ? '/registration' : '/')
                    }}>
                        {isLogin ? 'Registration' : 'Login'}
                    </Button>
                </Row>
            </Form>
        </Row>
    );
});

export default MyForm;