import React from "react";
import {Button, Form, Input, Select} from 'antd';
import 'antd/dist/antd.css';
import {postFetch} from "../function/fetch";

const {Option} = Select;

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select
            style={{
                width: 70,
            }}
        >
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
        </Select>
    </Form.Item>
);

export default class RegisterPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            nickname: "",
            pw: "",
            pw1: "",
            pw2: "",
        }

    }

    GotoLogIn() {
        this.props.history.push('/login');
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


    submitRegister() {
        console.log(this.state.pw)
        if ((this.state.id.length > 0)
            && (this.state.nickname.length > 0)
            && (this.state.pw.length > 0)) {
            postFetch('/user/register',
                {
                    name: this.state.nickname,
                    id: this.state.id,
                    password: this.state.pw,
                }, (rsp) => {
                    this.login();
                }
            );
        }
    }

    render() {
        return (
            <div>
                <div style={{
                    maxWidth: "500px",
                    padding: "15px",
                    margin: "0 auto"
                }}>
                    <Form
                        style={{
                            maxWidth: "300px",
                            margin: "0 auto"
                        }}
                        name="register"
                        initialValues={{
                            prefix: '86',
                        }}
                        scrollToFirstError
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
                                id="idInput"
                                placeholder={"输入id"}
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
                            hasFeedback
                        >
                            <Input.Password
                                id="pw1"
                                onChange={(e) => {
                                    if (e.target.value === this.state.pw2) {
                                        this.setState({
                                            pw1: e.target.value,
                                            pw: e.target.value
                                        });
                                    } else {
                                        this.setState({
                                            pw1: e.target.value
                                        });
                                    }
                                }}
                                placeholder={"设置密码"}/>
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: '请确认密码',
                                },
                                ({getFieldValue}) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject('两次输入不一致');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                id="pw2"
                                onChange={(e) => {
                                    if (e.target.value === this.state.pw1) {
                                        console.log("here")
                                        this.setState({
                                            pw2: e.target.value,
                                            pw: e.target.value
                                        });
                                    } else {
                                        this.setState({
                                            pw2: e.target.value
                                        });
                                    }
                                }}
                                placeholder={"确认密码"}/>
                        </Form.Item>

                        <Form.Item
                            name="nickname"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入昵称',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input
                                id="nameInput"
                                placeholder={"设置昵称"}
                                onChange={(e) => {
                                    this.setState({nickname: e.target.value})
                                }}
                            />
                        </Form.Item>

                        <Form.Item style={{maxWidth: "200px", margin: "0 auto"}}>
                            <Button
                                id="submitButton"
                                type="primary"
                                htmlType="submit"
                                style={{float: "left"}}
                                onClick={() => {
                                    this.submitRegister()
                                }}
                            >
                                注册
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{float: "right"}}
                                onClick={() => this.GotoLogIn()}
                            >
                                返回
                            </Button>

                        </Form.Item>
                    </Form>

                </div>
            </div>
        )
    }
}
