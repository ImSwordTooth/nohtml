import React,{PureComponent} from 'react'
import {Modal,Select,Input,Tabs,message,Tooltip} from "antd";
import {connect} from 'react-redux'
import '../css/classesModal.less'
import {cssPropKeys} from "../../../../data/cssTable";
import {addClassList, updateClassList} from "../../../../store/action";

const {Option} = Select;
const {TextArea} = Input;
const { TabPane } = Tabs;

class ClassesModal extends PureComponent{

    state = {
        isClassNameError:false,
        tag:'none',
        className:'',
        parentClass:'none',
        relation:' ',
        css:'',
        hover:'',
        isHover:false
    }

    componentWillReceiveProps(nextProps){

        // if (this.props.rightClassIndex !== nextProps.rightClassIndex){
            if (nextProps.rightClassIndex!==-1){
                let obj = Object.assign({},nextProps.classObj);
                let {tag,className,parentClass,relation} = obj;
                this.setState({
                    tag,
                    className,
                    parentClass,
                    relation,
                    css:this.getCssContent(nextProps.classObj.viewStyle,false),
                    hover:this.getCssContent(nextProps.classObj.hoverViewStyle,false)
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
        const {css,hover,isHover} = this.state
        let cssList = css.split(/[:;]/g);
        let hoverList = hover.split(/[:;]/g);
        let cssObj = {},
            hoverObj = {};
        for (let i=0;i<cssList.length;i+=2){
            if (/^[0-9]/.test(cssList[i])){
                continue;
            }
            cssObj[cssList[i].trim()] = cssList[i+1]
        }
        for (let i=0;i<hoverList.length;i+=2){
            if (/^[0-9]/.test(hoverList[i])){
                continue;
            }
            hoverObj[hoverList[i].trim()] = hoverList[i+1]
        }
        if (isHover){
            return Object.assign(cssObj,hoverObj);
        } else {
            return cssObj;
        }

    };

    ok = ()=>{
        let {className,tag,parentClass,relation,css,hover} = this.state;
        const {classObj,updateClassList,addClassList,cancel} = this.props;
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
        if (classObj){
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

        cancel();

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
        const {cancel} = this.props;
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
        cancel()
    };

    getCssContent = (val,isTab)=>{
        let style = '';
        for (let i in val){
            style += `${isTab?'\t':''}${i}:${val[i]};`
        }
        return style
    };

    render() {
        const {classObj,showClassesModal,classList} = this.props;
        const {isClassNameError,tag,className,parentClass,relation,css,hover} = this.state;
        return (
            <Modal title={classObj?classObj.className:'新建样式类'} width={1200}
                   className={'classesModal modals'}
                   visible={showClassesModal}
                   cancelText={'关闭'}
                   okText={classObj?'确认':'添加'}
                   onOk={this.ok}
                   onCancel={this.cancel}
            >
                <div className={'content_wp'}>

                    <div className={'content'}>
                        <div className={'modal_item'}>
                            <span>标签与类名</span>
                            <div>
                                <Input placeholder={'类名'}
                                       className={isClassNameError?'error':''}
                                       addonBefore={
                                           <Select value={tag} style={{width:100}} onChange={e=>this.setState({tag:e})}>
                                               <Option value="none">不指定</Option>
                                               {cssPropKeys.map((item)=><Option value={item}>{item}</Option>)}
                                           </Select>
                                       }
                                       value={className}
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
                                    parentClass !== 'none' ? Object.entries( classList[classList.findIndex((item)=>item.className===parentClass)].viewStyle).map((i)=>{
                                        return `${i[0].replace(/[A-Z]/g,w=>'-'+w.toLowerCase())}: ${i[1]};\n`
                                    }):''
                                }
                                         overlayStyle={{whiteSpace:'pre-wrap',fontFamily:'codeSaver, monospace',fontSize:'13px'}}
                                         placement={'rightTop'}
                                >
                                    <Select value={parentClass} style={{width:150}} onChange={(e)=>this.setState({parentClass:e})}>
                                        <Option value="none">全局</Option>
                                        {
                                            classList.map(item=><Option value={item.className}>{item.className}</Option>)
                                        }
                                    </Select>
                                </Tooltip>
                            </div>
                        </div>
                        {parentClass === 'none'
                            ?
                            null
                            :
                            <div className={'modal_item'}>
                                <span>从属关系</span>
                                <div>
                                    <Select value={relation} style={{width:150}} onChange={(e)=>this.setState({relation:e})}>
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
                                                  value={css.replace(/;(?<!;$)/g,';\n')}
                                                  onChange={e=>this.setState({css:e.target.value.replace(/[\n\t]/g,'')})}>
                                        </textarea>
                                    </TabPane>
                                    <TabPane tab={'hover'} key={'hover'}>
                                        <textarea className={'code_wp'}
                                                  value={hover.replace(/;(?<!;$)/g,';')}
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
                                `${parentClass === 'none' ? '' : '.' + parentClass + ' ' + relation + ' '}${tag === 'none' ? '' : tag}${className === '' ? '' : '.'}${className}{\n\t${css.replace(/;(?<!;$)/g, ';\n\t')}\n}\n` +
                                `${hover === ''
                                    ? ''
                                    : `${parentClass === 'none' ? '' : '.' + parentClass + ' ' + relation + ' '}${tag === 'none' ? '' : tag}${className === '' ? '' : '.'}${className}:hover{\n\t${hover.replace(/;(?<!;$)/g, ';\n\t')}\n}`}`
                            }
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

}

function mapStateToProps(state) {
    const {classList} = state;
    return {classList}
}

function mapDispatchToProps() {
    return {
        addClassList,
        updateClassList
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ClassesModal)
