import React from 'react'
import {Modal,Select,Input,Tabs,message} from "antd";
import store from '../../../../store'
import '../css/classesModal.less'
import {cssPropKeys} from "../../../../untils/cssTable";
import {addClassList} from "../../../../store/action";

const {Option} = Select;
const {TextArea} = Input;
const { TabPane } = Tabs;

class ClassesModal extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            isClassNameError:false,
            tag:'none',
            className:'',
            parentClass:'',
            relation:'',
            css:'',
            hover:'',
            isHover:false
        })
        store.subscribe(this.listener)
    }


    listener = () => {
        let newState = store.getState();
        this.setState(newState);
    };

    checkClassName = (e)=>{
        let text = e.target.value;
        if (/^[0-9]/.test(text)){
            message.warn('类名不能以数字开头');
            this.setState({
                isClassNameError:true
            })
        }
    }

    computedStyle = ()=>{
        let css = this.state.css.split(/[:;]/g),
            hover = this.state.hover.split(/[:;]/g);
        let cssObj = {},
            hoverObj = {};
        for (let i=0;i<css.length;i+=2){
            if (/^[0-9]/.test(css[i])){
                continue;
            }
            cssObj[css[i]] = css[i+1]
        }
        for (let i=0;i<hover.length;i+=2){
            if (/^[0-9]/.test(hover[i])){
                continue;
            }
            hoverObj[hover[i]] = hover[i+1]
        }
        if (this.state.isHover){
            return Object.assign(cssObj,hoverObj);
        } else {
            return cssObj;
        }
    };

    ok = ()=>{
        let {className,tag,parentClass,relation,css,hover} = this.state;
        let cssArr = css.split(/[:;]/g),
            hoverArr = hover.split(/[:;]/g);
        let cssObj = {},
            hoverObj = {};
        for (let i=0;i<cssArr.length;i+=2){
            if (/^[0-9]/.test(cssArr[i])){
                continue;
            }
            cssObj[cssArr[i]] = cssArr[i+1]
        }
        for (let i=0;i<hoverArr.length;i+=2){
            if (/^[0-9]/.test(hoverArr[i])){
                continue;
            }
            hoverObj[hoverArr[i]] = hoverArr[i+1]
        }
        addClassList({
            className,
            tag,
            parentClass,
            relation,
            css:cssObj,
            hover:hoverObj
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
                <div className={'sss'}>

                    <div className={'content'}>
                        <div className={'modal_item'}>
                            <span>标签与类名</span>
                            <div>
                                <Input placeholder={'类名'}
                                       className={this.state.isClassNameError?'error':''}
                                       addonBefore={
                                           <Select defaultValue={this.state.tag} style={{width:100}} onChange={e=>this.setState({tag:e})}>
                                               <Option value="none">不指定</Option>
                                               {cssPropKeys.map((item)=><Option value={item}>{item}</Option>)}
                                           </Select>
                                       }
                                       onChange={(e)=>this.setState({className:e.target.value})}
                                       onFocus={()=>this.setState({isClassNameError:false})}
                                       onBlur={(e)=>this.checkClassName(e)}
                                />
                            </div>
                        </div>
                        <div className={'modal_item'}>
                            <span>所属范围</span>
                            <div>
                                <Select defaultValue={'全局'} style={{width:150}} onChange={(e)=>this.setState({belongs:e})}>
                                    <Option value="none">全局</Option>
                                    <Option value="class">【类列表】</Option>
                                </Select>
                            </div>
                        </div>
                        {this.state.belongs === 'none'
                            ?
                            null
                            :
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
                        }

                        <div className={'modal_item'}>
                            <span>css代码</span>
                            <div>
                                <Tabs tabPosition={'left'} type={'card'}>
                                    <TabPane tab={'css'} key={'standard'}>
                                        <textarea className={'code_wp'} onChange={e=>this.setState({css:e.target.value.replace(/[\n\t]/g,'')})}>{this.state.css.replace(/;/g,';\n')}</textarea>
                                    </TabPane>
                                    <TabPane tab={'hover'} key={'hover'}>
                                        <textarea className={'code_wp'} onChange={e=>this.setState({hover:e.target.value.replace(/[\n\t]/g,'')})}>{this.state.hover.replace(/;/g,';\n')}</textarea>
                                    </TabPane>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                    <div className={'show'}>
                        <div className={'itembox'} style={this.computedStyle()} onMouseEnter={()=>this.setState({isHover:true})} onMouseLeave={()=>this.setState({isHover:false})}>
                            示例文字
                        </div>
                        <div className={'codebox'}>
                            {`${this.state.tag==='none'?'':this.state.tag}${this.state.className===''?'':'.'}${this.state.className}{\n\t${this.state.css.replace(/;(?<!;$)/g,';\n\t')}\n}\n`}
                            {this.state.hover===''
                                ?''
                                :`${this.state.tag==='none'?'':this.state.tag}.${this.state.className===''?'':'.'}${this.state.className}:hover{\n\t${this.state.hover.replace(/;(?<!;$)/g,';\n\t')}\n}`
                            }
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

}

export default ClassesModal
