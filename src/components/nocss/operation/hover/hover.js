import React,{PureComponent} from 'react'
import {Select} from "antd";
import './hover.less'
import {connect} from 'react-redux'
import {addHoverList, changeHoverStyle} from "../../../../store/action";
import '../standard/standard.less'
const {Option} = Select;

class Hover extends PureComponent{

    state = {
        optionList:[
            {
                value:'color',
                icon:'iconnocsscolor',
                text:'字体颜色',
                EnText:'color'
            },
            {
                value:'backgroundColor',
                icon:'iconnocssbackgroundcolor',
                text:'背景颜色',
                EnText:'backgroundColor'
            },
            {
                value:'fontSize',
                icon:'iconnocssfontsize',
                text:'字体大小',
                EnText:'fontSize'
            },
            {
                value:'fontStyle',
                icon:'iconnocssfontstyle',
                text:'字型',
                EnText:'fontStyle'
            },
            {
                value:'border',
                icon:'iconnocssborder',
                text:'边框',
                EnText:'border'
            },
            {
                value:'padding',
                icon:'iconnocsspadding',
                text:'内边距',
                EnText:'padding'
            },
            {
                value:'boxShadow',
                icon:'iconnocssboxshadow',
                text:'盒子阴影',
                EnText:'boxShadow'
            },
            {
                value:'textShadow',
                icon:'iconnocsstextshadow',
                text:'字体阴影',
                EnText:'textShadow'
            },
            {
                value:'transform',
                icon:'iconnocsstransform',
                text:'变形',
                EnText:'transform'
            },
        ]
    };

    addHover = (prop,compName)=>{
        const {nocssStyle,changeHoverStyle,addHoverList} = this.props;
        import(`../props/${compName}`).then(res=>{
                changeHoverStyle({
                    prop,
                    value:nocssStyle[prop]
                });
                addHoverList({
                    prop,
                    comp:res.default
                });
        })
    };

    handleClick = (e)=>{
        let value = e.key;
        this.addHover(value,value.replace(/^[a-zA-Z]{1}/g,($1)=>'my'+$1.toUpperCase()));
    };

    render() {
        const {hoverList} = this.props;
        const {optionList} = this.state;

        return (
            <div>
                <span>添加：</span>
                <Select defaultValue={'color'} style={{width:220}}>
                    {
                        optionList.map((item,index)=>{
                            return <Option key={index} className={'hoverProps'} value={item.value} onClick={this.handleClick}><i className={`iconfont ${item.icon}`}/>{item.text}<span>{item.EnText}</span></Option>
                        })
                    }
                </Select>
                <div>
                    <ul className={'operationUl'}>
                        {Object.values(hoverList).map((Item,index)=>{
                            return <Item key={index} stateName={'hoverStyle'}/>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {nocssStyle,hoverList} = state;
    return {nocssStyle,hoverList}
}

function mapDispatchToProps() {
    return{
        addHoverList,
        changeHoverStyle
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Hover);
