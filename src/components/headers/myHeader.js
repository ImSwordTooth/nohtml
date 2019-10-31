import React from 'react'

import Start from './tabs/start'
import Insert from './tabs/insert'
import Layout from './tabs/layout'
import Viewport from './tabs/viewport'
import Animation from './tabs/animation'

import './css/myHeader.less'
import {changeCode} from "../../store/action";
import { Tabs ,Button } from 'antd'
const { TabPane } = Tabs;
const operations = <Button onClick={()=>changeCode(true)}>代码</Button>;
class myHeader extends React.Component{

    render() {
        return(
            <header className='header'>
                !Html
                <Tabs defaultActiveKey="4" tabBarExtraContent={operations}>
                    <TabPane tab="开始" key="1">
                        <Start/>
                    </TabPane>
                    <TabPane tab="插入" key="2">
                        <Insert/>
                    </TabPane>
                    <TabPane tab="布局" key="3">
                        <Layout/>
                    </TabPane>
                    <TabPane tab="动画" key="4">
                        <Animation/>
                    </TabPane>
                    <TabPane tab="视图" key="5">
                        <Viewport/>
                    </TabPane>
                    <TabPane tab="样式类" key="6">
                        Content of Tab Pane 5
                    </TabPane>
                    <TabPane tab="设置" key="7">
                        ico/title/meta...
                    </TabPane>

                </Tabs>
            </header>
        )
    }
}

export default myHeader;
