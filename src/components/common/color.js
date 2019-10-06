import React from 'react'

import ColorPicker from 'rc-color-picker'
import 'rc-color-picker/assets/index.css';
import {updateTag} from '../../store/action'
import store from "../../store";

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
            return this.state.selectedTag.style[prop]||"#000000";
        } else {
            return "#000000";
        }
    }

    changeColor = color =>{         //修改字体颜色
        updateTag({
            prop:'style',
            styleProp:'color',
            value:color.color
        })
    };

    changeBackgroundColor = color =>{       //修改背景色
        updateTag({
            prop:'style',
            styleProp:'backgroundColor',
            value:color.color
        })
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
