import React from 'react'
import store from '../../../../store'
import ColorPicker from 'rc-color-picker'
import 'rc-color-picker/assets/index.css';
import './standard.less'
import {Slider,Select} from 'antd'

import {changeNocssStyle} from "../../../../store/action";
const {Option} = Select;
class Standard extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{

        });
        store.subscribe(this.listener)
    }

    listener = ()=>{
        let newState = store.getState();
        this.setState(newState)
    };

    getPropValue = (prop)=>{
        if (prop==='border'){
            console.log(this.state.border)
        }

        if (this.state.nocssStyle[prop]){
            return this.state.nocssStyle[prop]
        }
    }

    changeProp = (prop,value,extra)=>{
        switch (prop) {
            case 'color':
            case 'backgroundColor':
                changeNocssStyle({
                    prop,
                    value:this.colorRgba(value.color,value.alpha)
                });break;
            case 'fontSize':
                changeNocssStyle({
                    prop,
                    value:`${value}px`
                });break;
            case 'fontWeight':
            case 'fontStyle':
                changeNocssStyle({
                    prop,
                    value:this.state.nocssStyle[prop]===value?'normal':value
                });break;
            case 'textDecoration':
                changeNocssStyle({
                    prop,
                    value:this.state.nocssStyle[prop]===value?'none':value
                });break;
            case 'border':
                let border = this.state.nocssStyle.border.split(' ');
                switch (extra) {
                    case 'borderColor':
                        changeNocssStyle({
                            prop,
                            value:`${border[0]} ${border[1]} ${value}`
                        });break;
                    case 'borderStyle':
                        changeNocssStyle({
                            prop,
                            value:`${border[0]} ${value} ${border[2]}`
                        });break;
                    case 'borderWidth':
                        changeNocssStyle({
                            prop,
                            value:`${value}px ${border[1]} ${border[2]}`
                        });break;
                };break;
            case 'padding':
                let padding = this.state.nocssStyle.padding.split(' ');
                switch (extra) {
                    case 'paddingTop':
                        changeNocssStyle({
                            prop,
                            value:`${value}px ${padding[1]} ${padding[2]} ${padding[3]}`
                        });break;
                    case 'paddingRight':
                        changeNocssStyle({
                            prop,
                            value:`${padding[0]} ${value}px ${padding[2]} ${padding[3]}`
                        });break;
                    case 'paddingBottom':
                        changeNocssStyle({
                            prop,
                            value:`${padding[0]} ${padding[1]} ${value}px ${padding[3]}`
                        });break;
                    case 'paddingLeft':
                        changeNocssStyle({
                            prop,
                            value:`${padding[0]} ${padding[1]} ${padding[2]} ${value}px`
                        });break;
                };break;
            default:changeNocssStyle({prop,value})
        }
    };

    //16进制+透明度->rgba
    colorRgba = function (color,opacity) {
        if (opacity !== 100){
            // 16进制颜色值的正则
            let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            // 把颜色值变成小写
            color = color.toLowerCase();
            if (reg.test(color)) {
                // 如果只有三位的值，需变成六位，如：#fff => #ffffff
                if (color.length === 4) {
                    let colorNew = "#";
                    for (let i = 1; i < 4; i += 1) {
                        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
                    }
                    color = colorNew;
                }
                // 处理六位的颜色值，转为RGB
                var colorChange = [];
                for (let i = 1; i < 7; i += 2) {
                    colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
                }
                return `rgba(${colorChange.join(',')},${opacity/100})`;
            } else {
                return color;
            }
        } else {
            return color;
        }
    };

    render() {
        return (
            <div>
                <ul className={'operationUl'}>
                    {/*颜色*/}
                    <li id={'color'}>
                        <span className={'operateTitle'}><i className={'iconfont iconnocsscolor'}/>颜色</span>
                        <div className={'content'}>
                            <ColorPicker onChange={(e)=>this.changeProp('color',e)} defaultColor={this.getPropValue('color')}>
                                <div className={'colorpicker'}>
                                    <span className={'currentColor'} style={{backgroundColor:this.getPropValue('color')}}/>
                                    <span className={'currentColorText'}>{this.getPropValue('color')}</span>
                                </div>
                            </ColorPicker>
                        </div>
                    </li>
                    {/*背景颜色*/}
                    <li id={'backgroundColor'}>
                        <span className={'operateTitle'}><i className={'iconfont iconnocssbackgroundcolor'}/>背景颜色</span>
                        <div className={'content'}>
                            <ColorPicker onChange={(e)=>this.changeProp('backgroundColor',e)} defaultColor={this.getPropValue('backgroundColor')}>
                                <div className={'colorpicker'}>
                                    <span className={'currentColor'} style={{backgroundColor:this.getPropValue('backgroundColor')}}/>
                                    <span className={'currentColorText'}>{this.getPropValue('backgroundColor')}</span>
                                </div>
                            </ColorPicker>
                        </div>
                    </li>
                    {/*字体大小*/}
                    <li id={'fontSize'}>
                        <span className={'operateTitle'}><i className={'iconfont iconnocssfontsize'}/>字体大小</span>
                        <div className={'content'}>
                            <Slider style={{width:200}} min={12} max={100} onChange={(e)=>this.changeProp('fontSize',e)} value={parseInt(this.getPropValue('fontSize'))}/><span className={'unit'}>{this.state.nocssStyle.fontSize}</span>
                        </div>
                    </li>
                    {/*字型*/}
                    <li id={'fontStyle'}>
                        <span className={'operateTitle'}><i className={'iconfont iconnocssfontstyle'}/>字型</span>
                        <div className={'content'}>
                            <div className={'icons'}>
                                <i className={`iconfont iconbold ${this.getPropValue('fontWeight')==='bold'?'active':''}`} onClick={()=>this.changeProp('fontWeight','bold')}/>
                                <i className={`iconfont iconlighter ${this.getPropValue('fontWeight')==='lighter'?'active':''}`} onClick={()=>this.changeProp('fontWeight','lighter')}/>
                                <i className={`iconfont iconitalic ${this.getPropValue('fontStyle')==='italic'?'active':''}`} onClick={()=>this.changeProp('fontStyle','italic')}/>
                                <i className={`iconfont iconunderline ${this.getPropValue('textDecoration')==='underline'?'active':''}`} onClick={()=>this.changeProp('textDecoration','underline')}/>
                                <i className={`iconfont iconlinethrough ${this.getPropValue('textDecoration')==='line-through'?'active':''}`} onClick={()=>this.changeProp('textDecoration','line-through')}/>
                                <i className={`iconfont iconoverline ${this.getPropValue('textDecoration')==='overline'?'active':''}`} onClick={()=>this.changeProp('textDecoration','overline')}/>
                            </div>
                        </div>
                    </li>
                    {/*边框*/}
                    <li id={'border'}>
                        <span className={'operateTitle'}><i className={'iconfont iconnocssborder'}/>边框</span>
                        <div className={'content'}>
                            <div className={'items'}>
                                <Slider style={{width:100}} min={0} max={20} onChange={(e)=>this.changeProp('border',e,'borderWidth')} value={parseInt(this.state.nocssStyle.border.split(' ')[0])}/><span className={'unit'}>{this.state.nocssStyle.border.split(' ')[0]}</span>
                            </div>
                            <div className={'items'}>
                                <Select style={{width:150}} defaultValue={this.state.nocssStyle.border.split(' ')[1]} onChange={(e)=>this.changeProp('border',e,'borderStyle')}>
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
                                <ColorPicker onChange={(e)=>{this.changeProp('border',this.colorRgba(e.color,e.alpha),'borderColor')}} defaultColor={this.state.nocssStyle.border.split(' ')[2]}>
                                    <div className={'colorpicker'}>
                                        <span className={'currentColor'} style={{backgroundColor:this.state.nocssStyle.border.split(' ')[2]}}/>
                                        <span className={'currentColorText'}>{this.state.nocssStyle.border.split(' ')[2]}</span>
                                    </div>
                                </ColorPicker>
                            </div>
                        </div>
                    </li>
                    {/*内边距*/}
                    <li id={'padding'}>
                        <span className={'operateTitle'}><i className={'iconfont iconnocsspadding'}/>内边距</span>
                        <div className={'content'}>
                            <div className={'items'}>
                                <div className={'info'}>top：</div>
                                <Slider style={{width:100}} min={0} max={100} onChange={(e)=>this.changeProp('padding',e,'paddingTop')} value={parseInt(this.state.nocssStyle.padding.split(' ')[0])}/><span className={'unit'}>{this.state.nocssStyle.padding.split(' ')[0]}</span>
                            </div>
                            <div className={'items'}>
                                <div className={'info'}>right：</div>
                                <Slider style={{width:100}} min={0} max={100} onChange={(e)=>this.changeProp('padding',e,'paddingRight')} value={parseInt(this.state.nocssStyle.padding.split(' ')[1])}/><span className={'unit'}>{this.state.nocssStyle.padding.split(' ')[1]}</span>
                            </div>
                            <div className={'items'}>
                                <div className={'info'}>bottom：</div>
                                <Slider style={{width:100}} min={0} max={100} onChange={(e)=>this.changeProp('padding',e,'paddingBottom')} value={parseInt(this.state.nocssStyle.padding.split(' ')[2])}/><span className={'unit'}>{this.state.nocssStyle.padding.split(' ')[2]}</span>
                            </div>
                            <div className={'items'}>
                                <div className={'info'}>left：</div>
                                <Slider style={{width:100}} min={0} max={100} onChange={(e)=>this.changeProp('padding',e,'paddingLeft')} value={parseInt(this.state.nocssStyle.padding.split(' ')[3])}/><span className={'unit'}>{this.state.nocssStyle.padding.split(' ')[3]}</span>
                            </div>
                        </div>
                    </li>
                    {/*轮廓线*/}
                    <li id={'outline'}>
                        <span className={'operateTitle'}><i className={'iconfont iconnocssoutline'}/>轮廓线</span>
                        <div className={'content'}>

                        </div>
                    </li>
                    {/*盒子阴影*/}
                    <li id={'boxShadow'}>
                        <span className={'operateTitle'}><i className={'iconfont iconnocssboxshadow'}/>盒子阴影</span>
                        <div className={'content'}>

                        </div>
                    </li>
                    {/*字体阴影*/}
                    <li id={'textShadow'}>
                        <span className={'operateTitle'}><i className={'iconfont iconnocsstextshadow'}/>字体阴影</span>
                        <div className={'content'}>

                        </div>
                    </li>
                </ul>
            </div>
        )
    }

}

export default Standard;
