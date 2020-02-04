import React from 'react'
import {Tabs} from "antd";
import store from '../../../store'
import Standard from './standard/standard'
import Hover from "./hover/hover";
import Customer from "./customer/customer";
import './operation.less'
const {TabPane} = Tabs;

class Operation extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState());
        store.subscribe(this.listener)
    }

    listener = ()=>{
        let newState = store.getState();
        this.setState(newState)
    };

    render() {
        return (
            <div className={'show_wp'} id={'show_wp'} style={{borderLeft:'solid 1px #eeeeee',overflow:'hidden'}}>
                <div className={'Title'}>
                    <div>
                        <i className={'iconfont iconoperation titleIcon'}/>操作区
                    </div>
                    <div>
                        <i className={'iconfont iconreload'}/>
                    </div>
                </div>
                <div style={{padding:'2px 10px',position:'relative'}} id={'xxx'}>
                    <Tabs defaultActiveKey={'1'}>
                        <TabPane tab={<span className={'tabPane'}><i className={'iconfont iconstandard'}/><span>基础</span></span>} key="1">
                            <Standard/>
                        </TabPane>
                        <TabPane tab={<span className={'tabPane'}><i className={'iconfont iconhover'}/><span>hover</span></span>} key="2">
                            <Hover/>
                        </TabPane>
                        <TabPane tab={<span className={'tabPane'}><i className={'iconfont iconcustomer'}/><span>自定义</span></span>} key="3">
                            <Customer/>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default Operation
