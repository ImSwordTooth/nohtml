import React,{PureComponent} from 'react'

import {insertTag} from "../../../../store/action";
import {Menu, Dropdown, message, Tooltip} from 'antd';
import store from '../../../../store'
import {connect} from 'react-redux'



import '../css/insert.less'
import {TableModal} from "../../common/modals/tableModal";
import {ImageModal} from "../../common/modals/imageModal";
import Mask from "../mask";
import {getObjByKeyFromTagList} from "../../../../common/units";

class insert extends PureComponent{

    state = {
        showTableModal:false,       //表格插入模态框
        showImageModal:false,       //图片插入模态框
        imageModalTitle:'',         //图片插入模态框标题
    }

    //插入标签格式化
    formatTag = (type,name)=>{
        const {selectedTag,tagList} = this.props
        let parent = getObjByKeyFromTagList(selectedTag.pid,tagList);
        return {
            type:type,
            pid:selectedTag.pid,
            key:`${selectedTag.pid}-${parent.willCreateKey}`,
            dataName:name,
            iconName:'icon'+type,
            content:`新建${type}`,
            trueStyle:{},
            viewStyle:{},
            hoverTrueStyle:{},
            hoverViewStyle:{},
            willCreateKey:0,
            props:{},
            children:[]
        }
    };

    //插入图片格式化
    formatImage = (name,src) =>{
        const {selectedTag,tagList} = this.props
        let parent = getObjByKeyFromTagList(selectedTag.pid,tagList);
        this.setState({
            showImageModal:false
        })
        return {
            type:'img',
            pid:selectedTag.pid,
            key:`${selectedTag.pid}-${parent.willCreateKey}`,
            dataName:name,
            iconName:'iconimg',
            trueStyle:{},
            viewStyle:{},
            hoverTrueStyle:{},
            hoverViewStyle:{},
            willCreateKey:0,
            props:{
                src
            }
        }
    };

    //插入表格格式化
    formatTable = (arr,className)=>{
        const {selectedTag,tagList} = this.props
        let parent = getObjByKeyFromTagList(selectedTag.pid,tagList);
        this.setState({
            showTableModal:false
        });

        //确定tr标签
        let trs = new Array(arr.length);
        arr.forEach((item,index)=>{
           trs[index] = Object.assign({},{
               type:'tr',
               pid:`${selectedTag.pid}-${parent.willCreateKey}-0`,
               key:`${selectedTag.pid}-${parent.willCreateKey}-0-${index}`,
               dataName:`新建tr${index+1}`,
               iconName:'icontr',
               trueStyle:{},
               viewStyle:{},
               hoverTrueStyle:{},
               hoverViewStyle:{},
               willCreateKey:arr.length === 0 ? 0 :arr.length+1,
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
                hoverTrueStyle:{},
                hoverViewStyle:{},
                willCreateKey:0,
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
                    hoverTrueStyle:{},
                    hoverViewStyle:{},
                    willCreateKey:0,
                    props:{},
                    children:[]
                }
            }))
        }

