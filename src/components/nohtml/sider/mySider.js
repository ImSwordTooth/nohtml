import React from 'react'
import store from '../../../store'
import {Tree, Popover, Input, message,Popconfirm} from 'antd';
import './mySider.less'
import {
    addTag,
    changeCurrentTag,
    updateTag,
    changeDrawer,
    changeHoveredTag,
    deleteTag,
    dropTag,
    reSetTag
} from "../../../store/action";
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
            iconName:'icon'+type,
            content:`新建${type}`,
            trueStyle:{},
            viewStyle:{},
            props:{},
            children:[]
        }
    };

    formatImage = (name,src) =>{
        let selectTag = this.state.selectedTag;
        this.setState({
            showImageModal:false
        });
        return {
            type:'img',
            pid:selectTag.key,
            key:selectTag.willCreateKey,
            dataName:name,
            iconName:'iconimg',
            trueStyle:{},
            viewStyle:{},
            props:{
                src
            }
        }
    };

    formatTable = (arr,className)=>{
        let selectTag = this.state.selectedTag;
        this.setState({
            showTableModal:false
        });

        //确定tr标签
        let trs = new Array(arr.length);
        arr.forEach((item,index)=>{
            trs[index] = Object.assign({},{
                type:'tr',
                pid:selectTag.willCreateKey+'-0',
                key:`${selectTag.willCreateKey}-0-${index}`,
                dataName:`新建tr${index+1}`,
                iconName:'icontr',
                trueStyle:{},
                viewStyle:{},
                props:{},
                children:[]
            })
        });

        //tr标签的第一个，在其children中添加th标签
        arr.forEach((item,index)=>{
            trs[0].children.push({
                type:'th',
                pid:trs[0].key,
                key:`${trs[0].key}-${index}`,
                dataName:`表头${index+1}：${item}`,
                iconName:'iconth',
                content:item,
                trueStyle:{},
                viewStyle:{},
                props:{},
                children:[]
            })
        });


        //从第二个开始遍历tr标签，添加td标签
        for (let i=1;i<trs.length;i++){
            trs[i].children.push(...arr.map((item,index)=>{
                return {
                    type:'td',
                    pid:trs[i].key,
                    key:`${trs[i].key}-${index}`,
                    dataName:`数据${arr.length*i+index}`,
                    iconName:'icontd',
                    content:`数据${arr.length*i+index}`,
                    trueStyle:{},
                    viewStyle:{},
                    props:{},
                    children:[]
                }
            }))
        }

        return {
            type:'table',
            pid:selectTag.key,
            key:selectTag.willCreateKey,
            dataName:'新建table',
            iconName:'icontable',
            trueStyle:{},
            viewStyle:{},
            props:{
                className:className
            },
            children: [
                {
                    type:'tbody',
                    pid:selectTag.willCreateKey,
                    key:selectTag.willCreateKey+'-0',
                    dataName:'新建tbody',
                    iconName:'icontbody',
                    trueStyle:{},
                    viewStyle:{},
                    props:{},
                    children:trs
                }
            ]
        }
    };

    formatInput = (type)=>{
        let selectTag = this.state.selectedTag;
        let dataName = '';
        let iconName = '';
        switch (type) {
            case 'text':dataName = '新建text文本框';iconName = 'iconinput';break;
            case 'password':dataName = '新建password文本框';iconName = 'iconpassword';break;
            case 'number':dataName = '新建number文本框';iconName = 'iconnumber';break;
            case 'checkbox':dataName = '新建复选框';iconName = 'iconcheckbox';break;
            case 'radio':dataName = '新建单选框';iconName = 'iconradio';break;
            default:dataName = '新建text文本框';iconName = 'iconinput';
        }
        return {
            type:'input',
            pid:selectTag.key,
            key:selectTag.willCreateKey,
            dataName,
            iconName,
            trueStyle:{},
            viewStyle:{},
            props:{
                type
            }
        }
    };

    //tree列表上单击事件
    treeNodeonClick = e =>{
        if(e.toString()){
            changeCurrentTag(e.toString());
        }
        if (!this.state.showDrawer){
            //此处先把hoverTag变成空
            changeHoveredTag('');
            changeDrawer(true);
            // 右侧抽屉出来之后再置为本来的key，使蒙版重新计算一次，就不会因抽屉的出现而导致蒙版错位
            // setTimeout(()=>changeHoveredTag(e.toString()),1000);        //此处有一些小bug
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
    hideRight = () => {
        this.setState({
            display: 'none',
        });
    };

    //根据json字符串动态生成树节点
    createNodes = (val) => {
        // if (val.type==='img'){
        //     console.log(val)
        // }
        let son = null;
        if (val.children){
            son = [...val.children.map(val => this.createNodes(val))];
        }
        return <TreeNode className={`${this.state.selectedTag.key===val.key}?'ant-tree-node-selected':''`} icon={<i className={`iconfont ${val.iconName}`} onClick={(e)=>this.treeNodeonClick(e)}/>} title={val.dataName} key={val.key}>{son}</TreeNode>
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
                addTag(that.formatImage(file.name,this.result))
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

     drop = (e)=>{
         reSetTag();
         let isSelected = false;
         if (JSON.stringify(this.state.selectedTag) !== '{}'){
             if (this.state.selectedTag.key === e.dragNodesKeys[e.dragNodesKeys.length-1]){
                 isSelected = true;
             }
         }
         // if (e.node.props.dragOver){        //直接拖拽到目标上
             dropTag({
                 dropOver:e.node.props.dragOver,
                 originKey:e.dragNodesKeys,
                 targetKey:e.node.props.eventKey,
                 dropPosition:e.dropPosition,
                 // dropPos:e.node.props.pos.split('-'),
                 isSelected
             })
         // }else{

             // dropTag({
             //     dropOver: false,
             //     originKey:e.dragNodesKeys,
             //     targetKey:
             // })
         // }
         // console.log(e.event);
         // console.log(this.state);
         // console.log(e.dragNode);
         // console.log(e.dragNodesKeys);      //被拖拽的对象的key的列表，直接包含了节点和节点下的children
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
                                <i className={'iconfont iconh'}/>
                                <p>标题</p>
                                <i className={'iconfont iconrightarrow'}/>
                                <ul className={'contextMenu next'}>
                                    <li onClick={()=>{addTag(this.formatTag('h1','新建h1'))}}>
                                        <i className={'iconfont iconh1'}/>
                                        <p>一级标题</p>
                                    </li>
                                    <li onClick={()=>{addTag(this.formatTag('h2','新建h2'))}}>
                                        <i className={'iconfont iconh2'}/>
                                        <p>二级标题</p>
                                    </li>
                                    <li onClick={()=>{addTag(this.formatTag('h3','新建h3'))}}>
                                        <i className={'iconfont iconh3'}/>
                                        <p>三级标题</p>
                                    </li>
                                    <li onClick={()=>{addTag(this.formatTag('h4','新建h4'))}}>
                                        <i className={'iconfont iconh4'}/>
                                        <p>四级标题</p>
                                    </li>
                                    <li onClick={()=>{addTag(this.formatTag('h5','新建h5'))}}>
                                        <i className={'iconfont iconh5'}/>
                                        <p>五级标题</p>
                                    </li>
                                    <li onClick={()=>{addTag(this.formatTag('h6','新建h6'))}}>
                                        <i className={'iconfont iconh6'}/>
                                        <p>六级标题</p>
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
                                    <li onClick={()=>addTag(this.formatInput('text'))}>
                                        <i className={'iconfont iconinput'}/>
                                        <p>普通文本</p>
                                    </li>
                                    <li onClick={()=>addTag(this.formatInput('password'))}>
                                        <i className={'iconfont iconpassword'}/>
                                        <p>密码文本</p>
                                    </li>
                                    <li onClick={()=>addTag(this.formatInput('number'))}>
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
                    <li>
                        <Popconfirm
                            placement="rightTop"
                            title={'确认要删除该项吗?'}
                            onConfirm={()=>deleteTag(this.state.selectedTag.key)}
                            onClick={(e)=>this.stopDefault(e)}
                            okText="删除"
                            cancelText="取消"
                        >
                            <div className={'reName_wp'}>
                                <i className={'iconfont icondelete'}/>
                                <p>删除</p>
                            </div>
                        </Popconfirm>

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
                <Tree showIcon defaultExpandAll draggable
                      onDragStart={()=>{                //开始拖拽的时候把hover—mask和抽屉去掉，十分low的行为，有机会改掉
                          changeHoveredTag('');
                          changeDrawer(false)
                      }}
                      onDrop={(e)=>this.drop(e)}
                      onSelect={(e)=>this.treeNodeonClick(e)}
                      onMouseEnter={(e)=>{changeHoveredTag(e.node.props.eventKey)}}
                      onMouseLeave={()=>{changeHoveredTag('')}}
                      onRightClick={(e)=>this.treeNodeonRightClick(e)}>
                    <TreeNode icon={<i className={'iconfont icondiv'}/>} title='总容器' key="0">
                        {this.state.tagList.children.map(val=>this.createNodes(val))}
                    </TreeNode>
                </Tree>
                {this.getNodeTreeRightClickMenu()}
                <TableModal type={'新建'} showTableModal={this.state.showTableModal} ok={(arr,className)=>addTag(this.formatTable(arr,className))} cancel={()=>this.setState({showTableModal:false})}/>
                <ImageModal type={'新建'} showImageModal={this.state.showImageModal} ok={(name,src)=>addTag(this.formatImage(name,src))} cancel={()=>this.setState({showImageModal:false})} imageModalTitle={this.state.imageModalTitle}/>
            </div>
        )
    }
}

export default mySider;
