import React from 'react'
import {Select} from "antd";
import './hover.less'
import {addHoverList, changeHoverStyle} from "../../../../store/action";
import store from '../../../../store'
import '../standard/standard.less'
const {Option} = Select;



class Hover extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            hoverList:[]
        });
        store.subscribe(this.listener)
    }

    listener = ()=>{
        let newState = store.getState();
        this.setState(newState)
    };

    addHover = (prop,compName)=>{
        import(`../props/${compName}`).then(res=>{
                changeHoverStyle({
                    prop,
                    value:this.state.nocssStyle[prop]
                });
                addHoverList({
                    prop,
                    comp:res.default
                });
        })
    };

    render() {

        return (
            <div>
                <Select defaultValue={'color'} style={{width:220}}>
                    <Option className={'hoverProps'} value={'color'} onClick={()=>this.addHover('color','myColor')}><i className={'iconfont iconnocsscolor'}/>字体颜色<span>color</span></Option>
                    <Option className={'hoverProps'} value={'backgroundColor'} onClick={()=>this.addHover('backgroundColor','myBackgroundColor')}><i className={'iconfont iconnocssbackgroundcolor'}/>背景颜色<span>backgroundColor</span></Option>
                    <Option className={'hoverProps'} value={'fontSize'} onClick={()=>this.addHover('fontSize','myFontSize')}><i className={'iconfont iconnocssfontsize'}/>字体大小<span>fontSize</span></Option>
                    <Option className={'hoverProps'} value={'fontStyle'} onClick={()=>this.addHover('fontStyle','myFontStyle')}><i className={'iconfont iconnocssfontstyle'}/>字型<span>fontStyle</span></Option>
                    <Option className={'hoverProps'} value={'border'} onClick={()=>this.addHover('border','myBorder')}><i className={'iconfont iconnocssborder'}/>边框<span>border</span></Option>
                    <Option className={'hoverProps'} value={'padding'} onClick={()=>this.addHover('padding','myPadding')}><i className={'iconfont iconnocsspadding'}/>内边距<span>padding</span></Option>
                    <Option className={'hoverProps'} value={'boxShadow'} onClick={()=>this.addHover('boxShadow','myBoxShadow')}><i className={'iconfont iconnocssboxshadow'}/>盒子阴影<span>boxShadow</span></Option>
                    <Option className={'hoverProps'} value={'textShadow'} onClick={()=>this.addHover('textShadow','myTextShadow')}><i className={'iconfont iconnocsstextshadow'}/>字体阴影<span>textShadow</span></Option>
                </Select>
                <div>
                    <ul className={'operationUl'}>
                        {Object.values(this.state.hoverList).map((Item,index)=>{
                            return <Item key={index} stateName={'hoverStyle'}/>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Hover;
