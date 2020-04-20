import React,{PureComponent} from 'react'
import {changeProp} from "../../../../common/units";
import {Slider} from "antd";
import {connect} from "react-redux";

class MyFontSize extends PureComponent{

    render() {
        const {stateName,nocssStyle,hoverStyle} = this.props;
        const {fontSize} = stateName==='nocssStyle' ? nocssStyle : hoverStyle;

        return(
            <li className={'fontSize'}>
                <span className={'operateTitle'}><i className={'iconfont iconnocssfontsize'}/>字体大小</span>
                <div className={'content'}>
                    <Slider style={{width:200}} min={12} max={100} onChange={(e)=>changeProp(stateName,'fontSize',e)} value={parseInt(fontSize)}/><span className={'unit'}>{fontSize}</span>
                </div>
            </li>
        )
    }
}

function mapStateToProps(state) {
    const {nocssStyle,hoverStyle} = state;
    return {nocssStyle,hoverStyle}
}

export default connect(mapStateToProps)(MyFontSize)
