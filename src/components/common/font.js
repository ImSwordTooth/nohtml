import React from 'react'

import { Select , InputNumber } from 'antd';
const { Option } = Select;

function onChange(value) {
    console.log(`selected ${value}`);
}

function onBlur() {
    console.log('blur');
}

function onFocus() {
    console.log('focus');
}

function onSearch(val) {
    console.log('search:', val);
}

//字体及字体大小
class font extends React.Component{

    render() {
        return (
            <div>
                <Select
                    showSearch
                    style={{ width: 120 }}
                    placeholder="选择字体"
                    optionFilterProp="children"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
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
                             min={12} max={50} defaultValue={14} onChange={onChange} />
            </div>
        );
    }
}

export default font;
