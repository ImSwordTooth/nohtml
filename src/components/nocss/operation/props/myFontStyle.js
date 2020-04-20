import React,{PureComponent} from 'react'
import {changeProp} from "../../../../common/units";
import {connect} from "react-redux";

class MyFontStyle extends PureComponent{

    render() {
        const {stateName,nocssStyle,hoverStyle} = this.props;
        const {fontWeight,fontStyle,textDecoration} = stateName==='nocssStyle' ? nocssStyle : hoverStyle;

        return(
            <li className={'fontStyle'}>
                <span className={'operateTitle'}><i className={'iconfont iconnocssfontstyle'}/>字型</span>
                <div className={'content'}>
                    <div className={'icons'}>
                        <i className={`iconfont iconbold ${fontWeight==='bold'?'active':''}`} onClick={()=>changeProp(stateName,'fontWeight',fontWeight==='bold'?'normal':'bold')}/>
                        <i className={`iconfont iconlighter ${fontWeight==='lighter'?'active':''}`} onClick={()=>changeProp(stateName,'fontWeight',fontWeight==='lighter'?'normal':'lighter')}/>
                        <i className={`iconfont iconitalic ${fontStyle==='italic'?'active':''}`} onClick={()=>changeProp(stateName,'fontStyle',fontStyle==='italic'?'normal':'italic')}/>
                        <i className={`iconfont iconunderline ${textDecoration==='underline'?'active':''}`} onClick={()=>changeProp(stateName,'textDecoration',textDecoration==='underline'?'none':'underline')}/>
                        <i className={`iconfont iconlinethrough ${textDecoration==='line-through'?'active':''}`} onClick={()=>changeProp(stateName,'textDecoration',textDecoration==='line-through'?'none':'line-through')}/>
                        <i className={`iconfont iconoverline ${textDecoration==='overline'?'active':''}`} onClick={()=>changeProp(stateName,'textDecoration',textDecoration==='overline'?'none':'overline')}/>
                    </div>
                </div>
            </li>
        )
    }
}

function mapStateToProps(state) {
    const {nocssStyle,hoverStyle} = state;
    return {nocssStyle,hoverStyle}
}

export default connect(mapStateToProps)(MyFontStyle)

