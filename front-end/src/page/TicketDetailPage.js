import React from "react";
import {getFetch} from "../function/fetch";
import {Descriptions, Badge, Button, Col} from 'antd';

export default class TicketInfoPage extends React.Component {
    constructor() {
        super();
        this.state={
            ticketName:null,
            beginTime:null,
            endTime:null,
            typeName:null,
            price:null,
            city:null,
            venues:null,
            availableNumber:null,
            detail:null,
            poster:null
        }
    }

    buy(userId,ticketId){
        getFetch("/order/createOrder?userId="+userId+"&ticketId="+ticketId,"",(rsp)=>{
            this.props.history.goBack();
        })
    }

    componentDidMount() {
        getFetch("/ticket/getOne?ticketId="+this.props.match.params.ticketId,'',(rsp)=>{
            console.log(rsp);
            this.setState({
                ticketName:rsp.ticketName,
                beginTime:rsp.beginTime,
                endTime:rsp.endTime,
                typeName:rsp.typeName,
                price:rsp.price,
                city:rsp.city,
                venues:rsp.venues,
                availableNumber:rsp.availableNumber,
                detail:rsp.detail,
                poster:rsp.poster
            })
            console.log(this.state)
        })
    }

    render(){
        return (
            
            <Col span={12} offset={6}>
                <div><img src={this.state.poster} /></div>
                <Button type="primary" style={{float:"right"}} onClick={()=>{
                    this.props.history.goBack();
                }}>返回</Button>
            <Descriptions title="演出详情" bordered>
                <Descriptions.Item label="演出名称">{this.state.ticketName}</Descriptions.Item>
                <Descriptions.Item label="开始时间">{this.state.beginTime}</Descriptions.Item>
                <Descriptions.Item label="结束时间">{this.state.endTime}</Descriptions.Item>
                <Descriptions.Item label="所属类型">{this.state.typeName}</Descriptions.Item>
                <Descriptions.Item label="价格"><span style={{color:"red"}}>{this.state.price}</span></Descriptions.Item>
                <Descriptions.Item label="剩余名额"><span style={{color:"blue"}}>{this.state.availableNumber}</span></Descriptions.Item>
                {/* <Descriptions.Item label="城市">{this.state.city}</Descriptions.Item>
                <Descriptions.Item label="场馆">{this.state.venues}</Descriptions.Item> */}
                <Descriptions.Item label="演出详情" span={3}>
                    {this.state.detail}
                </Descriptions.Item>
            </Descriptions>
                <Button type="primary" onClick={()=>this.buy(localStorage.getItem('id'),this.props.match.params.ticketId)}>购买</Button>
            </Col>
        );
    }
}