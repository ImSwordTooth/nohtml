import React from 'react'
import ColorPicker from "rc-color-picker";
import store from '../../../../store'

import {changeProp, getProp} from "../common/api";

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
                <li className={'color'}>
                    <span className={'operateTitle'}><i className={'iconfont iconnocsscolor'}/>文字颜色</span>
                    <div className={'content'}>
                        <ColorPicker onChange={(e)=>changeProp(this.props.stateName,'color',e)} defaultColor={this.state[this.props.stateName].color} defaultAlpha={new RegExp('(?<=\\()\\S+(?=\\))','g').exec(this.state[this.props.stateName].color)?Number(new RegExp('(?<=\\()\\S+(?=\\))','g').exec(this.state[this.props.stateName].color)[0].split(',')[3])*100:100}>
                            <div className={'colorpicker'}>
                                <span className={'currentColor'} style={{backgroundColor:this.state[this.props.stateName].color}}/>
                                <span className={'currentColorText'}>{this.state[this.props.stateName].color}</span>
                            </div>
                        </ColorPicker>
                    </div>
                </li>
        )
    }
}

export default MyColor
