import React from 'react'

import {addTag} from "../../../store/action";
import { Menu, Dropdown,Modal,Input,Button,message } from 'antd';
import store from '../../../store/index'

import '../css/insert.less'
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

    //模态框的控制
    modals = (modal,status)=>{
        this.setState({
            [modal]:status
        })
    };

    //修改表头内容
    changeTableThsValue = (e)=>{
        let index = parseInt(e.target.id.split('-')[1]);
        let arr = this.state.tableThs;
        arr[index] = e.target.value;
        this.setState({
            tableThs:arr
        })
    };

    //添加表头
    addTableThs = ()=>{
        let size = this.state.tableThs.length;
        if (size>=10){
            message.warn('最多10个表头')
        }else {
            this.setState({
                tableThs:this.state.tableThs.concat(`表头${size+1}`)
            })
        }
    };

    //删除表头
    deleteTableThs = (index)=>{
        let arr = [...this.state.tableThs];
        arr.splice(index,1);
        this.setState({
            tableThs:arr
        })
    };

    //获取表头，复用到下面的预设中
    getTableThs = ()=>{
        return this.state.tableThs.map((item,key)=>{
            return (
                <div className={'input_wp'} key={key}>
                    <Input value={item} id={`th-${key}`} onChange={this.changeTableThsValue}/>
                    <span onClick={()=>this.deleteTableThs(key)}><i className={'iconfont icondelete'}/></span>
                </div>
            )
        })
    };

    //创建一个个列表，用于预设样式中的展示
    getTablePreviews = (border)=>{
        return (
            <table border={border}>
                <tbody>
                    <tr>
                        {this.state.tableThs.map((item,index)=><th key={index}>{item}</th>)}
                    </tr>
                    <tr>
                        {this.state.tableThs.map((item,index)=><td key={index}>{`数据${index+1}`}</td>)}
                    </tr>
                    <tr>
                        {this.state.tableThs.map((item,index)=><td key={index}>{`数据${index+this.state.tableThs.length+1}`}</td>)}
                    </tr>
                </tbody>
            </table>
        )
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

    //打开图片模态框，因为需要确认额外的标题，所以又写了一个函数
    openImageModal = (title)=>{
        this.setState({
            showImageModal:true,
            imageModalTitle:title,
        })
    };

    //生成模态框里的内容
    getImageModal = (type)=>{
        if (type === '网络图片') {
            return (
                <div className={'modal_item'}>
                    <span>图片地址</span>
                    <div>
                        <Input style={{width:500}}/>
                    </div>
                </div>
            )

        }else if (type === 'base64编码') {
            return (
                <div className={'modal_item'}>
                    <span>base64编码</span>
                    <div>
                        <TextArea autosize={{ minRows: 5}} style={{width:500}}/>
                    </div>
                </div>
            )
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
                <div className={'tag'} onClick={()=>this.openImageModal('网络图片')}>
                    <i className={'iconfont iconnetworkimg'}/>
                    <p className={'tagName'}>网络图片</p>
                </div>
                <div className={'tag'} onClick={()=>this.openImageModal('base64编码')}>
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
                    <span>密码文本框</span>
                </Menu.Item>
                <Menu.Item className={'menuItem'}>
                    <i className={'iconfont iconnumber'}/>
                    <span>数字文本框</span>
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
                    <div className={'tag'} onClick={()=>this.modals('showTableModal',true)}>
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
                <Modal title='插入表格' width={1000}
                       className={'tableModal modals'}
                        visible={this.state.showTableModal}
                        onOk={this.handleOk}
                        onCancel={()=>this.modals('showTableModal',false)}>
                        <div>
                            <div className={'modal_item'}>
                                <span>表头</span>
                                <div className={'ths'}>
                                    {this.getTableThs()}
                                    <Button type="primary" ghost onClick={()=>this.addTableThs()}>添加</Button>
                                </div>
                            </div>
                            <div className={'modal_item'}>
                                <span>预设样式</span>
                                <div>
                                    <ul className={'previewList'}>
                                        <li className={'standard'}>{this.getTablePreviews()}</li>
                                        <li className={'business'}>{this.getTablePreviews()}</li>
                                        <li className={'line'}>{this.getTablePreviews('1')}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                </Modal>
                <Modal title={this.state.imageModalTitle} width={800}
                       className={'imageModal modals'}
                       visible={this.state.showImageModal}
                       onOk={this.handleOk}
                       onCancel={()=>this.modals('showImageModal',false)}>
                    <div>
                        {this.getImageModal(this.state.imageModalTitle)}
                    </div>
                </Modal>
            </div>
        )
    }

}

export default insert
