import React from 'react'
import store from '../../../../store'
import 'rc-color-picker/assets/index.css';
import './standard.less'
import {Select} from 'antd'

import {changeNocssStyle} from "../../../../store/action";
import MyColor from "../props/myColor";
import MyBackgroundColor from "../props/myBackgroundColor";
import MyFontSize from "../props/myFontSize";
import MyFontStyle from "../props/myFontStyle";
import MyBorder from "../props/myBorder";
import MyPadding from "../props/myPadding";
import MyBoxShadow from "../props/myBoxShadow";
import MyTextShadow from "../props/myTextShadow";

class Standard extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{

        });
        store.subscribe(this.listener)
    }

    listener = ()=>{
        let newState = store.getState();
        this.setState(newState)
    };

    render() {
        return (
            <div>
                <ul className={'operationUl'}>
                    {/*颜色*/}
                    <MyColor stateName={'nocssStyle'}/>
                    {/*背景颜色*/}
                    <MyBackgroundColor stateName={'nocssStyle'}/>
                    {/*字体大小*/}
                    <MyFontSize stateName={'nocssStyle'}/>
                    {/*字型*/}
                    <MyFontStyle stateName={'nocssStyle'}/>
                    {/*边框*/}
                    <MyBorder stateName={'nocssStyle'}/>
                    {/*内边距*/}
                    <MyPadding stateName={'nocssStyle'}/>
                    {/*盒子阴影*/}
                    <MyBoxShadow stateName={'nocssStyle'}/>
                    {/*字体阴影*/}
                    <MyTextShadow stateName={'nocssStyle'}/>
                    {/*轮廓线*/}
                    <li id={'outline'}>
                        <span className={'operateTitle'}><i className={'iconfont iconnetworkimg'}/>背景</span>
                        <div className={'content'}>

                        </div>
                    </li>
                    {/*轮廓线*/}
                    <li id={'outline'}>
                        <span className={'operateTitle'}><i className={'iconfont iconnocssoutline'}/>圆角</span>
                        <div className={'content'}>

                        </div>
                    </li>
                    {/*轮廓线*/}
                    <li id={'outline'}>
                        <span className={'operateTitle'}><i className={'iconfont iconnocssoutline'}/>滤镜</span>
                        <div className={'content'}>

                        </div>
                    </li>
                </ul>
            </div>
        )
    }

}

export default Standard;
