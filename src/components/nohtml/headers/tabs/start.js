import React from 'react'

import '../css/start.less'
import store from '../../../../store'
import {Divider, InputNumber, Select, Tooltip} from 'antd';
import {colorRgba, getComputedCss} from "../../../../common/units";
import {updateTag} from "../../../../store/action";
import ColorPicker from 'rc-color-picker'
import 'rc-color-picker/assets/index.css';
import Mask from "../mask";

const { Option,OptGroup } = Select;

class start extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{

        });
        store.subscribe(this.listener);
    }

    listener = () => {
        let newState = store.getState();
        this.setState(newState);
    };

    //获取颜色值
    //TODO 获取透明度
    getDefaultColor = (prop)=>{
        if (JSON.stringify(this.state.selectedTag)!=='{}'){
            return getComputedCss(this.state.selectedTag,'viewStyle')[prop]||"#000000";
        } else {
            return "#000000";
        }
    };

    //获取字型
    getDefaultFontStyle = (prop,value)=>{
        if (this.state.selectedTag!==undefined){
            if (JSON.stringify(this.state.selectedTag)!=='{}'){
                let css = getComputedCss(this.state.selectedTag,'viewStyle');
                if (this.state.selectedTag.viewStyle[prop]){
                    return css[prop]===value?'active':''
                } else {
                    return '';
                }
            } else {
                return ''
            }
        }else {
            return ''
        }
    };

    //获取字体大小
    getDefaultFontsize = ()=>{
        if (JSON.stringify(this.state.selectedTag)!=='{}'){
            let css = getComputedCss(this.state.selectedTag,'viewStyle');
            if (css.fontSize){
                return css.fontSize.replace('px','')
            } else {
                return 14;
            }
        } else {
            return 14;
        }
    };

    //获取字体
    getDefaultFont = ()=>{
        if (JSON.stringify(this.state.selectedTag)!=='{}'){
            let css = getComputedCss(this.state.selectedTag,'viewStyle');
            return css.fontFamily||'选择字体';
        } else {
            return '选择字体';
        }
    };

    //修改样式
    changeProp = (prop,value)=>{
        switch (prop) {
            case 'fontSize':{
                updateTag({
                    prop:'trueStyle',
                    innerProp:prop,
                    value:value/14*0.6+'rem'
                });
                updateTag({
                    prop:'viewStyle',
                    innerProp:prop,
                    value:value+'px'
                });
                break;
            }
            case 'fontStyle':
            case 'fontWeight':
            case 'textDecoration':{
                let css = getComputedCss(this.state.selectedTag,'viewStyle');
                if (css[prop]===value){
                    updateTag({
                        prop:'style',
                        innerProp:prop,
                        value:''
                    })
                } else {
                    updateTag({
                        prop:'style',
                        innerProp:prop,
                        value:value
                    })
                }
                break;
            }
            case 'color':
            case 'backgroundColor':{
                updateTag({
                    prop:'style',
                    innerProp:prop,
                    value:colorRgba(value.color,value.alpha)
                }) ;
                break;
            }
            default:{
                updateTag({
                    prop:'style',
                    innerProp:prop,
                    value:value
                });
            }
        }
    };

    render() {
        return (
            <div className='start'>
                <div style={{position:'relative',width:'max-content'}}>
                    {
                        JSON.stringify(this.state.selectedTag)==='{}'?<Mask title={'请先选中要操作的元素'}/>:<></>
                    }
                    <div>
                        <Select
                            showSearch
                            style={{ width: 120 }}
                            value={this.getDefaultFont()}
                            optionFilterProp="children"
                            onChange={(e)=>this.changeProp('fontFamily',e)}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <OptGroup label={'字体'}>
                                <Option value="宋体">宋体</Option>
                                <Option value="黑体">黑体</Option>
                                <Option value="微软雅黑">微软雅黑</Option>
                                <Option value="隶书">隶书</Option>
                                <Option value="楷体">楷体</Option>
                                <Option value="幼圆">幼圆</Option>
                            </OptGroup>
                            <OptGroup label={'通常字体'}>
                                <Option value="serif">serif</Option>
                                <Option value="sans-serif">sans-serif</Option>
                                <Option value="cursive">cursive</Option>
                                <Option value="fantasy">fantasy</Option>
                                <Option value="monospace">monospace</Option>
                            </OptGroup>

                        </Select>
                        <InputNumber className={'fontsize'}
                                     formatter={value => `${value}px`}
                                     parser={value => value.replace('px', '')}
                                     min={12} max={50} value={this.getDefaultFontsize()} onChange={(e)=>this.changeProp('fontSize',e)} />
                    </div>

                    <Divider type={'vertical'}/>

                    <div className={'fontstyle icongroup'}>
                        <div>
                            <i className={`iconfont iconbold ${this.getDefaultFontStyle('fontWeight','bold')}` } onClick={()=>this.changeProp('fontWeight','bold')} />
                            <i className={`iconfont iconlighter ${this.getDefaultFontStyle('fontWeight','lighter')}`} onClick={()=>this.changeProp('fontWeight','lighter')} />
                            <i className={`iconfont iconitalic ${this.getDefaultFontStyle('fontStyle','italic')}`} onClick={()=>this.changeProp('fontStyle','italic')} />
                            <i className={`iconfont iconunderline ${this.getDefaultFontStyle('textDecoration','underline')}`} onClick={()=>this.changeProp('textDecoration','underline')} />
                            <i className={`iconfont iconlinethrough ${this.getDefaultFontStyle('textDecoration','line-through')}`} onClick={()=>this.changeProp('textDecoration','line-through')} />
                            <i className={`iconfont iconoverline ${this.getDefaultFontStyle('textDecoration','overline')}`} onClick={()=>this.changeProp('textDecoration','overline')} />
                        </div>
                    </div>

                    <Divider type={'vertical'}/>

                    <div className={'color'}>
                        <ColorPicker onChange={e=>this.changeProp('color',e)} color={this.getDefaultColor('color')}>
                            <div className={'colorpicker'}>
                                <i className={'iconfont iconcolor '} style={{borderBottom:`solid 3px ${this.getDefaultColor('color')}`}}/>
                            </div>
                        </ColorPicker>
                        <ColorPicker onChange={e=>this.changeProp('backgroundColor',e)} color={this.getDefaultColor('backgroundColor')}>
                            <div className={'colorpicker'}>
                                <i className={'iconfont iconbackgroundcolor '} style={{borderBottom:`solid 3px ${this.getDefaultColor('backgroundColor')}`}}/>
                            </div>
                        </ColorPicker>
                    </div>
                </div>
            </div>
        )
    }

}

export default start
