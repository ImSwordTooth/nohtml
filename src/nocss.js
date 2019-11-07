import React from 'react'
import {Provider} from 'react-redux'
import store from './store/index'

import {Layout} from "antd";
import Code from './components/nocss/code/code'
import Operation from './components/nocss/operation/operation'
import Show from './components/nocss/show/show'

import './css/nocss.less'
const { Content, Sider } = Layout;


class Nocss extends React.Component{

    render() {
        return(
            <Provider store={store}>
                <div className={'Nocss'}>
                    <div className={'show'}>
                        <Show/>
                    </div>
                    <div className={'code'}>
                        <Code/>
                    </div>
                    <div className={'operation'}>
                        <Operation/>
                    </div>
                </div>
            </Provider>
        )
    }

}

export default Nocss;
