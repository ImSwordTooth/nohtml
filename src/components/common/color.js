import React from 'react'

import ColorPicker from 'rc-color-picker'
import 'rc-color-picker/assets/index.css';

class color extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentColor:'#000000',
            currentBackgroundColor:'#000000'
        }
    }

    changeColor = color =>{
        this.setState({
            currentColor:color.color
        })
    };

    changeBackgroundColor = color =>{
        this.setState({
            currentBackgroundColor:color.color
        })
    };

    render() {
        return (
            <div className={'color'}>
                <ColorPicker onChange={this.changeColor}>
                    <div className={'colorpicker'}>
                        <i className={'iconfont iconcolor '} style={{borderBottom:`solid 2px ${this.state.currentColor}`}}/>
                    </div>
                </ColorPicker>
                <ColorPicker onChange={this.changeBackgroundColor}>
                    <div className={'colorpicker'}>
                        <i className={'iconfont iconbackgroundcolor '} style={{borderBottom:`solid 2px ${this.state.currentBackgroundColor}`}}/>
                    </div>
                </ColorPicker>
            </div>


        )
    }
}

export default color
