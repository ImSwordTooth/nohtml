import React from 'react'
import '../css/classes.less'
import store from '../../../../store'
import ClassesModal from "../../common/modals/classesModal";
import {Popover} from "antd";

class Classes extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            display:'none',         //右键菜单的display属性，none隐藏，block显示
            rightClickItem: {         //右键菜单位置
                pageX: '',
                pageY: ''
            },
            selectedClassIndex:-1,
            showClassesModal:false
        });
        store.subscribe(this.listener)
    }

    listener = ()=>{
        let newState = store.getState();
        this.setState(newState)
    };

    ignore = (css)=>{
        let cssObj = Object.assign({},css);
        let ignoreProp =['width','height','top','bottom','left','right'];       //快速预览中应当忽略的css属性       TODO 使用的过程中应当再完善
        for (let i in cssObj){
            if (ignoreProp.includes(i)){
                delete cssObj[i]
            }
        }
        return cssObj;
    };

    // 自定义右键菜单内容
    getRightClickMenu = (e) => {
        const { pageX, pageY } = this.state.rightClickItem ;
        const wp_style = {
            display: this.state.display
        };
        const menu_Style = {
            left: `${pageX }px`,
            top: `${pageY}px`,
            display: this.state.display,
        };
        const menu = (
            <div className={'contextMenu_wp'} style={wp_style} onClick={()=>this.setState({display:'none'})}>
                <ul className={'contextMenu'} style={menu_Style}>
                    <li>
                        <i className={'iconfont iconlook'}/>详情</li>
                    <li>
                        <i className={'iconfont icondelete'}/> 删除</li>
                </ul>
            </div>
        );
        return this.state.rightClickItem == null ? '' : menu;
    };

    rightClick = e => {
        e.preventDefault();
        this.setState({
            display: 'block',
            rightClickItem: {
                pageX: e.pageX,
                pageY: e.pageY
            },
        });
    };

    render() {
        return (
            <div>
                <ul className={'class_list'}>
                    {this.state.classList.map((item,index)=>{
                        return (<Popover content={<div style={item.css}>示例文字</div>} placement={'bottomLeft'}>
                                    <li key={index} className={this.state.selectedClassIndex===index?'active':''}
                                        onClick={()=>this.setState({selectedClassIndex:index})}
                                        onContextMenu={(e)=>this.rightClick(e)}
                                    >
                                        <div style={this.ignore(item.css)}>示例文字</div>
                                        <span className={'className'}>{item.className}</span>
                                        <i className={'iconfont iconlook look'}/>
                                    </li>
                                </Popover>)
                    })}
                </ul>
                <span>more</span>
                <span onClick={()=>this.setState({showClassesModal:true})}>新增类</span>
                <ClassesModal showClassesModal={this.state.showClassesModal} cancel={()=>this.setState({showClassesModal:false})}/>
                {this.getRightClickMenu()}
            </div>
        )
    }

}

export default Classes
