import React from 'react'
import store from '../../../../store'

import {changeProp} from "../common/api";
import {Slider} from "antd";

class MyFontSize extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState());
        store.subscribe(this.listener)
    }

    listener = ()=>{
        let newState = store.getState();
        this.setState(newState)
    };

    render() {
        return(
            <li id={'fontSize'}>
                <span className={'operateTitle'}><i className={'iconfont iconnocssfontsize'}/>字体大小</span>
                <div className={'content'}>
                    <Slider style={{width:200}} min={12} max={100} onChange={(e)=>changeProp('fontSize',e)} value={parseInt(this.state.nocssStyle.fontSize)}/><span className={'unit'}>{this.state.nocssStyle.fontSize}</span>
                </div>
            </li>
        )
    }
}

export default MyFontSize
