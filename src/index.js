import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import {Provider} from 'react-redux'
import store from "./store";
import {BrowserRouter as Router,Route}  from 'react-router-dom'
import './css/iconfont.css'

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';

moment.locale('zh-cn');

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path={`/`} component={App}/>
        </Router>
    </Provider>
    , document.getElementById('root'));
