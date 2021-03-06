import React from "react";
import {getFetch, postFetch} from "../function/fetch";
import {Descriptions, Badge, Button, Col} from 'antd';
import CommentApp from './Comment'

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
            poster:null,
            comments:[],
            data:null
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
                poster:rsp.poster,
                comments:rsp.comments
            })
            console.log(this.state)
        })
    }

    handleDeleteComment(cid, uid){
        if (localStorage.getItem('id') != uid) alert("不是您自己的评论！")
        getFetch("/api/deleteComment?cid=" + cid, '', (rsp) => {
            console.log(rsp)
            this.setState({data:rsp}, ()=>{
                getFetch("/api/getComments?tid=" + 
                        this.props.match.params.ticketId, '', (rsp2)=>{
                    this.setState({comments:rsp2.comments}, ()=>{
                        console.log(this.state.comments)
                    })
                })
            })
        })
    }

    handleCreateComment(body){
        postFetch("/api/createComment", body, (rsp1) => {
            console.log(rsp1)
            this.setState({data:rsp1}, ()=>{
                getFetch("/api/getComments?tid=" + 
                        this.props.match.params.ticketId, '', (rsp2)=>{
                    this.setState({comments:rsp2.comments}, ()=>{
                        console.log(this.state.comments)
                    })
                })
            })
        })
    }

    render(){
        return (
            <Col span={12} offset={6}>
                <div style = {{"text-align":"center"}}><img src={this.state.poster} /></div>
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
                <Descriptions.Item label="城市">{this.state.city}</Descriptions.Item>
                <Descriptions.Item label="场馆" span={3}>{this.state.venues}</Descriptions.Item>
                <Descriptions.Item label="演出详情" span={3}>
                    {this.state.detail}
                </Descriptions.Item>
            </Descriptions>
                <Button type="primary" onClick={()=>this.buy(localStorage.getItem('id'), this.props.match.params.ticketId)}>购买</Button>
            <div className='wrapper'>
                <CommentApp 
                ticketId={this.props.match.params.ticketId} 
                comments={this.state.comments}
                onDeleteComment={this.handleDeleteComment.bind(this)}
                onCreateComment={this.handleCreateComment.bind(this)}/>
            </div>
            </Col>
        );
    }
}