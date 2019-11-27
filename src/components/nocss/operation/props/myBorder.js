import React from 'react'
import ColorPicker from "rc-color-picker";
import store from '../../../../store'

import {changeProp,colorRgba} from "../common/api";
import {Select, Slider} from "antd";
const {Option} = Select;

class MyBorder extends React.Component{

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
            <li className={'border'}>
                <span className={'operateTitle'}><i className={'iconfont iconnocssborder'}/>边框</span>
                <div className={'content'}>
                    <div className={'items'}>
                        <Slider style={{width:100}} min={0} max={20} onChange={(e)=>changeProp(this.props.stateName,'border',e+'px',0)} value={parseInt(this.state[this.props.stateName].border.split(' ')[0])}/><span className={'unit'}>{this.state[this.props.stateName].border.split(' ')[0]}</span>
                    </div>
                    <div className={'items flexStart'}>
                        <Select style={{width:150}} defaultValue={this.state[this.props.stateName].border.split(' ')[1]} onChange={(e)=>changeProp(this.props.stateName,'border',e,1)}>
                            <Option className={'borderStyle'} value={'solid'}><i className={'iconfont iconsolid'}/>实线<span>solid</span></Option>
                            <Option className={'borderStyle'} value={'dashed'}><i className={'iconfont icondashed'}/>虚线<span>dashed</span></Option>
                            <Option className={'borderStyle'} value={'dotted'}><i className={'iconfont icondotted'}/>点状<span>dotted</span></Option>
                            <Option className={'borderStyle'} value={'double'}><i className={'iconfont icondouble'}/>双实线<span>double</span></Option>
                            <Option className={'borderStyle'} value={'ridge'}><i className={'iconfont iconridge'}/>凸起<span>ridge</span></Option>
                            <Option className={'borderStyle'} value={'groove'}><i className={'iconfont icongroove'}/>凹槽<span>groove</span></Option>
                            <Option className={'borderStyle'} value={'inset'}><i className={'iconfont iconinset'}/>内阴影<span>inset</span></Option>
                            <Option className={'borderStyle'} value={'outset'}><i className={'iconfont iconoutset'}/>外阴影<span>outset</span></Option>
                        </Select>
                    </div>
                    <div className={'items'}>
                        <ColorPicker onChange={(e)=>{changeProp(this.props.stateName,'border',colorRgba(e.color,e.alpha),2)}} defaultColor={this.state[this.props.stateName].border.split(' ')[2]} defaultAlpha={new RegExp('(?<=\\()\\S+(?=\\))','g').exec(this.state[this.props.stateName].border.split(' ')[2])?Number(new RegExp('(?<=\\()\\S+(?=\\))','g').exec(this.state[this.props.stateName].border.split(' ')[2])[0].split(',')[3])*100:100}>
                            <div className={'colorpicker'}>
                                <span className={'currentColor'} style={{backgroundColor:this.state[this.props.stateName].border.split(' ')[2]}}/>
                                <span className={'currentColorText'}>{this.state[this.props.stateName].border.split(' ')[2]}</span>
                            </div>
                        </ColorPicker>
                    </div>
                </div>
            </li>
        )
    }
}

export default MyBorder
