import React from 'react'
import store from '../../store'
import { Tree,Menu } from 'antd';
import './mySider.less'
import {addTag,changeCurrentTagId} from "../../store/action";

const { TreeNode } = Tree;

class mySider extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            display:'none',
            rightClickNodeTreeItem: {
                pageX: '',
                pageY: '',
                id: '',
                categoryName: '',
            },
        });
        store.subscribe(this.listener)
    }

    listener = () => {
        let newState = store.getState();
        this.setState(newState);
    };

    formatTag = (name,pid,type)=>{
        return {
            type:type,
            pid:pid,
            props:{
                dataName:name,
                children:[{
                    type:'p',
                    props:'静态文本'
                }]
            }
        }
    };

    // tree列表上右键事件
    treeNodeonRightClick = e => {
        changeCurrentTagId(e.node.props.eventKey);
        this.setState({
            display: 'block',
            rightClickNodeTreeItem: {
                pageX: e.event.pageX,
                pageY: e.event.pageY,
                id: 's',
                categoryName: 'aaa',
            },
        });
    };

    // 点击取消隐藏
    hideRight = e => {
        this.setState({
            display: 'none',
        });
    };

    createNodes = (val) => {
        let son = null;
        if (val.children){
            son = [...val.children.map(val => this.createNodes(val))];
        }
        return <TreeNode icon={<i className={`iconfont icon${val.type}`}/>} title={val.dataName} key={val.key}>{son}</TreeNode>
    };

    // 自定义右键菜单内容
    getNodeTreeRightClickMenu = () => {
        const { pageX, pageY } = { ...this.state.rightClickNodeTreeItem };
        const wp_style = {
            display: this.state.display
        };
        const menu_Style = {
            left: `${pageX }px`,
            top: `${pageY}px`,
            display: this.state.display,
        };
        const menu = (
            <div className={'contextMenu_wp'} style={wp_style} onClick={()=>this.hideRight()}>
                <ul className={'contextMenu'} style={menu_Style}>
                    <li>
                        <i className={'iconfont iconnew'}/>
                        <p>新建</p>
                        <i className={'iconfont iconrightarrow'}/>
                        <ul className={'contextMenu next'}>
                            <li onClick={()=>{addTag(this.formatTag('新建div',this.state.selectedTag,'div'))}}>
                                <i className={'iconfont icondiv'}/>
                                <p>div</p>
                            </li>
                            <li>
                                <i className={'iconfont icontext'}/>
                                <p>文本</p>
                                <i className={'iconfont iconrightarrow'}/>
                                <ul className={'contextMenu next'}>
                                    <li>
                                        <i className={'iconfont iconspan'}/>
                                        <p>span</p>
                                    </li>
                                    <li>
                                        <i className={'iconfont iconp'}/>
                                        <p>p</p>
                                    </li>
                                    <li>
                                        <i className={'iconfont icona'}/>
                                        <p>a</p>
                                    </li>
                                    <li>
                                        <i className={'iconfont iconpre'}/>
                                        <p>pre</p>
                                    </li>
                                    <li>
                                        <i className={'iconfont iconcode'}/>
                                        <p>code</p>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <i className={'iconfont iconimg'}/>
                                <p>图片</p>
                                <i className={'iconfont iconrightarrow'}/>
                                <ul className={'contextMenu next'}>
                                    <li>
                                        <i className={'iconfont iconuploadimg'}/>
                                        <p>本地</p>
                                    </li>
                                    <li>
                                        <i className={'iconfont iconnetworkimg'}/>
                                        <p>网图</p>
                                    </li>
                                    <li>
                                        <i className={'iconfont iconzip'}/>
                                        <p>base64</p>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <i className={'iconfont icontable'}/>
                                <p>表格</p>
                            </li>
                            <li>
                                <i className={'iconfont iconlist'}/>
                                <p>列表</p>
                            </li>
                            <li>
                                <i className={'iconfont iconcanvas'}/>
                                <p>画布</p>
                            </li>
                            <li>
                                <i className={'iconfont iconfavorite'}/>
                                <p>收藏</p>
                            </li>
                        </ul>
                    </li>
                    <li className={'line'}>
                        <div/>
                    </li>
                    <li>
                        <i className={'iconfont iconcopy'}/>
                        <p>复制</p>
                    </li>
                    <li>
                        <i className={'iconfont iconpaste'}/>
                        <p>粘贴</p>
                    </li>
                    <li>
                        <i className={'iconfont iconcut'}/>
                        <p>剪切</p>
                    </li>
                    <li className={'line'}>
                        <div/>
                    </li>
                    <li>
                        <i className={'iconfont iconaddfavorite'}/>
                        <p>收藏</p>
                    </li>
                    <li>
                        <i className={'iconfont iconrename'}/>
                        <p>重命名</p>
                    </li>
                </ul>
            </div>
        );
        return this.state.rightClickNodeTreeItem == null ? '' : menu;
    };

    render() {
        return(
            <div style={{position:'relative'}}>
                <Tree showIcon defaultExpandAll onSelect={(e)=>changeCurrentTagId(''+e)} onRightClick={(e)=>this.treeNodeonRightClick(e)}>
                    <TreeNode icon={<i className={'iconfont icondiv'}/>} title='总容器' key="0">
                        {this.state.tagList.children.map(val=>this.createNodes(val))}
                    </TreeNode>
                </Tree>
                {this.getNodeTreeRightClickMenu()}
            </div>
        )
    }
}

export default mySider;
