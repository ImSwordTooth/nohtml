import React from 'react'
import {Modal,Select,Input} from "antd";
import store from '../../../../store'
import '../css/classesModal.less'

const {Option} = Select;

class ClassesModal extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{

        })
    }

    render() {
        return (
            <Modal title={'新建样式类'} width={1200}
                   className={'classesModal modals'}
                   visible={this.props.showClassesModal}
                   cancelText={'关闭'}
                   okText={'添加'}
                   onOk={this.ok}
                   onCancel={this.props.cancel}
            >
                <div>
                    <div className={'itembox'}>
                        示例
                    </div>
                    <div className={'modal_item'}>
                        <span>基本信息</span>
                        <div>
                            <Input placeholder={'类名'} addonBefore={
                                <Select defaultValue="不指定" style={{width:100}}>
                                    <Option value="不指定">不指定</Option>
                                    <Option value="*">*</Option>
                                    <Option value="标签列表">标签列表</Option>
                                </Select>}/>
                        </div>
                    </div>
                    <div className={'modal_item'}>
                        <span>范围</span>
                        <div>
                            <Select defaultValue={'全局'} style={{width:150}}>
                                <Option value="全局">全局</Option>
                                <Option value="right">【类列表】</Option>
                            </Select>
                        </div>
                    </div>
                    <div className={'modal_item'}>
                        <span>从属关系</span>
                        <div>
                            <Select defaultValue={'后代'} style={{width:150}}>
                                <Option value="后代">后代<span> </span></Option>
                                <Option value="交集">交集<span></span></Option>
                                <Option value="子代">子代<span>></span></Option>
                                <Option value="兄弟">兄弟<span>+</span></Option>
                            </Select>
                        </div>
                    </div>
                    <div className={'modal_item'}>


                    </div>
                </div>


            </Modal>
        )
    }

}

export default ClassesModal
