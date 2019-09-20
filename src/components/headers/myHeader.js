import React from 'react'

import Start from './tabs/start'
import Insert from './tabs/insert'
import Layout from './tabs/layout'

import { Tabs ,Button } from 'antd'
const { TabPane } = Tabs;
const operations = <Button>代码</Button>;
class myHeader extends React.Component{

    render() {
        return(
            <header className='header'>
                !Html
                <Tabs defaultActiveKey="1" tabBarExtraContent={operations}>
                    <TabPane tab="开始" key="1">
                        <Start/>
                    </TabPane>
                    <TabPane tab="插入" key="2">
                        <Insert/>
                    </TabPane>
                    <TabPane tab="布局" key="3">
                        <Layout/>
                    </TabPane>
                    <TabPane tab="表单" key="4">
                        Content of Tab Pane 4
                    </TabPane>
                    <TabPane tab="设计" key="5">
                        Content of Tab Pane 5
                    </TabPane>
                </Tabs>
            </header>
        )
    }
}

export default myHeader;
