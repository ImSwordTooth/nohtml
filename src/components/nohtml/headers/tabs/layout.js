import React from 'react'
import '../css/layout.less'
import store from '../../../../store'
import { Select,Checkbox,Divider,Tag,Popover,Slider,InputNumber  } from 'antd';
import {dataSource} from "../../../../data/cssTable";
import Mask from "../mask";

const { Option } = Select;

class myLayout extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            isPosition:true,
            isDisplay:true,
            isFloat:true,
            currentDirection:'',        //当前正在编辑的方向：top、bottom、left、right
            top:{                       //三个值分别为百分比、px值、单位，下同
                percent:0,
                px:0,
                unit:'%'
            },
            bottom:{
                percent:0,
                px:0,
                unit:'%'
            },
            left:{
                percent:0,
                px:0,
                unit:'%'
            },
            right:{
                percent:0,
                px:0,
                unit:'%'
            }
        })
    }

    handleCheck = (prop,status)=>{

    }

    //修改当前正在编辑的方向
    changeCurrentDirection = (direction)=>{
        this.setState({
            currentDirection:direction
        })
    };

    //修改单位
    changeUnit = (e)=>{
        let direction = this.state.currentDirection;
        let data = Object.assign({}, this.state[direction], {unit: e});
        this.setState({
            [direction]:data
        })
    };

    //修改百分比
    changePercent = (e)=>{
        let direction = this.state.currentDirection;
        let data = Object.assign({}, this.state[direction], {percent: e});
        this.setState({
            [direction]:data
        })

    };

    //修改px值
    changePx = (e)=>{
        let direction = this.state.currentDirection;
        let data = Object.assign({}, this.state[direction], {px: e});
        this.setState({
            [direction]:data
        })
    };

    //判断当前单位，一样，就在前面加个对勾
    isCurrent = (direction,unit)=>{
        return this.state[direction].unit === unit ? <i className={'iconfont iconcurrent'}/> : null;
    };

    //弹出框的头部，用来选择单位
    titleSetting = (direction)=>{
        return (
            <div>
                <span className={'info'}>单位：</span>
                <Select defaultValue={this.state[direction].unit} style={{ width: 120,marginLeft:'10px' }} onChange={this.changeUnit}>
                    <Option value='%'>%</Option>
                    <Option value='px'>px</Option>
                </Select>
            </div>
        )
    };

    //百分比和px的设置
    setting = (direction)=>(
        <div className={'postionValue_wp'}>
            <div>
                {this.isCurrent(direction,'%')}
                <Slider defaultValue={0} style={{width:150}} value={this.state[direction].percent} onChange={this.changePercent} disabled={this.state[direction].unit !== '%'}/>
                <Tag style={{marginLeft:'10px'}}>{this.state[direction].percent}%</Tag>
            </div>
            <div>
                {this.isCurrent(direction,'px')}
                <InputNumber className={'fontsize'}
                             style={{width:150}}
                             formatter={value => `${value}px`}
                             parser={value => value.replace('px', '')}
                             defaultValue={this.state[direction].px}
                             onChange={this.changePx}
                             disabled={this.state[direction].unit !== 'px'}/>
            </div>
        </div>
    );
    render() {

        const displayList = dataSource.display.sort().map(item=>{
            return <Option value={item} title={item}>{item}</Option>
        })

        return(
            <div className={'layout'}>
                {
                    JSON.stringify(this.state.selectedTag)==='{}'?<Mask title={'请先选中要操作的元素'}/>:<></>
                }
                <div className={'layout_item'}>
                    <Checkbox checked={this.state.isPosition} onChange={(e)=>this.handleCheck('position',e)}/>
                    <span className={'info'}>positon：</span>
                    <Select defaultValue="relative" style={{ width: 120 }}>
                        <Option value="relative">relative</Option>
                        <Option value="absolute">absolute</Option>
                        <Option value="fixed">fixed</Option>
                        <Option value="sticky">sticky</Option>
                        <Option value="static">static</Option>
                    </Select>
                    <span className={'info'}>top：</span>
                    <Popover placement="bottomLeft" content={this.setting('top')} title={this.titleSetting('top')} trigger="click">
                        <Tag style={{cursor:'pointer'}} onClick={()=>this.changeCurrentDirection('top')}>0</Tag>
                    </Popover>
                    <span className={'info'}>right：</span>
                    <Popover placement="bottomLeft" content={this.setting('right')} title={this.titleSetting('right')} trigger="click">
                        <Tag style={{cursor:'pointer'}} onClick={()=>this.changeCurrentDirection('right')}>0</Tag>
                    </Popover>
                    <span className={'info'}>bottom：</span>
                    <Popover placement="bottomLeft" content={this.setting('bottom')} title={this.titleSetting('bottom')} trigger="click">
                        <Tag style={{cursor:'pointer'}} onClick={()=>this.changeCurrentDirection('bottom')}>0</Tag>
                    </Popover>
                    <span className={'info'}>left：</span>
                    <Popover placement="bottomLeft" content={this.setting('left')} title={this.titleSetting('left')} trigger="click">
                        <Tag style={{cursor:'pointer'}} onClick={()=>this.changeCurrentDirection('left')}>0</Tag>
                    </Popover>
                </div>
                <Divider type={'vertical'}/>
                <div className={'layout_item'}>
                    <Checkbox checked={this.state.isDisplay} onChange={(e)=>this.handleCheck('display',e)}/>
                    <span className={'info'}>display：</span>
                    <Select defaultValue="block" style={{ width: 150 }}
                            showSearch
                            filterOption={(input, option) =>option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }>
                        {displayList}
                    </Select>
                </div>
                <Divider type={'vertical'}/>
                <div className={'layout_item'}>
                    <Checkbox checked={this.state.isFloat} onChange={(e)=>this.handleCheck('float',e)}/>
                    <span className={'info'}>float：</span>
                    <Select defaultValue="left" style={{ width: 120 }} >
                        <Option value="left">left</Option>
                        <Option value="right">right</Option>
                    </Select>
                </div>
                <Divider type={'vertical'}/>
            </div>
        )
    }

}

export default myLayout;
