import React,{PureComponent} from 'react'
import {Tabs} from "antd";
import Standard from './standard/standard'
import Hover from "./hover/hover";
import Customer from "./customer/customer";
import './operation.less'
const {TabPane} = Tabs;

export default class Operation extends PureComponent{
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
                <div style={{padding:'2px 10px',position:'relative'}}>
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
