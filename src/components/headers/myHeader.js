import React from 'react'

import Start from './tabs/start'

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
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="设计" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </header>
        )
    }
}

export default myHeader;
