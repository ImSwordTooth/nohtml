import React from 'react'
import {Icon, Switch, Tabs} from "antd";

import Standard from './standard/standard'
import Hover from "./hover/hover";

const {TabPane} = Tabs;

class Operation extends React.Component{
    render() {
        return (
            <div className={'show_wp'} style={{borderLeft:'solid 1px #eeeeee',overflow:'hidden'}}>
                <div className={'Title'}>
                    <div>
                        <i className={'iconfont iconoperation titleIcon'}/>操作区
                    </div>
                    <div>
                        <i className={'iconfont iconreload'}/>
                    </div>
                </div>
                <div style={{padding:'2px 10px',overflow:'auto'}}>
                    <Tabs>
                        <TabPane tab="基础" key="1">
                            <Standard/>
                        </TabPane>
                        <TabPane tab="hover" key="2">
                            <Hover/>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default Operation
