import React from 'react'

import {addTag} from "../../../store/action";
import { Menu, Dropdown,Modal } from 'antd';
import store from '../../../store/index'

import '../css/insert.less'




class insert extends React.Component{


    constructor(props){
        super(props);
        // this.state = store.getState();
        this.state = Object.assign({},store.getState(),{
            showTableModal:false
        })

    }



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
    }

    modals = (modal,status)=>{
        this.setState({
            [modal]:status
        })
    }


    render() {

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

        const imgMenu = (
            <div className={'tag_wp popover'}>
                <div className={'tag'}>
                    <i className={'iconfont iconnetworkimg'}/>
                    <p className={'tagName'}>网图</p>
                </div>
                <div className={'tag'}>
                    <i className={'iconfont iconzip'}/>
                    <p className={'tagName'}>base64</p>
                </div>
            </div>
        )


        return (
            <div>

            <div className={'tag_wp'}>
                <div className={'tag'} onClick={()=>{addTag(this.formatTag('新建div',0,'div'))}}>
                    <i className={'iconfont icondiv'}/>
                    <p className={'tagName'}>div</p>
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
                    <div onClick={()=>{addTag(this.formatTag('新建img',0,'img'))}}>
                        <i className={'iconfont iconimg'}/>
                        <p className={'tagName'}>图片</p>
                    </div>
                    <Dropdown overlay={imgMenu} placement="bottomLeft" trigger={['click']}>
                        <div className={'arrow'}>
                            <i className={'iconfont icondownarrow'}/>
                        </div>
                    </Dropdown>
                </div>
                <div className={'tag'} onClick={()=>this.modals('showTableModal',true)}>
                    <i className={'iconfont icontable'}/>
                    <p className={'tagName'}>表格</p>
                    {/*<div className={'arrow'}>*/}
                        {/*<i className={'iconfont icondownarrow'}/>*/}
                    {/*</div>*/}
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
                <div className={'tag'}>
                    <i className={'iconfont iconfavorite'}/>
                    <p className={'tagName'}>收藏</p>
                    <div className={'arrow'}>
                        <i className={'iconfont icondownarrow'}/>
                    </div>
                </div>

            </div>
                <Modal  title='插入表格' width={1000}
                        visible={this.state.showTableModal}
                        onOk={this.handleOk}
                        onCancel={()=>this.modals('showTableModal',false)}>
                        <div>
                            <div>
                                <span>表头</span>
                                <div>

                                </div>
                            </div>
                            <div>
                                <span>预设样式</span>
                                <div>

                                </div>
                            </div>

                        </div>
                </Modal>
            </div>
        )
    }

}

export default insert
