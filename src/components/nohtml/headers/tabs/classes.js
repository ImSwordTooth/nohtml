import React from 'react'
import '../css/classes.less'
import store from '../../../../store'
import ClassesModal from "../../common/modals/classesModal";
import {Popover,Divider} from "antd";
import {updateTag} from "../../../../store/action";
import Mask from "../mask";

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
            rightClassIndex:-1,
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
                    <li onClick={()=>this.setState({showClassesModal:true})}>
                        <i className={'iconfont iconlook'}/>详情</li>
                    <li>
                        <i className={'iconfont icondelete'}/>删除</li>
                </ul>
            </div>
        );
        return this.state.rightClickItem == null ? '' : menu;
    };

    rightClick = (e,index) => {
        e.preventDefault();
        this.setState({
            display: 'block',
            rightClickItem: {
                pageX: e.pageX,
                pageY: e.pageY
            },
            rightClassIndex:index
        });
    };

    chooseClass = (index)=>{
        this.setState({
            selectedClassIndex:index
        });
        let classList = this.state.selectedTag.props.className || [];
        updateTag({
            prop:'props',
            innerProp:'className',
            value:classList.concat(this.state.classList[index].className)
        })
    }

    render() {
        return (
            <div className={'classes'}>
                <div className={'addClass'} onClick={()=>this.setState({showClassesModal:true,rightClassIndex:-1})}>
                    <i className={'iconfont iconclass'}/>
                    <span>新增类</span>
                </div>
                <Divider type={'vertical'} style={{height:'80px',margin:'0 20px'}}/>
                <div style={{position:'relative',display:'inline-block'}}>
                    {
                        JSON.stringify(this.state.selectedTag)==='{}'?<Mask title={'请先选中要添加类的元素'}/>:<></>
                    }
                    <ul className={'class_list'}>
                        {this.state.classList.map((item,index)=>{
                            return (<Popover content={<div style={item.trueStyle}>示例文字</div>} placement={'bottomLeft'}>
                                        <li key={index} className={this.state.selectedClassIndex===index?'active':''}
                                            onClick={()=>this.chooseClass(index)}
                                            onContextMenu={(e)=>this.rightClick(e,index)}
                                        >
                                            <div style={this.ignore(item.trueStyle)}>示例文字</div>
                                            <span className={'className'}>{item.className}</span>
                                        </li>
                                    </Popover>)
                        })}
                    </ul>
                </div>

                <ClassesModal showClassesModal={this.state.showClassesModal} cancel={()=>this.setState({showClassesModal:false})} rightClassIndex={this.state.rightClassIndex} classObj={this.state.classList[this.state.rightClassIndex]}/>
                {this.getRightClickMenu()}
            </div>
        )
    }

}

export default Classes
