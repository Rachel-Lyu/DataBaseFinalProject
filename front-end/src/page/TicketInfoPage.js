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
            sonTypes:null,
            cities:null,
            selectedType:null,
            selectedSonType:null,
            selectedBeginTime:null,
            selectedEndTime:null,
            selectedCity:null,
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
        getFetch("/ticket/parentTypes","",(rsp)=>{
            console.log(rsp);
            let parentType=[];
            for(let i=0;i<rsp.length;i++){
                parentType.push(<Select key={rsp[i].type_name}>{rsp[i].type_name}</Select>);
            }
            this.setState({types:parentType})
        })
        let raw_cities = ["全部", "上海", "深圳", "珠海", "北京", "南昌", "武汉", "杭州", "沈阳", "南京", "广州", "成都", "苏州", "重庆", "厦门", "天津", "合肥", "南宁", "哈尔滨", "柳州", "海口", "佛山", "蚌埠", "南通", "长沙", "宁波", "惠州", "金华", "江门", "福州", "温州", "银川", "常州", "三亚", "茂名", "凉山", "聊城", "泰安", "绍兴", "济南", "郑州", "西安", "长春", "呼和浩特", "贵阳", "大连"]
        let cities = []
        for (let i = 0; i < raw_cities.length; i++) {
            cities.push(<Select key={raw_cities[i]}>{raw_cities[i]}</Select>)
        }
        this.setState({cities:cities})
    }

    getSonType = (value) =>{
        this.setState({selectedType:value}, 
            ()=>{
                let bd = new Object()
                bd.fType = this.state.selectedType
                postFetch("/ticket/sonTypes", bd, (rsp)=>{
                    // console.log(rsp);
                    let sonTypes=[];
                    for(let i=0;i<rsp.length;i++){
                        sonTypes.push(<Select key={rsp[i].type_name}>{rsp[i].type_name}</Select>);
                    }
                    this.setState({sonTypes:sonTypes})
                })
            }
        )
    }
    // componentWillUnmount() {
    //     getFetch("/ticket/all","",(rsp)=>this.setState({
    //         data:rsp
    //     }))
    // }

    search(){
        // if(this.state.selectedType==null || this.state.selectedBeginTime==null || this.state.selectedEndTime==null){
        //     alert("信息不足！")
        //     return;
        // }
        let body = new Object();
        body.type=this.state.selectedType;
        body.beginTime=this.state.selectedBeginTime;
        body.endTime=this.state.selectedEndTime;
        body.city = this.state.selectedCity;
        body.keyword = this.state.keyword
        body.sonType = this.state.selectedSonType
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
                <Select style={{ width: 200 }} placeholder="选择门票类型" onChange={this.getSonType}>
                    {this.state.types}
                </Select>
                <Select style={{ width: 200 }} placeholder="子类型" onChange={(value)=>this.setState({selectedSonType:value})}>
                    {this.state.sonTypes}
                </Select>
                <Select style={{ width: 200 }} placeholder="城市" onChange={(value)=>this.setState({selectedCity:value})}>
                    {this.state.cities}
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
                <Column title="名称" dataIndex="ticketName"/>
                <Column title="价格" dataIndex="price"/>
                <Column title="场馆" dataIndex="venues"/>
                <Column title="剩余数量" dataIndex="availableNumber"/>
                <Column title="类型" dataIndex="typeName"/>
                <Column title="开始时间" dataIndex="beginTime"/>
                <Column title="结束时间" dataIndex="endTime" />

                {/* <Column title="地点" dataIndex="city"> */}
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