        return {
            type:'table',
            pid:selectedTag.pid,
            key:`${selectedTag.pid}-${parent.willCreateKey}`,
            dataName:'新建table',
            iconName:'icontable',
            trueStyle:{},
            viewStyle:{},
            hoverTrueStyle:{},
            hoverViewStyle:{},
            willCreateKey:1,
            props:{
                className:[className]
            },
            children: [
                {
                    type:'tbody',
                    pid:`${selectedTag.pid}-${parent.willCreateKey}`,
                    key:`${selectedTag.pid}-${parent.willCreateKey}`+'-0',
                    dataName:'新建tbody',
                    iconName:'icontbody',
                    trueStyle:{},
                    viewStyle:{},
                    hoverTrueStyle:{},
                    hoverViewStyle:{},
                    willCreateKey:trs.length === 0 ? 0 : trs.length+1,
                    props:{},
                    children:trs
                }
            ]
        }
    };

    formatInput = (type)=>{
        const {selectedTag} = this.props
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
            pid:selectedTag.pid,
            key:`${selectedTag.pid}-${selectedTag.willCreateKey}`,
            dataName,
            iconName,
            trueStyle:{},
            viewStyle:{},
            hoverTrueStyle:{},
            hoverViewStyle:{},
            willCreateKey:0,
            props:{
                type
            }
        }
    }


    //js点击上传input
    clickUpload = ()=>{
        document.getElementById('uploadLocalImg').click();
    };

    //上传图片
    handleUploadImage = ()=>{
        let that = this;
        let file = document.getElementById('uploadLocalImg').files[0];
        if (!file || !window.FileReader) { // 看支持不支持FileReader
            message.warn('您的浏览器不支持FileReader本地上传');
            return
        }
        if (/^image/.test(file.type)) {
            let reader = new FileReader(); // 创建一个reader
            reader.readAsDataURL(file); // 将图片将转成 base64 格式
            reader.onloadend = function () { // 读取成功后的回调
                message.success('上传成功');
                insertTag(that.formatImage(file.name,this.result))
            }
        }
    };


    render() {
        const {showTableModal,showImageModal,imageModalTitle} = this.state
        const {insertTag,selectedTag} = this.props

        //下拉 · 文本
        const textMenu = (
            <Menu>
                <Menu.Item className={'menuItem'} onClick={()=>{insertTag(this.formatTag('p','新建p'))}}>
                    <i className={'iconfont iconp'}/>
                    <span>p</span>
                </Menu.Item>
                <Menu.Item className={'menuItem'} onClick={()=>{insertTag(this.formatTag('a','新建a'))}}>
                    <i className={'iconfont icona'}/>
                    <span>a</span>
                </Menu.Item>
                <Menu.Item className={'menuItem'} onClick={()=>{insertTag(this.formatTag('pre','新建pre'))}}>
                    <i className={'iconfont iconpre'}/>
                    <span>pre</span>
                </Menu.Item>
                <Menu.Item className={'menuItem'} onClick={()=>{insertTag(this.formatTag('code','新建code'))}}>
                    <i className={'iconfont iconcode'}/>
                    <span>code</span>
                </Menu.Item>
            </Menu>
        );

        //下拉 · 标题
        const hMenu = (
            <Menu>
                <Menu.Item className={'menuItem'} onClick={()=>{insertTag(this.formatTag('h2','新建h2'))}}>
                    <i className={'iconfont iconh2'}/>
                    <span>二级标题</span>
                </Menu.Item>
                <Menu.Item className={'menuItem'} onClick={()=>{insertTag(this.formatTag('h3','新建h3'))}}>
                    <i className={'iconfont iconh3'}/>
                    <span>三级标题</span>
                </Menu.Item>
                <Menu.Item className={'menuItem'} onClick={()=>{insertTag(this.formatTag('h4','新建h4'))}}>
                    <i className={'iconfont iconh4'}/>
                    <span>四级标题</span>
                </Menu.Item>
                <Menu.Item className={'menuItem'} onClick={()=>{insertTag(this.formatTag('h5','新建h5'))}}>
                    <i className={'iconfont iconh5'}/>
                    <span>五级标题</span>
                </Menu.Item>
                <Menu.Item className={'menuItem'} onClick={()=>{insertTag(this.formatTag('h6','新建h6'))}}>
                    <i className={'iconfont iconh6'}/>
                    <span>六级标题</span>
                </Menu.Item>
            </Menu>
        )

        // 下拉 · 图片
        const imgMenu = (
            <Menu>
                <Menu.Item className={'menuItem'} onClick={()=>this.setState({showImageModal:true,imageModalTitle:'网络图片'})}>
                    <i className={'iconfont iconnetworkimg'}/>
                    <span>网络图片</span>
                </Menu.Item>
                <Menu.Item className={'menuItem'} onClick={()=>this.setState({showImageModal:true,imageModalTitle:'base64编码'})}>
                    <i className={'iconfont iconzip'}/>
                    <span>base64</span>
                </Menu.Item>
            </Menu>
        );

        // // 下拉 · 图片
        // const imgMenu = (
        //     <div className={'tag_wp popover'}>
        //         <div className={'tag'} onClick={()=>{
        //             this.setState({
        //                 showImageModal:true,
        //                 imageModalTitle:'网络图片'
        //             })
        //         }}>
        //             <i className={'iconfont iconnetworkimg'}/>
        //             <p className={'tagName'}>网络图片</p>
        //         </div>
        //         <div className={'tag'} onClick={()=>{
        //             this.setState({
        //                 showImageModal:true,
        //                 imageModalTitle:'base64编码'
        //             })
        //         }}>
        //             <i className={'iconfont iconzip'}/>
        //             <p className={'tagName'}>base64</p>
        //         </div>
        //     </div>
        // );

        // 下拉 · 文本框
        const inputMenu = (
            <Menu>
                <Menu.Item className={'menuItem'} onClick={()=>insertTag(this.formatInput('password'))}>
                    <i className={'iconfont iconpassword'}/>
                    <span>密码文本</span>
                </Menu.Item>
                <Menu.Item className={'menuItem'} onClick={()=>insertTag(this.formatInput('number'))}>
                    <i className={'iconfont iconnumber'}/>
                    <span>数字文本</span>
                </Menu.Item>
            </Menu>
        );

        return (
            <div>
                <div style={{position:'relative',width:'max-content'}}>
                    {
                        JSON.stringify(selectedTag)==='{}'?<Mask title={'请先选中要插入的元素'}/>:<></>
                    }
                    <div className={'tag_wp'}>
                        <div className={'tag'} onClick={()=>{insertTag(this.formatTag('div','新建div'))}}>
                            <i className={'iconfont icondiv'}/>
                            <p className={'tagName'}>div</p>
                        </div>
                        <div className={'tag'}>
                            <div onClick={()=>{insertTag(this.formatTag('button','新建button'))}}>
                                <i className={'iconfont iconbutton'}/>
                                <p className={'tagName'}>按钮</p>
                            </div>
                        </div>
                        <div className={'tag'}>
                            <div onClick={()=>{insertTag(this.formatTag('span','新建span'))}}>
                                <i className={'iconfont icontext'}/>
                                <p className={'tagName'}>文本</p>
                            </div>
                            <Dropdown overlay={textMenu} placement="bottomLeft" trigger={['click']}>
                                <div className={'arrow'}>
                                    <i className={'iconfont icondownarrow'}/>
                                </div>
                            </Dropdown>
                        </div>
                        <div className={'tag'}>
                            <div onClick={()=>{insertTag(this.formatTag('h1','新建h1'))}}>
                                <i className={'iconfont iconh1'}/>
                                <p className={'tagName'}>标题</p>
                            </div>
                            <Dropdown overlay={hMenu} placement="bottomLeft" trigger={['click']}>
                                <div className={'arrow'}>
                                    <i className={'iconfont icondownarrow'}/>
                                </div>
                            </Dropdown>
                        </div>
                        <div className={'tag'}>
                            <div onClick={this.clickUpload}>
                                <i className={'iconfont iconimg'}/>
                                <p className={'tagName'}>图片</p>
                            </div>
                            <input type="file" hidden onChange={this.handleUploadImage} id={'uploadLocalImg'} accept="image/*"/>
                            <Dropdown overlay={imgMenu} placement="bottomLeft" trigger={['click']}>
                                <div className={'arrow'}>
                                    <i className={'iconfont icondownarrow'}/>
                                </div>
                            </Dropdown>
                        </div>
                        <div className={'tag'} onClick={()=>this.setState({showTableModal:true})}>
                            <i className={'iconfont icontable'}/>
                            <p className={'tagName'}>表格</p>
                        </div>
                        <div className={'tag'}>
                            <i className={'iconfont iconlist'}/>
                            <p className={'tagName'}>列表</p>
                            <div className={'arrow'}>
                                <i className={'iconfont icondownarrow'}/>
                            </div>
                        </div>
                        <div className={'tag'}>
                            <i className={'iconfont iconpseudoelement'}/>
                            <p className={'tagName'}>伪元素</p>
                            <div className={'arrow'}>
                                <i className={'iconfont icondownarrow'}/>
                            </div>
                        </div>
                        <div className={'tag line'}>
                            <i className={'iconfont iconfavorite'}/>
                            <p className={'tagName'}>收藏</p>
                            <div className={'arrow'}>
                                <i className={'iconfont icondownarrow'}/>
                            </div>
                        </div>

                        <div className={'tag'}>
                            <div onClick={()=>insertTag(this.formatInput('text'))}>
                                <i className={'iconfont iconinput'}/>
                                <p className={'tagName'}>文本框</p>
                            </div>
                            <Dropdown overlay={inputMenu} placement="bottomLeft" trigger={['click']}>
                                <div className={'arrow'}>
                                    <i className={'iconfont icondownarrow'}/>
                                </div>
                            </Dropdown>
                        </div>
                        <div className={'tag'} onClick={()=>insertTag(this.formatInput('checkbox'))}>
                            <i className={'iconfont iconcheckbox'}/>
                            <p className={'tagName'}>复选框</p>
                        </div>
                        <div className={'tag'} onClick={()=>insertTag(this.formatInput('radio'))}>
                            <i className={'iconfont iconradio'}/>
                            <p className={'tagName'}>单选框</p>
                        </div>

                    </div>
                <TableModal type={'插入'} showTableModal={showTableModal} ok={(arr,className)=>insertTag(this.formatTable(arr,className))} cancel={()=>this.setState({showTableModal:false})}/>
                <ImageModal type={'插入'} showImageModal={showImageModal} ok={(name,src)=>insertTag(this.formatImage(name,src))} cancel={()=>this.setState({showImageModal:false})} imageModalTitle={imageModalTitle}/>
            </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    const {selectedTag,tagList} = state;
    return {selectedTag,tagList}
}

function mapDispatchToProps() {
    return {
        insertTag
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(insert)
