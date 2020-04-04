import React,{PureComponent} from 'react'
import store from '../../../../store'
import {changeProp} from "../../../../common/units";
import {Slider} from "antd";

export default class MyFontSize extends PureComponent{

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
        const {stateName} = this.props;
        const {fontSize} = this.state[stateName];

        return(
            <li className={'fontSize'}>
                <span className={'operateTitle'}><i className={'iconfont iconnocssfontsize'}/>字体大小</span>
                <div className={'content'}>
                    <Slider style={{width:200}} min={12} max={100} onChange={(e)=>changeProp(stateName,'fontSize',e)} value={parseInt(fontSize)}/><span className={'unit'}>{fontSize}</span>
                </div>
            </li>
        )
    }
}
