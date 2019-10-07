import React from 'react'
import store from '../../store'
import {Tree, Popover, Input, message} from 'antd';
import './mySider.less'
import {addTag,changeCurrentTag,updateTag,changeDrawer,changeHoveredTag} from "../../store/action";
import {TableModal} from "../common/modals/tableModal";
import {ImageModal} from "../common/modals/imageModal";

const { TreeNode } = Tree;

class mySider extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            display:'none',         //右键菜单的display属性，none隐藏，block显示
            rightClickNodeTreeItem: {         //右键菜单位置
                pageX: '',
                pageY: ''
            },
            reNameVisible:false,        //重命名气泡菜单
            showTableModal:false,
            showImageModal:false,       //图片插入模态框
            imageModalTitle:'',         //图片插入模态框标题
        });
        store.subscribe(this.listener);
    }

    listener = () => {
        let newState = store.getState();
        this.setState(newState);
    };

    //禁止冒泡和默认事件
    stopDefault = (e)=>{
        e.cancelBubble=true;
        e.stopPropagation();
    };

    // 新建标签格式化
    formatTag = (type,name)=>{
        let selectTag = this.state.selectedTag;
        return {
            type:type,
            pid:selectTag.key,
            key:selectTag.willCreateKey,
            dataName:name,
            content:`新建${type}`,
            style:{},
            props:{},
            children:[]
        }
    };

    //tree列表上单击事件
    treeNodeonClick = e =>{
        if(e.toString()){
            changeCurrentTag(e.toString());
        }
        if (!this.state.showDrawer){
            changeDrawer(true)
        }
    };

    // tree列表上右键事件
    treeNodeonRightClick = e => {
        e.node.onSelect(e.event);       //右击时也触发单击的事件
        changeCurrentTag(e.node.props.eventKey);
        this.setState({
            display: 'block',
            rightClickNodeTreeItem: {
                pageX: e.event.pageX,
                pageY: e.event.pageY
            },
        });
    };

    // 点击取消隐藏
    hideRight = e => {
        this.setState({
            display: 'none',
        });
    };

    //根据json字符串动态生成树节点
    createNodes = (val) => {
        let son = null;
        if (val.children){
            son = [...val.children.map(val => this.createNodes(val))];
        }
        return <TreeNode className={`${this.state.selectedTag.key===val.key}?'ant-tree-node-selected':''`} icon={<i className={`iconfont icon${val.type}`} onClick={(e)=>this.treeNodeonClick(e)}/>} title={val.dataName} key={val.key}>{son}</TreeNode>
    };


    handleVisibleChange = reNameVisible => {
        this.setState({ reNameVisible });
    };

    //js点击上传input
    clickUpload = ()=>{
        document.getElementById('uploadLocalImg_Sider').click();
    };

    //上传图片
    handleUploadImage = ()=>{
        let that = this;
        let file = document.getElementById('uploadLocalImg_Sider').files[0];
        if (!file || !window.FileReader) { // 看支持不支持FileReader
            message.warn('您的浏览器不支持FileReader本地上传');
            return
        }
        if (/^image/.test(file.type)) {
            let reader = new FileReader(); // 创建一个reader
            reader.readAsDataURL(file); // 将图片将转成 base64 格式
            reader.onloadend = function () { // 读取成功后的回调
                message.success('上传成功');
                console.log(this.result)
                let selectTag = that.state.selectedTag;
                addTag({
                    type:'img',
                    pid:selectTag.key,
                    key:selectTag.willCreateKey,
                    dataName:'新建img',
                    content:'',
                    style:{},
                    props:{
                      src:this.result
                    },
                    // children:[]
                })
            }
        }
    };

    //重命名
    reName = (e)=>{
        updateTag({
            prop:'dataName',
            value:e.target.value
        })
    };

    reNameTitle = ()=>{
        let selectTag = this.state.selectedTag.dataName;
        return (
            <div className={'reNameTitle'}>
                <span className={'title'}>{selectTag}</span>
                <span className={'cancel'} onClick={()=>{this.setState({reNameVisible:false})}}>取消</span>
            </div>
        )
    };

    //重命名弹出框内容
     reNameContent = ()=>{
         let selectTag = this.state.selectedTag;
         return (
             <div>
                 <Input value={selectTag.dataName} onChange={this.reName} onClick={(e)=>this.stopDefault(e)}/>
             </div>
         );
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
                    <li className={`${this.state.selectedTag.children?'':'disable'}`}>
                        <i className={'iconfont iconnew'}/>
                        <p>新建</p>
                        <i className={'iconfont iconrightarrow'}/>
                        <ul className={'contextMenu next'}>
                            <li onClick={()=>{addTag(this.formatTag('div','新建div'))}}>
                                <i className={'iconfont icondiv'}/>
                                <p>div</p>
                            </li>
                            <li onClick={()=>{addTag(this.formatTag('button','新建button'))}}>
                                <i className={'iconfont iconbutton'}/>
                                <p>按钮</p>
                            </li>
                            <li>
                                <i className={'iconfont icontext'}/>
                                <p>文本</p>
                                <i className={'iconfont iconrightarrow'}/>
                                <ul className={'contextMenu next'}>
                                    <li onClick={()=>{addTag(this.formatTag('span','新建span'))}}>
                                        <i className={'iconfont iconspan'}/>
                                        <p>span</p>
                                    </li>
                                    <li onClick={()=>{addTag(this.formatTag('p','新建p'))}}>
                                        <i className={'iconfont iconp'}/>
                                        <p>p</p>
                                    </li>
                                    <li onClick={()=>{addTag(this.formatTag('a','新建a'))}}>
                                        <i className={'iconfont icona'}/>
                                        <p>a</p>
                                    </li>
                                    <li onClick={()=>{addTag(this.formatTag('pre','新建pre'))}}>
                                        <i className={'iconfont iconpre'}/>
                                        <p>pre</p>
                                    </li>
                                    <li onClick={()=>{addTag(this.formatTag('code','新建code'))}}>
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
                                    <li onClick={()=>this.clickUpload()}>
                                        <i className={'iconfont iconuploadimg'}/>
                                        <p>本地</p>
                                        <input type="file" hidden onChange={()=>this.handleUploadImage()} id={'uploadLocalImg_Sider'} accept="image/*"/>
                                    </li>
                                    <li onClick={()=>this.setState({showImageModal:true,imageModalTitle:'网络图片'})}>
                                        <i className={'iconfont iconnetworkimg'}/>
                                        <p>网络图片</p>
                                    </li>
                                    <li onClick={()=>this.setState({showImageModal:true,imageModalTitle:'base64编码'})}>
                                        <i className={'iconfont iconzip'}/>
                                        <p>base64</p>
                                    </li>
                                </ul>
                            </li>
                            <li onClick={()=>this.setState({showTableModal:true})}>
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
                            <li className={'line'}>
                                <div/>
                            </li>
                            <li>
                                <i className={'iconfont iconinput'}/>
                                <p>文本框</p>
                                <i className={'iconfont iconrightarrow'}/>
                                <ul className={'contextMenu next'}>
                                    <li>
                                        <i className={'iconfont iconpassword'}/>
                                        <p>密码文本</p>
                                    </li>
                                    <li>
                                        <i className={'iconfont iconnumber'}/>
                                        <p>数字文本</p>
                                    </li>
                                </ul>
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
                    <li onClick={(e)=>this.stopDefault(e)}>
                        <Popover title={this.reNameTitle()} content={this.reNameContent()}
                                 visible={this.state.reNameVisible}
                                 trigger={'click'}
                                 placement="rightTop"
                                 onVisibleChange={this.handleVisibleChange}
                                 onClick={(e)=>this.stopDefault(e)}>
                            <div className={'reName_wp'}>
                                <i className={'iconfont iconrename'}/>
                                <p>重命名</p>
                            </div>
                        </Popover>,

                    </li>
                </ul>
            </div>
        );
        return this.state.rightClickNodeTreeItem == null ? '' : menu;
    };

    render() {
        return(
            <div style={{position:'relative'}}>
                <Tree showIcon defaultExpandAll
                      onSelect={(e)=>this.treeNodeonClick(e)}
                      onMouseEnter={(e)=>{changeHoveredTag(e.node.props.eventKey)}}
                      onMouseLeave={()=>{changeHoveredTag('')}}
                      onRightClick={(e)=>this.treeNodeonRightClick(e)}>
                    <TreeNode icon={<i className={'iconfont icondiv'}/>} title='总容器' key="0">
                        {this.state.tagList.children.map(val=>this.createNodes(val))}
                    </TreeNode>
                </Tree>
                {this.getNodeTreeRightClickMenu()}
                <TableModal showTableModal={this.state.showTableModal} cancel={()=>this.setState({showTableModal:false})}/>
                <ImageModal showImageModal={this.state.showImageModal} cancel={()=>this.setState({showImageModal:false})} imageModalTitle={this.state.imageModalTitle}/>
            </div>
        )
    }
}

export default mySider;
