import React, {PureComponent} from 'react'
import '../css/classes.less'
import ClassesModal from "../../common/modals/classesModal";
import {Popover,Divider} from "antd";
import {updateTag} from "../../../../store/action";
import Mask from "../mask";
import {connect} from 'react-redux'

class Classes extends PureComponent{

    state = {
        display:'none',         //右键菜单的display属性，none隐藏，block显示
        rightClickItem: {         //右键菜单位置
            pageX: '',
            pageY: ''
        },
        selectedClassIndex:-1,
        rightClassIndex:-1,
        showClassesModal:false
    }

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
        const {rightClickItem,display} = this.state
        const { pageX, pageY } =rightClickItem ;
        const wp_style = {
            display
        };
        const menu_Style = {
            left: `${pageX }px`,
            top: `${pageY}px`,
            display: display,
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
        return rightClickItem == null ? '' : menu;
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
        const {selectedTag,classList,updateTag} = this.props
        this.setState({
            selectedClassIndex:index
        });
        let classesList = selectedTag.props.className || [];
        updateTag({
            prop:'props',
            innerProp:'className',
            value:classesList.concat(classList[index].className)
        })
    }

    render() {
        const {selectedTag,classList} = this.props
        const {selectedClassIndex,rightClassIndex,showClassesModal} = this.state
        return (
            <div className={'classes'}>
                <div className={'addClass'} onClick={()=>this.setState({showClassesModal:true,rightClassIndex:-1})}>
                    <i className={'iconfont iconclass'}/>
                    <span>新增类</span>
                </div>
                <Divider type={'vertical'} style={{height:'80px',margin:'0 20px'}}/>
                <div style={{position:'relative',display:'inline-block'}}>
                    {
                        JSON.stringify(selectedTag)==='{}'?<Mask title={'请先选中要添加类的元素'}/>:<></>
                    }
                    <ul className={'class_list'}>
                        {classList.map((item,index)=>{
                            return (<Popover content={<div style={item.trueStyle}>示例文字</div>} placement={'bottomLeft'}>
                                        <li key={index} className={selectedClassIndex===index?'active':''}
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

                <ClassesModal showClassesModal={showClassesModal} cancel={()=>this.setState({showClassesModal:false})} rightClassIndex={rightClassIndex} classObj={classList[rightClassIndex]}/>
                {this.getRightClickMenu()}
            </div>
        )
    }

}

function mapStateToProps(state) {
    const {selectedTag,classList} = state;
    return {selectedTag,classList}
}

function mapDispatchToProps() {
    return {
        updateTag
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Classes)
