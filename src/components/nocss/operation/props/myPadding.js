import React from 'react'
import store from '../../../../store'

import {changeProp} from "../common/api";
import {Slider} from "antd";

class MyPadding extends React.Component{

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
            <li className={'padding'}>
                <span className={'operateTitle'}><i className={'iconfont iconnocsspadding'}/>内边距</span>
                <div className={'content'}>
                    <div className={'items'}>
                        <div className={'info'}>top：</div>
                        <Slider style={{width:100}} min={0} max={100} onChange={(e)=>changeProp(this.props.stateName,'padding',e+'px',0)} value={parseInt(this.state[this.props.stateName].padding.split(' ')[0])}/><span className={'unit'}>{this.state[this.props.stateName].padding.split(' ')[0]}</span>
                    </div>
                    <div className={'items'}>
                        <div className={'info'}>right：</div>
                        <Slider style={{width:100}} min={0} max={100} onChange={(e)=>changeProp(this.props.stateName,'padding',e+'px',1)} value={parseInt(this.state[this.props.stateName].padding.split(' ')[1])}/><span className={'unit'}>{this.state[this.props.stateName].padding.split(' ')[1]}</span>
                    </div>
                    <div className={'items'}>
                        <div className={'info'}>bottom：</div>
                        <Slider style={{width:100}} min={0} max={100} onChange={(e)=>changeProp(this.props.stateName,'padding',e+'px',2)} value={parseInt(this.state[this.props.stateName].padding.split(' ')[2])}/><span className={'unit'}>{this.state[this.props.stateName].padding.split(' ')[2]}</span>
                    </div>
                    <div className={'items'}>
                        <div className={'info'}>left：</div>
                        <Slider style={{width:100}} min={0} max={100} onChange={(e)=>changeProp(this.props.stateName,'padding',e+'px',3)} value={parseInt(this.state[this.props.stateName].padding.split(' ')[3])}/><span className={'unit'}>{this.state[this.props.stateName].padding.split(' ')[3]}</span>
                    </div>
                </div>
            </li>
        )
    }
}

export default MyPadding
