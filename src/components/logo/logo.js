import React from 'react'
import store from "../../store";
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import {Popover} from "antd";
import './logo.less'


class Logo extends React.Component{

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    constructor(props){
        super(props);
        this.state = {
            pathname:this.props.location.pathname
        };
        store.subscribe(this.listener);
    }
    listener = () => {
        let newState = store.getState();
        this.setState(newState);
    };

    logoName = ()=>{
        let path = this.props.location.pathname;
        if (path === '/nohtml' || path === '/nocss'){
            return 'logo_wp logoAnimation'
        } else {
            return 'logo_wp'
        }
    };

    isShow = ()=>{
        return this.props.pathname==='/nocss'||this.props.location.pathname==='/nohtml';
    }

    // content = ()=>{
    //     switch () {
    //
    //     }
    // }

    render() {
        const content = (
            <div>
                <ul className={'list'}>
                    <li>新建文件</li>
                    <li>打开最近文件</li>
                    <li>保存到云端</li>
                    <li>导出代码</li>
                    <li>帮助</li>
                </ul>
            </div>
        )
        return (
            <div>

            {this.props.location.pathname==='/nocss'||this.props.location.pathname==='/nohtml'
                    ?
                    <Popover content={content} placement={'rightBottom'} align={{targetOffset:[0,50]}}>
                        <div className={this.logoName()} id={'logo'}>
                            <img src={require('../../logo.png')} alt={'logo'} className={'logo'}/>
                            {/*{this.props.location.pathname}*/}
                            {/*<ol className={'list'}>*/}
                            {/*<li>新建</li>*/}
                            {/*<li>打开</li>*/}
                            {/*<li>保存</li>*/}
                            {/*<li>导出</li>*/}
                            {/*<li>帮助</li>*/}
                            {/*</ol>*/}
                        </div>
                    </Popover>
                    :
                    <div className={this.logoName()} id={'logo'}>
                        <img src={require('../../logo.png')} alt={'logo'} className={'logo'}/>
                        {/*{this.props.location.pathname}*/}
                        {/*<ol className={'list'}>*/}
                        {/*<li>新建</li>*/}
                        {/*<li>打开</li>*/}
                        {/*<li>保存</li>*/}
                        {/*<li>导出</li>*/}
                        {/*<li>帮助</li>*/}
                        {/*</ol>*/}
                    </div>
            }
            </div>

        )
    }

}

export default withRouter(Logo);
