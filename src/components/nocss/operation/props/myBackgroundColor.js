import React from 'react'
import ColorPicker from "rc-color-picker";
import store from '../../../../store'

import {changeProp} from "../common/api";

class MyBackgroundColor extends React.Component{

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
            <li id={'backgroundColor'}>
                <span className={'operateTitle'}><i className={'iconfont iconnocssbackgroundcolor'}/>背景颜色</span>
                <div className={'content'}>
                    <ColorPicker onChange={(e)=>changeProp('backgroundColor',e)} defaultColor={this.state.nocssStyle.backgroundColor} defaultAlpha={new RegExp('(?<=\\()\\S+(?=\\))','g').exec(this.state.nocssStyle.backgroundColor)?Number(new RegExp('(?<=\\()\\S+(?=\\))','g').exec(this.state.nocssStyle.backgroundColor)[0].split(',')[3])*100:100}>
                        <div className={'colorpicker'}>
                            <span className={'currentColor'} style={{backgroundColor:this.state.nocssStyle.backgroundColor}}/>
                            <span className={'currentColorText'}>{this.state.nocssStyle.backgroundColor}</span>
                        </div>
                    </ColorPicker>
                </div>
            </li>
        )
    }
}

export default MyBackgroundColor
