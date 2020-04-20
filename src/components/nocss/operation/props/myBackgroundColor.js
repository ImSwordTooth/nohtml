import React,{PureComponent} from 'react'
import ColorPicker from "rc-color-picker";
import {connect} from 'react-redux'

import {changeProp} from "../../../../common/units";

class MyBackgroundColor extends PureComponent{

    changeBackgroundColor = (color)=>{
        const {stateName} = this.props;
        changeProp(stateName,'backgroundColor',color)
    };

    render() {
        const {stateName,nocssStyle,hoverStyle} = this.props;
        const {backgroundColor} = stateName==='nocssStyle' ? nocssStyle : hoverStyle;

        return(
            <li className={'backgroundColor'}>
                <span className={'operateTitle'}><i className={'iconfont iconnocssbackgroundcolor'}/>背景颜色</span>
                <div className={'content'}>
                    <ColorPicker onChange={this.changeBackgroundColor} defaultColor={backgroundColor} defaultAlpha={new RegExp('(?<=\\()\\S+(?=\\))','g').exec(backgroundColor)?Number(new RegExp('(?<=\\()\\S+(?=\\))','g').exec(backgroundColor)[0].split(',')[3])*100:100}>
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

function mapStateToProps(state) {
    const {nocssStyle,hoverStyle} = state;
    return {nocssStyle,hoverStyle}
}

export default connect(mapStateToProps)(MyBackgroundColor)
