import React from 'react'

import Start from './tabs/start'
import Insert from './tabs/insert'
import Viewport from './tabs/viewport'
import Animation from './tabs/animation'
import Classes from './tabs/classes'

import CodeModal from '../common/modals/codeModal'

import './css/myHeader.less'
import {changeCode} from "../../../store/action";
import { Tabs ,Button } from 'antd'
import Setting from "./tabs/setting";
const { TabPane } = Tabs;
const operations = <Button onClick={()=>changeCode(true)}>代码</Button>;
class myHeader extends React.Component{
    render() {
        return(
            <header className='header'>
                <Tabs defaultActiveKey="6" tabBarExtraContent={operations}>
                    <TabPane tab="开始" key="1">
                        <Start/>
                    </TabPane>
                    <TabPane tab="插入" key="2">
                        <Insert/>
                    </TabPane>
                    <TabPane tab="样式类" key="3">
                        <Classes/>
                    </TabPane>
                    <TabPane tab="动画" key="4">
                        <Animation/>
                    </TabPane>
                    <TabPane tab="视图" key="5">
                        <Viewport/>
                    </TabPane>
                    <TabPane tab="设置" key="6">
                        <Setting/>
                    </TabPane>
                </Tabs>
                <CodeModal/>
            </header>
        )
    }
}

export default myHeader;
