import React from 'react'

import { Select , InputNumber,Divider } from 'antd';
import {updateTag} from "../../store/action";
import store from "../../store";

const { Option,OptGroup } = Select;





//字体及字体大小
class font extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{

        });
        store.subscribe(this.listener)
    }

    listener = () => {
        let newState = store.getState();
        this.setState(newState);
    };

    changeFontSize = value => {
        updateTag({
            prop:'trueStyle',
            innerProp:'fontSize',
            value:value/14*0.6+'rem'
        });
        updateTag({
            prop:'viewStyle',
            innerProp:'fontSize',
            value:value+'px'
        });
    };

    changeFont = value => {
        updateTag({
            prop:'style',
            innerProp:'fontFamily',
            value:value
        });
    };

    getDefaultFontsize = ()=>{
        if (JSON.stringify(this.state.selectedTag)!=='{}'){
            if (this.state.selectedTag.viewStyle.fontSize){
                return this.state.selectedTag.viewStyle.fontSize.replace('px','')
            } else {
                return 14;
            }
        } else {
            return 14;
        }
    };

    getDefaultFont = ()=>{
        if (JSON.stringify(this.state.selectedTag)!=='{}'){
            return this.state.selectedTag.viewStyle.fontFamily||'选择字体';
        } else {
            return '选择字体';
        }
    }

    render() {
        return (
            <div>
                <Select
                    showSearch
                    style={{ width: 120 }}
                    value={this.getDefaultFont()}
                    optionFilterProp="children"
                    onChange={this.changeFont}
                    dropdownRender={menu => (
                        <div>
                            {menu}
                            <Divider style={{ margin: '4px 0' }} />
                            <div className={'uploadfont'}>
                               <i className={'iconfont iconuploadfont'}/>
                               <span>上传字体</span>
                            </div>
                        </div>
                    )}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <OptGroup label={'我的字体'}>
                        <Option value="0">0</Option>
                    </OptGroup>
                    <OptGroup label={'中文字体'}>
                        <Option value="宋体">宋体</Option>
                        <Option value="黑体">黑体</Option>
                        <Option value="微软雅黑">微软雅黑</Option>
                        <Option value="隶书">隶书</Option>
                        <Option value="楷体">楷体</Option>
                        <Option value="幼圆">幼圆</Option>
                    </OptGroup>
                    <OptGroup label={'英文字体'}>
                        <Option value="1">111</Option>
                        <Option value="2">222</Option>
                        <Option value="3">333</Option>
                        <Option value="4">444</Option>
                    </OptGroup>

                </Select>
                <InputNumber className={'fontsize'}
                             formatter={value => `${value}px`}
                             parser={value => value.replace('px', '')}
                             min={12} max={50} value={this.getDefaultFontsize()} onChange={this.changeFontSize} />
            </div>
        );
    }
}

export default font;
