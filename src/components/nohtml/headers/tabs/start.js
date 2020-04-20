import React from 'react'

import '../css/start.less'
import {connect} from 'react-redux'
import {Divider, InputNumber, Select} from 'antd';
import {colorRgba, getComputedCss, rgb2hex} from "../../../../common/units";
import {updateTag} from "../../../../store/action";
import ColorPicker from 'rc-color-picker'
import 'rc-color-picker/assets/index.css';
import Mask from "../mask";

const { Option,OptGroup } = Select;

class start extends React.Component{


    shouldComponentUpdate(nextProps) {
        return JSON.stringify(nextProps.selectedTag) !== JSON.stringify(this.props.selectedTag);
    }

    //获取颜色值
    getDefaultColor = (prop)=>{
        const {selectedTag} = this.props
        if (JSON.stringify(selectedTag)!=='{}'){
            let color = getComputedCss(selectedTag,'viewStyle')[prop];
            let r,g,b,a = 100;
            let pat = new RegExp('(?<=\\()\\S+(?=\\))','g');
            if (color){
                if (pat.exec(color)){
                    let arr= new RegExp('(?<=\\()\\S+(?=\\))','g').exec(color)[0].split(',');
                    r = +arr[0];
                    g = +arr[1];
                    b = +arr[2];
                    a = +arr[3]*100;
                    color = rgb2hex({r, g, b})
                }
            }
            return {color,a}
        } else {
            return {
                color:"#000000",
                a:100
            };
        }
    };

    //获取字型
    getDefaultFontStyle = ()=>{
        const {selectedTag} = this.props
        let bold,lighter,italic,underline,lineThrough,overline
        if (JSON.stringify(selectedTag)!=='{}'){
            let css = getComputedCss(selectedTag,'viewStyle');
            const {fontWeight,fontStyle,textDecoration} = selectedTag.viewStyle
            if (fontWeight){
                bold = css.fontWeight==='bold'?'active':''
                lighter = css.fontWeight==='lighter'?'active':''
            }else {
                bold = lighter = ''
            }
            if (fontStyle){
                italic = css.fontStyle==='italic'?'active':''
            }else {
                italic = ''
            }
            if (textDecoration){
                underline = css.textDecoration==='underline'?'active':''
                lineThrough = css.textDecoration==='line-through'?'active':''
                overline = css.textDecoration==='overline'?'active':''
            }else {
                underline = lineThrough = overline = ''
            }
            return {bold,lighter,italic,underline,lineThrough,overline}
        } else {
            return {}
        }
    };

    //获取字体大小
    getDefaultFontsize = ()=>{
        const {selectedTag} = this.props
        if (JSON.stringify(selectedTag)!=='{}'){
            let css = getComputedCss(selectedTag,'viewStyle');
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
        const {selectedTag} = this.props
        if (JSON.stringify(selectedTag)!=='{}'){
            let css = getComputedCss(selectedTag,'viewStyle');
            return css.fontFamily||'选择字体';
        } else {
            return '选择字体';
        }
    };

    //修改样式
    changeProp = (prop,value)=>{
        const {selectedTag,updateTag} = this.props
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
                let css = getComputedCss(selectedTag,'viewStyle');
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
        const {color,a} = this.getDefaultColor('color')
        const {backgroundColor,backgroundA} = this.getDefaultColor('backgroundColor')
        const {bold,lighter,italic,underline,lineThrough,overline} = this.getDefaultFontStyle()
        const {selectedTag} = this.props
        return (
            <div className='start'>
                <div style={{position:'relative',width:'max-content'}}>
                    {
                        JSON.stringify(selectedTag)==='{}'?<Mask title={'请先选中要操作的元素'}/>:<></>
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

                    <Divider type={'vertical'} style={{height:'30px',margin:'0 10px'}}/>

                    <div className={'fontstyle icongroup'}>
                        <div>
                            <i className={`iconfont iconbold ${bold}` } onClick={()=>this.changeProp('fontWeight','bold')} />
                            <i className={`iconfont iconlighter ${lighter}`} onClick={()=>this.changeProp('fontWeight','lighter')} />
                            <i className={`iconfont iconitalic ${italic}`} onClick={()=>this.changeProp('fontStyle','italic')} />
                            <i className={`iconfont iconunderline ${underline}`} onClick={()=>this.changeProp('textDecoration','underline')} />
                            <i className={`iconfont iconlinethrough ${lineThrough}`} onClick={()=>this.changeProp('textDecoration','line-through')} />
                            <i className={`iconfont iconoverline ${overline}`} onClick={()=>this.changeProp('textDecoration','overline')} />
                        </div>
                    </div>

                    <Divider type={'vertical'} style={{height:'30px',margin:'0 10px'}}/>

                    <div className={'color'}>
                        <ColorPicker onChange={e=>this.changeProp('color',e)} color={color} alpha={a}>
                            <div className={'colorpicker'}>
                                <i className={'iconfont iconcolor '} style={{borderBottom:`solid 3px ${color}`}}/>
                            </div>
                        </ColorPicker>
                        <ColorPicker onChange={e=>this.changeProp('backgroundColor',e)} color={backgroundColor} alpha={backgroundA}>
                            <div className={'colorpicker'}>
                                <i className={'iconfont iconbackgroundcolor '} style={{borderBottom:`solid 3px ${backgroundColor}`}}/>
                            </div>
                        </ColorPicker>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const {selectedTag} = state;
    return {selectedTag}
}

function mapDispatchToProps() {
    return {
        updateTag
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(start)
