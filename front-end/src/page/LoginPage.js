import React from "react";
import Link from "react";
import {Button, Checkbox, Form, Input} from 'antd';
import 'antd/dist/antd.css';
import {BrowserRouter} from "react-router-dom";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            pw: "",
        }
    }

    login = () => {
        let id = this.state.id
        let pw = this.state.pw
        fetch('api/api/login?id='+id+"&password="+pw,{
            method:'GET',
            cache:'default'
        }).then(rsp => rsp.json().then(rsp => {
            if(rsp.code!=0)
                console.log(rsp);
            else {
                console.log(rsp);
                localStorage.setItem('log',1);
                localStorage.setItem('id',this.state.id);
                this.props.history.push("/tickets")
            }
        }))
    };


    render() {
        return (
            <div>
                <div style={{
                    maxWidth: "500px",
                    padding: "15px",
                    margin: "0 auto"
                }}>
                    <Form
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <Form.Item
                            name="id"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入id',
                                },
                            ]}
                        >
                            <Input
                                id="id"
                                placeholder="id"
                                onChange={(e) => {
                                    this.setState({id: e.target.value})
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码',
                                },
                            ]}
                        >
                            <Input
                                id="pwInput"
                                type="password"
                                placeholder="密码"
                                onChange={(e) => {
                                    this.setState({pw: e.target.value})
                                }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住我</Checkbox>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                data-cy="login"
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                onClick={() => this.login()}
                            >
                                登录
                            </Button>
                            或者 <a data-cy="goToRegister"><span
                            onClick={() => this.props.history.push("/register")}>立刻注册
                            </span>
                        </a>
                        </Form.Item>
                    </Form>
                </div>
            </div>

        )
    }
}