import React from "react";
import {getFetch} from "../function/fetch";
import {Button, Col, Input, Select, Space, Table} from "antd";

const { Column } = Table;

export default class TicketInfoPage extends React.Component {
    constructor() {
        super();
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        getFetch("/order/selfOrder?userId="+localStorage.getItem('id'),"",(rsp)=>{
            this.setState({
                data:rsp
            })
            console.log(rsp);
        })
    }


    deleteOrder(id) {
        getFetch("/order/deleteOrder?orderId="+id,'',(rsp)=>{
            getFetch("/order/selfOrder?userId="+localStorage.getItem('id'),"",(rsp)=>{
                this.setState({
                    data:rsp
                })
                console.log(rsp);
            })
        })
    }

    render() {
        return(
            <Col span={12} offset={6}>
                <Button type="primary" style={{float:"right"}} onClick={()=>{
                    this.props.history.goBack();
                }}>返回</Button>
                <Table dataSource={this.state.data}>
                    <Column title="ticketId" dataIndex="ticketId"/>
                    <Column title="购买时间" dataIndex="time"/>
                    <Column title="门票名称" dataIndex="ticketName"/>
                    <Column
                        title=""
                        key="action"
                        render={(record) => (
                            <a onClick={()=>this.props.history.push("/ticketDetail/"+record.ticketId)}>门票详情</a>
                        )}
                    />
                    <Column
                        title=""
                        key="action"
                        render={(record) => (
                            <a onClick={()=>this.deleteOrder(record.orderId)}>退票</a>
                        )}
                    />
                </Table>
            </Col>
        );
    }
}