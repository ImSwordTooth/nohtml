import React,{PureComponent} from 'react'
import ColorPicker from "rc-color-picker";
import store from '../../../../store'

import {changeProp} from "../../../../common/units";

export default class MyBackgroundColor extends PureComponent{

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
        const {backgroundColor} = this.state[stateName];

        return(
            <li className={'backgroundColor'}>
                <span className={'operateTitle'}><i className={'iconfont iconnocssbackgroundcolor'}/>背景颜色</span>
                <div className={'content'}>
                    <ColorPicker onChange={(e)=>changeProp(stateName,'backgroundColor',e)} defaultColor={backgroundColor} defaultAlpha={new RegExp('(?<=\\()\\S+(?=\\))','g').exec(backgroundColor)?Number(new RegExp('(?<=\\()\\S+(?=\\))','g').exec(backgroundColor)[0].split(',')[3])*100:100}>
                        <div className={'colorpicker'}>
                            <span className={'currentColor'} style={{backgroundColor}}/>
                            <span className={'currentColorText'}>{backgroundColor}</span>
                        </div>
                    </ColorPicker>
                </div>
            </li>
        )
    }
}
