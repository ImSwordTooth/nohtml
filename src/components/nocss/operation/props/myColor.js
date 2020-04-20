import React,{PureComponent} from 'react'
import ColorPicker from "rc-color-picker";
import {changeProp} from "../../../../common/units";
import {connect} from "react-redux";

class MyColor extends PureComponent{


    render() {
        const {stateName,nocssStyle,hoverStyle} = this.props;
        const {color} = stateName==='nocssStyle' ? nocssStyle : hoverStyle;

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

function mapStateToProps(state) {
    const {nocssStyle,hoverStyle} = state;
    return {nocssStyle,hoverStyle}
}

export default connect(mapStateToProps)(MyColor)
