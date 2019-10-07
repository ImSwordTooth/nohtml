import React from 'react'

import {addTag} from "../../../store/action";
import { Menu, Dropdown,Modal,Input,Button,message } from 'antd';
import store from '../../../store/index'

import {TableModal} from "../../common/modals/tableModal";

import '../css/insert.less'
import {ImageModal} from "../../common/modals/imageModal";
const {TextArea} = Input;

class insert extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            showTableModal:false,       //表格插入模态框
            showImageModal:false,       //图片插入模态框
            imageModalTitle:'',         //图片插入模态框标题
            tableThs:['表头1','表头2','表头3']        //表头数组初值
        })

    }


    //插入标签格式化
    formatTag = (name,pid,type)=>{
        return {
            type:type,
            pid:0,
            props:{
                dataName:name,

                children:[{
                    type:'p',
                    props:'静态文本'
                }]
            }
        }
    };


    //js点击上传input
    clickUpload = ()=>{
        document.getElementById('uploadLocalImg').click();
    };

    //上传文件
    handleUploadImage = ()=>{
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
                console.log(this.result)
            }
        }
    };


    render() {

        //下拉 · 文本
        const textMenu = (
            <Menu>
                <Menu.Item className={'menuItem'} onClick={()=>{addTag(this.formatTag('新建p',0,'p'))}}>
                    <i className={'iconfont iconp'}/>
                    <span>p</span>
                </Menu.Item>
                <Menu.Item className={'menuItem'} onClick={()=>{addTag(this.formatTag('新建a',0,'a'))}}>
                    <i className={'iconfont icona'}/>
                    <span>a</span>
                </Menu.Item>
                <Menu.Item className={'menuItem'} onClick={()=>{addTag(this.formatTag('新建pre',0,'pre'))}}>
                    <i className={'iconfont iconpre'}/>
                    <span>pre</span>
                </Menu.Item>
                <Menu.Item className={'menuItem'} onClick={()=>{addTag(this.formatTag('新建code',0,'code'))}}>
                    <i className={'iconfont iconcode'}/>
                    <span>code</span>
                </Menu.Item>
            </Menu>
        );

        // 下拉 · 图片
        const imgMenu = (
            <div className={'tag_wp popover'}>
                <div className={'tag'} onClick={()=>{
                    this.setState({
                        showImageModal:true,
                        imageModalTitle:'网络图片'
                    })
                }}>
                    <i className={'iconfont iconnetworkimg'}/>
                    <p className={'tagName'}>网络图片</p>
                </div>
                <div className={'tag'} onClick={()=>{
                    this.setState({
                        showImageModal:true,
                        imageModalTitle:'base64编码'
                    })
                }}>
                    <i className={'iconfont iconzip'}/>
                    <p className={'tagName'}>base64</p>
                </div>
            </div>
        );

        // 下拉 · 文本框
        const inputMenu = (
            <Menu>
                <Menu.Item className={'menuItem'}>
                    <i className={'iconfont iconpassword'}/>
                    <span>密码文本</span>
                </Menu.Item>
                <Menu.Item className={'menuItem'}>
                    <i className={'iconfont iconnumber'}/>
                    <span>数字文本</span>
                </Menu.Item>
            </Menu>
        );

        return (
            <div>
                <div className={'tag_wp'}>
                    <div className={'tag'} onClick={()=>{addTag(this.formatTag('新建div',0,'div'))}}>
                        <i className={'iconfont icondiv'}/>
                        <p className={'tagName'}>div</p>
                    </div>
                    <div className={'tag'}>
                        <div onClick={()=>{addTag(this.formatTag('新建button',0,'button'))}}>
                            <i className={'iconfont iconbutton'}/>
                            <p className={'tagName'}>按钮</p>
                        </div>
                    </div>
                    <div className={'tag'}>
                        <div onClick={()=>{addTag(this.formatTag('新建span',0,'span'))}}>
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
                        <div onClick={()=>this.clickUpload()}>
                            <i className={'iconfont iconimg'}/>
                            <p className={'tagName'}>图片</p>
                        </div>
                        <input type="file" hidden onChange={()=>this.handleUploadImage()} id={'uploadLocalImg'} accept="image/*"/>
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
                        <i className={'iconfont iconcanvas'}/>
                        <p className={'tagName'}>画布</p>
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
                        <i className={'iconfont iconinput'}/>
                        <p className={'tagName'}>文本框</p>
                        <Dropdown overlay={inputMenu} placement="bottomLeft" trigger={['click']}>
                            <div className={'arrow'}>
                                <i className={'iconfont icondownarrow'}/>
                            </div>
                        </Dropdown>
                    </div>
                    <div className={'tag'}>
                        <i className={'iconfont iconcheckbox'}/>
                        <p className={'tagName'}>复选框</p>
                    </div>
                    <div className={'tag'}>
                        <i className={'iconfont iconradio'}/>
                        <p className={'tagName'}>单选框</p>
                    </div>

                </div>
                <TableModal showTableModal={this.state.showTableModal} cancel={()=>this.setState({showTableModal:false})}/>
                <ImageModal showImageModal={this.state.showImageModal} cancel={()=>this.setState({showImageModal:false})} imageModalTitle={this.state.imageModalTitle}/>
            </div>
        )
    }

}

export default insert
