import React from 'react'

import { Select , InputNumber,Divider } from 'antd';
import {updateTag} from "../../store/action";
import store from "../../store";

const { Option } = Select;





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

    onChange = value=> {
        updateTag({
            prop:'style',
            styleProp:'fontSize',
            value:value
        })
        console.log(`selected ${value}`);
    };

    getDefaultFontsize = ()=>{
        if (JSON.stringify(this.state.selectedTag)!=='{}'){
            return this.state.selectedTag.style.fontSize||14;
        } else {
            return 14;
        }
    }

    render() {
        return (
            <div>
                <Select
                    showSearch
                    style={{ width: 120 }}
                    placeholder="选择字体"
                    optionFilterProp="children"
                    dropdownRender={menu => (
                        <div>
                            {menu}
                            <Divider style={{ margin: '4px 0' }} />
                            <div style={{ padding: '8px', cursor: 'pointer' }}>
                                Add item
                            </div>
                        </div>
                    )}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                </Select>
                <InputNumber className={'fontsize'}
                             formatter={value => `${value}px`}
                             parser={value => value.replace('px', '')}
                             min={12} max={50} value={this.getDefaultFontsize()} onChange={this.onChange} />
            </div>
        );
    }
}

export default font;
