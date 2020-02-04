// Nocss的结构页，有展示区、代码区和操作区
import React from 'react'
import {Provider} from 'react-redux'
import store from './store/index'
import Code from './components/nocss/code/code'
import Operation from './components/nocss/operation/operation'
import Show from './components/nocss/show/show'
import './css/nocss.less'
import {changeNav} from "./store/action";


export default class Nocss extends React.Component{
    componentDidMount() {
        changeNav('nocss');
    }

    componentWillUnmount() {
        changeNav('');
    }

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
