import React from 'react'
import ColorPicker from "rc-color-picker";
import store from '../../../../store'

import {changeProp} from "../common/api";

class MyColor extends React.Component{

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
                <li id={'color'}>
                    <span className={'operateTitle'}><i className={'iconfont iconnocsscolor'}/>文字颜色</span>
                    <div className={'content'}>
                        <ColorPicker onChange={(e)=>changeProp('color',e)} defaultColor={this.state.nocssStyle.color} defaultAlpha={new RegExp('(?<=\\()\\S+(?=\\))','g').exec(this.state.nocssStyle.color)?Number(new RegExp('(?<=\\()\\S+(?=\\))','g').exec(this.state.nocssStyle.color)[0].split(',')[3])*100:100}>
                            <div className={'colorpicker'}>
                                <span className={'currentColor'} style={{backgroundColor:this.state.nocssStyle.color}}/>
                                <span className={'currentColorText'}>{this.state.nocssStyle.color}</span>
                            </div>
                        </ColorPicker>
                    </div>
                </li>
        )
    }
}

export default MyColor
