import React from 'react'
import {Select} from "antd";
import './hover.less'
const {Option} = Select;


class Hover extends React.Component{

    render() {

        return (
            <div>
                <Select defaultValue={'color'} style={{width:220}}>
                    <Option className={'hoverProps'} value={'color'}><i className={'iconfont iconnocsscolor'}/>字体颜色<span>color</span></Option>
                    <Option className={'hoverProps'} value={'backgroundColor'}><i className={'iconfont iconnocssbackgroundcolor'}/>背景颜色<span>backgroundColor</span></Option>
                    <Option className={'hoverProps'} value={'fontSize'}><i className={'iconfont iconnocssfontsize'}/>字体大小<span>fontSize</span></Option>
                    <Option className={'hoverProps'} value={'fontStyle'}><i className={'iconfont iconnocssfontstyle'}/>字型<span>fontStyle</span></Option>
                    <Option className={'hoverProps'} value={'border'}><i className={'iconfont iconnocssborder'}/>边框<span>border</span></Option>
                    <Option className={'hoverProps'} value={'padding'}><i className={'iconfont iconnocsspadding'}/>内边距<span>padding</span></Option>
                    <Option className={'hoverProps'} value={'boxShadow'}><i className={'iconfont iconnocssboxshadow'}/>盒子阴影<span>boxShadow</span></Option>
                    <Option className={'hoverProps'} value={'textshadow'}><i className={'iconfont iconnocsstextshadow'}/>字体阴影<span>textShadow</span></Option>
                </Select>
            </div>
        )
    }

}


export default Hover;
