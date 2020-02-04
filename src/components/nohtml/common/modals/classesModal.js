import React from 'react'
import {Modal,Select,Input,Tabs,message,Tooltip} from "antd";
import store from '../../../../store'
import '../css/classesModal.less'
import {cssPropKeys} from "../../../../data/cssTable";
import {addClassList, updateClassList} from "../../../../store/action";

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
                parentClass:'none',
                relation:' ',
                css:'',
                hover:'',
                isHover:false
            });


        store.subscribe(this.listener)
    }


    listener = () => {
        let newState = store.getState();
        this.setState(newState);
    };


    componentWillReceiveProps(nextProps){

        // if (this.props.rightClassIndex !== nextProps.rightClassIndex){
            if (nextProps.rightClassIndex!==-1){
                console.log(nextProps.classObj)
                let obj = Object.assign({},nextProps.classObj);
                console.log(obj)
                let {tag,className,parentClass,relation} = obj;
                this.setState({
                    tag,
                    className,
                    parentClass,
                    relation,
                    css:this.getCssContent(nextProps.classObj.viewStyle,false),
                    hover:this.getCssContent(nextProps.classObj.hoverViewStyle,false)
                },()=>{
                    console.log(this.state)
                });
            } else {
                this.setState({
                    tag:'none',
                    className:'',
                    parentClass:'none',
                    relation:' ',
                    css:'',
                    hover:''
                })
            }
            // console.log(nextProps.classObj)

            // console.log(this.state)
        // }
    }

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
                cssObj[css[i].trim()] = css[i+1]
            }
            for (let i=0;i<hover.length;i+=2){
                if (/^[0-9]/.test(hover[i])){
                    continue;
                }
                hoverObj[hover[i].trim()] = hover[i+1]
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
        let viewStyle = {},
            trueStyle = {},
            hoverViewStyle = {},
            hoverTrueStyle = {};
        for (let i=0;i<cssArr.length;i+=2){
            if (/^[0-9]/.test(cssArr[i])){
                continue;
            }
            if (cssArr[i+1]){
                viewStyle[cssArr[i]] = cssArr[i+1];
                trueStyle[cssArr[i]] = cssArr[i+1].replace(/\d+px/g,i=>parseInt(i)/14*0.6+'rem');
            }
        }
        for (let i=0;i<hoverArr.length;i+=2){
            if (/^[0-9]/.test(hoverArr[i])){
                continue;
            }
            if (hoverArr[i+1]){
                hoverViewStyle[hoverArr[i]] = hoverArr[i+1];
                hoverTrueStyle[hoverArr[i]] = hoverArr[i+1].replace(/\d+px/g,i=>parseInt(i)/14*0.6+'rem');
            }
        }
        if (this.props.classObj){
            updateClassList({
                className,
                tag,
                parentClass,
                relation,
                trueStyle,
                viewStyle,
                hoverTrueStyle,
                hoverViewStyle
            },this.props.rightClassIndex);
        } else {
            addClassList({
                className,
                tag,
                parentClass,
                relation,
                trueStyle,
                viewStyle,
                hoverTrueStyle,
                hoverViewStyle
            });
        }

        this.props.cancel();

        this.setState({
            isClassNameError:false,
            tag:'none',
            className:'',
            parentClass:'none',
            relation:'',
            css:'',
            hover:'',
            isHover:false
        })

    };

    cancel = ()=>{
        this.setState({
            isClassNameError:false,
            tag:'none',
            className:'',
            parentClass:'none',
            relation:'',
            css:'',
            hover:'',
            isHover:false
        });
        this.props.cancel()
    };

    getCssContent = (val,isTab)=>{
        let style = '';
        for (let i in val){
            style += `${isTab?'\t':''}${i}:${val[i]};`
        }
        return style
    };

    render() {
        return (
            <Modal title={this.props.classObj?this.props.classObj.className:'新建样式类'} width={1200}
                   className={'classesModal modals'}
                   visible={this.props.showClassesModal}
                   cancelText={'关闭'}
                   okText={this.props.classObj?'确认':'添加'}
                   onOk={this.ok}
                   onCancel={this.cancel}
            >
                <div className={'content_wp'}>

                    <div className={'content'}>
                        <div className={'modal_item'}>
                            <span>标签与类名</span>
                            <div>
                                <Input placeholder={'类名'}
                                       className={this.state.isClassNameError?'error':''}
                                       addonBefore={
                                           <Select value={this.state.tag} style={{width:100}} onChange={e=>this.setState({tag:e})}>
                                               <Option value="none">不指定</Option>
                                               {cssPropKeys.map((item)=><Option value={item}>{item}</Option>)}
                                           </Select>
                                       }
                                       value={this.state.className}
                                       onChange={(e)=>this.setState({className:e.target.value})}
                                       onFocus={()=>this.setState({isClassNameError:false})}
                                       onBlur={(e)=>this.checkClassName(e)}
                                />
                            </div>
                        </div>
                        <div className={'modal_item'}>
                            <span>所属范围</span>
                            <div>
                                <Tooltip title={
                                    this.state.parentClass !== 'none' ? Object.entries( this.state.classList[this.state.classList.findIndex((item)=>item.className===this.state.parentClass)].viewStyle).map((i)=>{
                                        return `${i[0].replace(/[A-Z]/g,w=>'-'+w.toLowerCase())}: ${i[1]};\n`
                                    }):''
                                }
                                         overlayStyle={{whiteSpace:'pre-wrap',fontFamily:'codeSaver, monospace',fontSize:'13px'}}
                                         placement={'rightTop'}
                                >
                                    <Select value={this.state.parentClass} style={{width:150}} onChange={(e)=>this.setState({parentClass:e})}>
                                        <Option value="none">全局</Option>
                                        {
                                            this.state.classList.map(item=><Option value={item.className}>{item.className}</Option>)
                                        }
                                    </Select>
                                </Tooltip>
                            </div>
                        </div>
                        {this.state.parentClass === 'none'
                            ?
                            null
                            :
                            <div className={'modal_item'}>
                                <span>从属关系</span>
                                <div>
                                    <Select value={this.state.relation} style={{width:150}} onChange={(e)=>this.setState({relation:e})}>
                                        <Option value=" ">后代<span style={{marginLeft:'10px'}}> (空格)</span></Option>
                                        <Option value=">">子元素<span style={{marginLeft:'10px'}}>></span></Option>
                                        <Option value="+">相邻兄弟<span style={{marginLeft:'10px'}}>+</span></Option>
                                        <Option value="~">后续兄弟<span style={{marginLeft:'10px'}}>~</span></Option>
                                    </Select>
                                </div>
                            </div>
                        }

                        <div className={'modal_item'}>
                            <span>css代码</span>
                            <div>
                                <Tabs tabPosition={'left'} type={'card'}>
                                    <TabPane tab={'css'} key={'standard'}>
                                        <textarea className={'code_wp'}
                                                  value={this.state.css.replace(/;(?<!;$)/g,';\n')}
                                                  onChange={e=>this.setState({css:e.target.value.replace(/[\n\t]/g,'')})}>
                                        </textarea>
                                    </TabPane>
                                    <TabPane tab={'hover'} key={'hover'}>
                                        <textarea className={'code_wp'}
                                                  value={this.state.hover.replace(/;(?<!;$)/g,';')}
                                                  onChange={e=>this.setState({hover:e.target.value.replace(/[\n\t]/g,'')})}>
                                        </textarea>
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
                            {
                                `${this.state.parentClass === 'none' ? '' : '.' + this.state.parentClass + ' ' + this.state.relation + ' '}${this.state.tag === 'none' ? '' : this.state.tag}${this.state.className === '' ? '' : '.'}${this.state.className}{\n\t${this.state.css.replace(/;(?<!;$)/g, ';\n\t')}\n}\n` +
                                `${this.state.hover === ''
                                    ? ''
                                    : `${this.state.parentClass === 'none' ? '' : '.' + this.state.parentClass + ' ' + this.state.relation + ' '}${this.state.tag === 'none' ? '' : this.state.tag}${this.state.className === '' ? '' : '.'}${this.state.className}:hover{\n\t${this.state.hover.replace(/;(?<!;$)/g, ';\n\t')}\n}`}`
                            }
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

}

export default ClassesModal
