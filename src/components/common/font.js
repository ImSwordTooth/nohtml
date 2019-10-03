import React from 'react'

import { Select , InputNumber,Divider } from 'antd';
const { Option } = Select;





//字体及字体大小
class font extends React.Component{

    constructor(props){
        super(props);
    }

    onChange = value=> {
        console.log(`selected ${value}`);
    };

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
                             min={12} max={50} defaultValue={14} onChange={this.onChange} />
            </div>
        );
    }
}

export default font;
