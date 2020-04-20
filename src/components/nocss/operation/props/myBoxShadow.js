import React,{PureComponent} from 'react'
import ColorPicker from "rc-color-picker";

import {changeProp,colorRgba,addProp,deleteProp} from "../../../../common/units";
import {Slider} from "antd";
import {connect} from "react-redux";

class MyBoxShadow extends PureComponent{

    render() {
        const {stateName,nocssStyle,hoverStyle} = this.props;
        const {boxShadow} = stateName==='nocssStyle' ? nocssStyle : hoverStyle;

        return(
            <li className={'boxShadow multi'}>
                <span className={'operateTitle'}><i className={'iconfont iconnocssboxshadow'}/>盒子阴影<i className={'iconfont iconadd add'} onClick={()=>addProp(stateName,'boxShadow')}/></span>
                {boxShadow.split(/(?<=rgba\(.*\)|#\w{6}),/g).map((item,index)=>{
                        return (
                            <div className={'content'} key={index}>
                                {boxShadow.split(/(?<=rgba\(.*\)|#\w{6}),/g).length>1
                                    ? <i className={'iconfont icondelete delete'} onClick={()=>deleteProp(stateName,'boxShadow',index)}/>
                                    : <></>
                                }
                                <div className={'items'}>
                                    <div className={'info'}>左右：</div>
                                    <Slider style={{width:100}} min={-50} max={50} onChange={(e)=>changeProp(stateName,'boxShadow',e+'px',0,index)} value={parseInt(item.split(' ')[0])}/><span className={'unit'}>{item.split(' ')[0]}</span>
                                </div>
                                <div className={'items'}>
                                    <div className={'info'}>上下：</div>
                                    <Slider style={{width:100}} min={-50} max={50} onChange={(e)=>changeProp(stateName,'boxShadow',e+'px',1,index)} value={parseInt(item.split(' ')[1])}/><span className={'unit'}>{item.split(' ')[1]}</span>
                                </div>
                                <div className={'items'}>
                                    <div className={'info'}>模糊：</div>
                                    <Slider style={{width:100}} min={0} max={50} onChange={(e)=>changeProp(stateName,'boxShadow',e+'px',2,index)} value={parseInt(item.split(' ')[2])}/><span className={'unit'}>{item.split(' ')[2]}</span>
                                </div>
                                <div className={'items'}>
                                    <div className={'info'}>偏移：</div>
                                    <Slider style={{width:100}} min={0} max={50} onChange={(e)=>changeProp(stateName,'boxShadow',e+'px',3,index)} value={parseInt(item.split(' ')[3])}/><span className={'unit'}>{item.split(' ')[3]}</span>
                                </div>
                                <div className={'items'}>
                                    <ColorPicker onChange={(e)=>{changeProp(stateName,'boxShadow',colorRgba(e.color,e.alpha),4,index)}} defaultColor={item.split(' ')[4]} defaultAlpha={new RegExp('(?<=\\()\\S+(?=\\))','g').exec(item.split(' ')[4])?Number(new RegExp('(?<=\\()\\S+(?=\\))','g').exec(item.split(' ')[4])[0].split(',')[3])*100:100}>
                                        <div className={'colorpicker'}>
                                            <span className={'currentColor'} style={{backgroundColor:item.split(' ')[4]}}/>
                                            <span className={'currentColorText'}>{item.split(' ')[4]}</span>
                                        </div>
                                    </ColorPicker>
                                </div>
                            </div>
                        )
                    })
                }
            </li>
        )
    }
}

function mapStateToProps(state) {
    const {nocssStyle,hoverStyle} = state;
    return {nocssStyle,hoverStyle}
}

export default connect(mapStateToProps)(MyBoxShadow)

