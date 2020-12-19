import {Button,Input,DatePicker,Select,Table, Tag, Space ,Col} from 'antd';
import React from "react";
import {getFetch, postFetch} from "../function/fetch";
import {BrowserRouter} from "react-router-dom";

const { Column } = Table;

const {RangePicker} = DatePicker
export default class TicketInfoPage extends React.Component {
    constructor() {
        super();
        this.state = {
            data:null,
            types:null,
            selectedType:null,
            selectedBeginTime:null,
            selectedEndTime:null,
            keyword:""
        }
        // getFetch("/ticket/all","",(rsp)=>this.setState({
        //     data:rsp
        // }))
    }

    componentDidMount() {
        getFetch("/ticket/all","",(rsp)=>{
            console.log(rsp)
            this.setState({
                data:rsp
            })
        })
        getFetch("/ticket/allTypes","",(rsp)=>{
            console.log(rsp);
            let children=[];
            for(let i=0;i<rsp.length;i++){
                children.push(<Select key={rsp[i].type_name}>{rsp[i].type_name}</Select>);
            }
            this.setState({types:children})
        })
    }

    // componentWillUnmount() {
    //     getFetch("/ticket/all","",(rsp)=>this.setState({
    //         data:rsp
    //     }))
    // }

    search(){
        if(this.state.selectedType==null || this.state.selectedBeginTime==null || this.state.selectedEndTime==null){
            alert("信息不足！")
            return;
        }
        let body = new Object();
        body.type=this.state.selectedType;
        body.beginTime=this.state.selectedBeginTime;
        body.endTime=this.state.selectedEndTime;
        body.keyword = this.state.keyword
        postFetch("/ticket/search",body,(rsp)=>{
            this.setState({data:rsp});
        })
    }

    render() {
        return(
            <Col span={12} offset={6}>
                <Button type="primary" style={{float:"right"}} onClick={()=>{
                    this.props.history.push('login');
                }}>登出</Button>
                <Select style={{ width: 200 }} placeholder="选择门票类型" onChange={(value)=>this.setState({selectedType:value})}>
                    {this.state.types}
                </Select>
                <Space direction="vertical" size={12}>
                    <RangePicker showTime onChange={(value)=>{
                        if(value==null)
                            this.setState({
                                selectedBeginTime:null,
                                selectedEndTime:null
                            })
                        else
                            this.setState({
                                selectedBeginTime:value[0].format('YYYY-MM-DD HH:MM:SS'),
                                selectedEndTime:value[1].format('YYYY-MM-DD HH:MM:SS')
                            })
                    }}/>
                </Space>
                <Input placeholder="关键字" onChange={(e)=>this.setState({keyword:e.target.value})} />
                <Button type="primary" onClick={()=>{
                    this.search()
            }}>搜索</Button>
                <Button style={{float:'right'}} type="primary" onClick={()=>{
                    this.props.history.push('myOrders');
                }}>我的订单</Button>
            <Table dataSource={this.state.data}>
                <Column title="ticket name" dataIndex="ticketName"/>
                <Column title="price" dataIndex="price"/>
                <Column title="available nums" dataIndex="availableNumber"/>
                <Column title="Type Name" dataIndex="typeName"/>
                <Column title="开始时间" dataIndex="beginTime"/>
                <Column title="结束时间" dataIndex="endTime" />
                <Column
                    title=""
                    key="action"
                    render={(record) => (
                            <a onClick={()=>this.props.history.push("/ticketDetail/"+record.tid)}>详情</a>
                    )}
                />
            </Table>
            </Col>
        );
    }
}