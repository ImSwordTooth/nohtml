import React from 'react'

import ColorPicker from 'rc-color-picker'
import 'rc-color-picker/assets/index.css';
import {updateTag} from '../../../store/action'
import store from "../../../store";

class color extends React.Component{
    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{

        });
        store.subscribe(this.listener)
    }

    listener = () => {
        let newState = store.getState();
        this.setState(newState);
    };

    getDefaultColor = (prop)=>{
        if (JSON.stringify(this.state.selectedTag)!=='{}'){
            return this.state.selectedTag.viewStyle[prop]||"#000000";
        } else {
            return "#000000";
        }
    }

    changeColor = color =>{         //修改字体颜色
        updateTag({
            prop:'style',
            innerProp:'color',
            value:this.colorRgba(color.color,color.alpha)
        })
    };

    changeBackgroundColor = color =>{       //修改背景色
        updateTag({
            prop:'style',
            innerProp:'backgroundColor',
            value:this.colorRgba(color.color,color.alpha)
        })
    };

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
            <div className={'color'}>
                <ColorPicker onChange={this.changeColor} color={this.getDefaultColor('color')}>
                    <div className={'colorpicker'}>
                        <i className={'iconfont iconcolor '} style={{borderBottom:`solid 3px ${this.getDefaultColor('color')}`}}/>
                    </div>
                </ColorPicker>
                <ColorPicker onChange={this.changeBackgroundColor} color={this.getDefaultColor('backgroundColor')}>
                    <div className={'colorpicker'}>
                        <i className={'iconfont iconbackgroundcolor '} style={{borderBottom:`solid 3px ${this.getDefaultColor('backgroundColor')}`}}/>
                    </div>
                </ColorPicker>
            </div>
        )
    }
}

export default color
