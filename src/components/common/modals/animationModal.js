import React from 'react'
import store from '../../../store'
import '../css/animationModal.less'
import {Input,Modal,Select,Steps,Divider,Switch} from "antd";
const { Step } = Steps;
const { Option } = Select;

class AnimationModal extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{

        })
        store.subscribe(this.listener)
    }

    listener = () => {
        let newState = store.getState();
        this.setState(newState);
    };

    createNodes = () => {
        if (this.props.showAnimationModal && JSON.stringify(this.state.selectedTag)!=='{}'){
            let {key, pid, children, type,trueStyle,content,props} = this.state.selectedTag;
            let className = '';
            if (props.className){
                className += props.className;
            }
            if (children!==undefined){
                return React.createElement(
                    type || 'div',
                    {
                        id:'preview'+key,
                        key,
                        style:{...trueStyle},
                        src:props.src?props.src:null,
                        className
                    },
                    [(content || null),...children.map(val => this.createNodes(val))]
                )
            } else {
                return React.createElement(
                    type || 'div',
                    {
                        id:'preview'+key,
                        key,
                        style:{...trueStyle},
                        src:props.src?props.src:null,
                        type:props.type?props.type:null,
                        className
                    }

                )
            }
        }


    };

    render() {
        return(
            <Modal title={'自定义动画'} width={1000}
                   className={'animationModal modals'}
                   visible={this.props.showAnimationModal}
                   cancelText={'取消'}
                   okText={'添加'}
                   onCancel={()=>this.props.cancel()}
            >
                <div>
                    <div className={'currentTag'}>
                        {this.createNodes()}
                    </div>
                    <div className={'modal_item'}>
                        <span>动画名称</span>
                        <div>
                            <Input/>
                        </div>
                    </div>
                    <div className={'modal_item'}>
                        <span>持续时间</span>
                        <div>
                                <Input style={{width:150}} addonAfter={
                                    <Select defaultValue="s" style={{width:60}}>
                                        <Option value="s">s</Option>
                                        <Option value="ms">ms</Option>
                                    </Select>}/>
                        </div>
                    </div>
                    <div className={'modal_item'}>
                        <span>无限循环</span>
                        <div>
                            <div className={'checkbox_wp'}>
                                <Switch defaultChecked />
                                <i className={'iconfont iconhelp'}/>
                            </div>
                        </div>
                    </div>
                    <div className={'modal_item'}>
                        <span>过渡函数</span>
                        <div>
                            <div className={'checkbox_wp'}>
                                <Switch defaultChecked />
                                <i className={'iconfont iconhelp'}/>
                            </div>
                        </div>
                    </div>
                    <div className={'modal_item'}>
                        <span>关键帧</span>
                        <Steps progressDot current={1} direction="vertical">
                            <Step title="0%" icon={<i className={'iconfont iconadd'}/>} description="This is a description. This is a description." />
                            <Step title="100%" description={<i className={'iconfont iconadd'}/>} />
                        </Steps>
                    </div>





                </div>


            </Modal>
        )
    }

}

export default AnimationModal;
