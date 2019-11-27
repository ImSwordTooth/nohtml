import React from 'react'
import ColorPicker from "rc-color-picker";
import store from '../../../../store'

import {changeProp, getProp} from "../common/api";

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
            <li className={'backgroundColor'}>
                <span className={'operateTitle'}><i className={'iconfont iconnocssbackgroundcolor'}/>背景颜色</span>
                <div className={'content'}>
                    <ColorPicker onChange={(e)=>changeProp(this.props.stateName,'backgroundColor',e)} defaultColor={this.state[this.props.stateName].backgroundColor} defaultAlpha={new RegExp('(?<=\\()\\S+(?=\\))','g').exec(this.state[this.props.stateName].backgroundColor)?Number(new RegExp('(?<=\\()\\S+(?=\\))','g').exec(this.state[this.props.stateName].backgroundColor)[0].split(',')[3])*100:100}>
                        <div className={'colorpicker'}>
                            <span className={'currentColor'} style={{backgroundColor:this.state[this.props.stateName].backgroundColor}}/>
                            <span className={'currentColorText'}>{this.state[this.props.stateName].backgroundColor}</span>
                        </div>
                    </ColorPicker>
                </div>
            </li>
        )
    }
}

export default MyBackgroundColor
