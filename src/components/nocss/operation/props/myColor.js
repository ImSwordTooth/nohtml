import React,{PureComponent} from 'react'
import ColorPicker from "rc-color-picker";
import store from '../../../../store'
import {changeProp} from "../../../../common/units";

export default class MyColor extends PureComponent{

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
        const {color} = this.state[stateName];

        return(
                <li className={'color'}>
                    <span className={'operateTitle'}><i className={'iconfont iconnocsscolor'}/>文字颜色</span>
                    <div className={'content'}>
                        <ColorPicker onChange={(e)=>changeProp(stateName,'color',e)} defaultColor={color} defaultAlpha={new RegExp('(?<=\\()\\S+(?=\\))','g').exec(color)?Number(new RegExp('(?<=\\()\\S+(?=\\))','g').exec(color)[0].split(',')[3])*100:100}>
                            <div className={'colorpicker'}>
                                <span className={'currentColor'} style={{backgroundColor:color}}/>
                                <span className={'currentColorText'}>{color}</span>
                            </div>
                        </ColorPicker>
                    </div>
                </li>
        )
    }
}
