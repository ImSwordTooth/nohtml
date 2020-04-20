import React,{PureComponent} from 'react'
import store from '../../../../store'
import '../css/animationModal.less'
import {Input, InputNumber, Modal, Select, Steps, message, Switch, AutoComplete, Tooltip, Button, Icon} from "antd";
import {dataSource, dataSourceKeys} from "../../../../data/cssTable";
import {connect} from 'react-redux'
import {autoSelectAll, getComputedCss} from "../../../../common/units";
const { Step } = Steps;
const { Option } = Select;

class AnimationModal extends PureComponent{

    state = {
        // framesList:['0%','50%','100%'],



        mode:true,                   //增删keyframes的模式
        framesContent:{
            '0%':{
                backgroundColor:'#000000'
            },
            '50%':{
                backgroundColor:'#ff0000'
            },
            '100%':{
                backgroundColor:'#000000'
            }
        },
        editingValue:'',              //正在编辑的属性值
        animationKeyframesCode:'',                  //@keyframes代码
        animationCssCode:'',                         //css中animation的代码
        animationName:'',                           //@keyframes的名字
        animationDuring:'',
        animationDuringUnit:'s',
        animationDelay:'',
        animationDelayUnit:'s',
        animationTimingFunction:'linear',
        isInfinite:true
    }

    //如果选择了一个元素，就把这个元素显示在展示区
    createNodes = (val) => {
        const {showAnimationModal} = this.props
        if (showAnimationModal && JSON.stringify(val)!=='{}'){
            let {key, children, type,trueStyle,content,props} = val;
            let className = '';
            if (props.className){
                className += props.className;
                trueStyle = getComputedCss(val,'trueStyle');
            }
            if (children!==undefined){
                return React.createElement(
                    type || 'div',
                    {
                        id:'preview'+key,
                        key,
                        style:{...trueStyle,animation:this.getAnimationCsscode()},
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
                        style:{...trueStyle,animation:this.getAnimationCsscode()},
                        src:props.src?props.src:null,
                        type:props.type?props.type:null,
                        className
                    }

                )
            }
        }
    };

    //点击了“add...”按钮添加属性
    addProp = (node)=>{
        this.setState({
            addingNode:node
        })
    };

    //完成添加属性的操作，分为智能模式和手动模式
    finishAdd = (node)=>{
        let {framesContent,newStyleName,newStyleValue,mode} = this.state;
        if (newStyleName===''||newStyleValue===''){
            message.error('属性和属性值不能为空！');
            return;
        }
        if (Object.keys(framesContent[node]).includes(newStyleName)) {
            message.error('属性重复！');
            return;
        }
        if (mode) {
            for (let i in framesContent){
                framesContent[i][newStyleName] = newStyleValue
            }
        }else {
            framesContent[node][newStyleName] = newStyleValue
        }

        this.setState({
            framesContent,
            addingNode:'',
            newStyleName:'',
            newStyleValue:''
        })
    };

    //取消添加属性
    cancelAdd = ()=>{
        this.setState({
            addingNode:'',
            newStyleName:'',
            newStyleValue:''
        })
    };

    //删除属性，分为智能模式和手动模式
    deleteProp = (node,prop)=>{
        let {framesContent,mode} = this.state;
        if (mode) {
            for (let i in framesContent){
                delete framesContent[i][prop];
            }
        }else {
            delete framesContent[node][prop];
        }
        this.setState({
            framesContent
        })
    };

    getAnimationCsscode = ()=>{
        let {animationName,animationTimingFunction,animationDuring,animationDuringUnit,animationDelay,animationDelayUnit,isInfinite} = this.state;
        if (animationName===''){
            animationName = 'anonymous';
        }
        let during = animationDuring===''?'':' '+animationDuring+animationDuringUnit;
        let delay = animationDelay===''?'':' '+animationDelay+animationDelayUnit;
        let infinite = isInfinite?' infinite':'';
        return `${animationName} ${animationTimingFunction} ${during} ${delay} ${infinite}`;
    }

    changeAnimationKeyframesCode = (value)=>{
        const {animationName,framesContent} = this.state
        let str = '';
        if (value === undefined){
            str = `@keyframes ${animationName===''?'anonymous':animationName} {\n`;
        }else {
            str = `@keyframes ${value===''?'anonymous':value} {\n`;
        }

        for (let i in framesContent){
            str += `\t${i} {\n`;
            Object.entries(framesContent[i]).forEach(item=>{
                str += `\t\t${item[0].replace(/[A-Z]/g,w=>'-'+w.toLowerCase())}:${item[1].replace(/\d+px/g,function (num) {
                    return parseInt(num)/14*0.6+'rem'
                })};\n`;
            });
            str +='\t}\n'
        }
        str += '}';
        console.log(str)
        let css = document.styleSheets[0];
        css.deleteRule(0)
        css.insertRule(str, 0)
    }


    changeAnimationName = (e)=>{
        let name = e.target.value
        this.setState({animationName:name});
        this.changeAnimationKeyframesCode(name);
    };

    changeAnimationDuring = (e)=>{
        this.setState({animationDuring:e.target.value})
    }

    changeAnimationDuringUnit = (e) =>{
        this.setState({animationDuringUnit:e})
    }

    changeAnimationDelay = (e)=>{
        this.setState({animationDelay:e.target.value})
    }

    changeAnimationDelayUnit = (e)=>{
        this.setState({animationDelayUnit:e})
    }

    changeInfinite = (e) =>{
        this.setState({isInfinite:e})
    }

    changeAnimationTimingFunction = (e)=>{
        this.setState({animationTimingFunction:e})
    }


    changeMode = (status)=>{
        this.setState({mode:status})
    };

    // changeFramesList = (list)=>{
    //     this.setState({framesList:list})
    // }

    changeFramesContent = (content)=>{
        this.setState({
            framesContent:content
        },this.changeAnimationKeyframesCode)
    }

    render() {

        const {showAnimationModal,cancel,selectedTag} = this.props
        const {animationName,animationDuring,animationDuringUnit,animationDelay,animationDelayUnit,animationTimingFunction,framesList,mode,framesContent} = this.state

        return(
            <Modal title={'自定义动画'} width={1000}
                   className={'animationModal modals'}
                   visible={showAnimationModal}
                   cancelText={'取消'}
                   okText={'添加'}
                   onCancel={cancel}
            >
                <div>
                    <div className={'currentTag'}>
                        {JSON.stringify(selectedTag)==='{}'?<div className={'block'} style={{animation:this.getAnimationCsscode()}}/>:this.createNodes(selectedTag)}
                    </div>
                    <div className={'modal_item'}>
                        <span>动画名称</span>
                        <div>
                            <Input value={animationName} placeholder={'不能以数字开头'} onChange={this.changeAnimationName}/>
                        </div>
                    </div>
                    <div className={'modal_item'}>
                        <span>持续时间</span>
                        <div>
                            <Input value={animationDuring} onChange={this.changeAnimationDuring} style={{width:150}}
                                   addonAfter={
                                       <Select defaultValue={animationDuringUnit} onChange={this.changeAnimationDuringUnit} style={{width:60}}>
                                           <Option value="s">s</Option>
                                           <Option value="ms">ms</Option>
                                       </Select>}
                            />
                        </div>
                    </div>
                    <div className={'modal_item'}>
                        <span>延迟</span>
                        <div>
                            <Input value={animationDelay} onChange={this.changeAnimationDelay} style={{width:150}} addonAfter={
                                <Select defaultValue={animationDelayUnit} onChange={this.changeAnimationDelayUnit} style={{width:60}}>
                                    <Option value="s">s</Option>
                                    <Option value="ms">ms</Option>
                                </Select>}/>
                        </div>
                    </div>
                    <div className={'modal_item'}>
                        <span>无限循环</span>
                        <div>
                            <div className={'checkbox_wp'}>
                                <Switch defaultChecked onChange={this.changeInfinite}/>
                                <Tooltip title={'由于“非无限”会导致动画只播放一次，因此建议一直开启“无限”以查看效果，实际情况下由你定制'}>
                                    <i className={'iconfont iconhelp'} style={{marginLeft:'10px'}}/>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <div className={'modal_item'}>
                        <span>过渡函数</span>
                        <div>
                            <Select defaultValue={animationTimingFunction} onChange={this.changeAnimationTimingFunction} style={{width:150}}>
                                <Option value={'linear'}>linear</Option>
                                <Option value={'ease'}>ease</Option>
                                <Option value={'ease-in'}>ease-in</Option>
                                <Option value={'ease-out'}>ease-out</Option>
                                <Option value={'ease-in-out'}>ease-in-out</Option>
                                <Option value={'step-start'}>step-start</Option>
                            </Select>
                        </div>
                    </div>
                    <div className={'modal_item'}>
                        <span>关键帧</span>
                        <div className={'frames'}>
                            <div className={'mode'}>
                                <Switch checkedChildren={'智能'}
                                        unCheckedChildren={'手动'}
                                        checked={mode}
                                        onChange={this.changeMode}/>
                                <Tooltip title={'若选中智能模式，则每次增删属性会作用在所有关键帧上，后续只需修改属性值即可，建议勾选'} placement="topLeft">
                                    <i className={'iconfont iconhelp'} style={{marginLeft:'10px'}}/>
                                </Tooltip>
                            </div>
                            <Steps progressDot current={framesContent.length} direction="vertical">
                                {Object.entries(framesContent).map((item,index)=>{
                                    return <Step key={index} title={item[0]}
                                                 // description={this.cssContent(item,framesList[index+1])}
                                                 description={<CssContent current={item[0]}
                                                                          next={index !== Object.entries(framesContent).length-1}
                                                                          mode={mode}
                                                                          framesList={Object.keys(framesContent)}
                                                                          content={JSON.parse(JSON.stringify(item[1]))}
                                                                          framesContent={JSON.parse(JSON.stringify(framesContent))}
                                                                          update={this.changeFramesContent}
                                                                          // changeList={this.changeFramesList}
                                                 />}
                                    />
                                })}
                            </Steps>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

class CssContent extends PureComponent{

    state = {
        addingNode:'',              //正在添加属性的节点
        editingNode:'',             //正在编辑的节点
        editingProp:'',              //正在编辑的属性
        newStyleName:'',
        newStyleValue:'',
        addFrameNode:'',             //正在插入关键帧的节点
        newFrame:'',
    }

    //删除属性，分为智能模式和手动模式
    deleteProp = (e)=>{
        const {current,mode,update,framesContent} = this.props
        const prop = e.target.dataset.prop
        if (mode) {
            for (let i in framesContent){
                delete framesContent[i][prop];
            }
        }else {
            delete framesContent[current][prop];
        }
        update(framesContent)
    };

    handleBlur = ()=>{
        this.setState({
            editingNode:'',
            editingProp:''
        })
    }

    handleClick = (e)=>{
        const {current} = this.props
        const prop = e.target.dataset.prop
        this.setState({
            editingNode:current,
            editingProp:prop
        })
    }

    //修改属性值
    editNode = (e)=>{
        const {editingNode,editingProp} = this.state;
        const {update,framesContent} = this.props
        framesContent[editingNode][editingProp] = e;
        update(framesContent)
    };

    //完成添加属性的操作，分为智能模式和手动模式
    finishAdd = ()=>{
        let {newStyleName,newStyleValue} = this.state;
        const {mode,current,update,framesContent} = this.props
        if (newStyleName===''||newStyleValue===''){
            message.error('属性和属性值不能为空！');
            return;
        }
        if (Object.keys(framesContent[current]).includes(newStyleName)) {
            message.error('属性重复！');
            return;
        }
        if (mode) {
            for (let i in framesContent){
                framesContent[i][newStyleName] = newStyleValue
            }
        }else {
            framesContent[current][newStyleName] = newStyleValue
        }

        this.setState({
            addingNode:'',
            newStyleName:'',
            newStyleValue:''
        },update(framesContent))
    };

    //取消添加属性
    cancelAdd = ()=>{
        this.setState({
            addingNode:'',
            newStyleName:'',
            newStyleValue:''
        })
    };

    //点击了“add...”按钮添加属性
    addProp = ()=>{
        const {current} = this.props
        console.log(this.state.addingNode)
        this.setState({
            addingNode:current
        },()=>{
            console.log(this.state.addingNode)
        })

    };

    //添加关键帧
    addFrame = ()=>{
        const {newFrame} = this.state;
        const {current,mode,framesList,changeList,update,framesContent} = this.props
        if (mode) {
            framesContent[newFrame+'%'] = Object.assign({},framesContent[current]);
        }else {
            framesContent[newFrame+'%'] = {};
        }
        let list = [...framesList];
        list.push(newFrame+'%');
        this.setState({
            addFrameNode:'',
            newFrame:''
        },()=>{
            // changeList(list.sort((a,b)=>parseInt(a)-parseInt(b)))
            update(framesContent)
        })
    };

    //取消添加关键帧
    cancelFrame = ()=>{
        this.setState({
            addFrameNode:'',
            newFrame:''
        })
    };

    addKeyFrames = ()=>{
        const {current,next} = this.state
        this.setState({
            addFrameNode:current,
            newFrame:(parseInt(next)+parseInt(current))/2+''
        })
    }

    changeNewStyleName = (e)=>{
        this.setState({newStyleName:e})
    }

    changeNewStyleValue = (e)=>{
        this.setState({newStyleValue:e})
    }

    changeNewFrame = (e)=>{
        this.setState({newFrame:e+''})
    }

    render() {
        const {addingNode,editingNode,editingProp,newStyleName,newStyleValue,addFrameNode,newFrame} = this.state
        let {current,next,framesContent,content} = this.props
        console.log('render??')

        return (
            <div>
                <div className={`cssContent ${addingNode === current ? 'open' : ''}`}>
                    <ul className={'cssList'}>
                        {
                            Object.entries(content).sort().map((item,index)=>{
                                return (
                                    <li key={index}>
                                        <i className={'iconfont icondelete delete'} data-prop={item[0]} onClick={this.deleteProp}/>
                                        <span className={'key'}>{item[0]}：</span>
                                        {
                                            editingNode === current && editingProp === item[0]
                                                ? <AutoComplete autoFocus={true}
                                                            dataSource={dataSource[item[0]] === undefined ? [] : dataSource[item[0]].sort()}
                                                            filterOption={(inputValue, option) =>
                                                                option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                            }
                                                            children={<Input width={120} value={item[1]} onBlur={this.handleBlur}/>}
                                                            value={item[1]}
                                                            onChange={this.editNode}
                                                />
                                                : <span className={'value'} data-prop={item[0]} onClick={this.handleClick}>{item[1]}</span>
                                        }
                                    </li>
                                )
                            })
                        }
                        <li>
                            {
                                addingNode === current
                                    ?
                                        <div>
                                            <AutoComplete autoFocus={true}
                                                          dataSource={dataSourceKeys.sort()}
                                                          filterOption={(inputValue, option) =>
                                                              option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                          }
                                                          children={<input className={'autoCompleteInput'} id={'newStyleName'} style={{width:120}} placeholder={'新建属性'} onFocus={autoSelectAll}/>}
                                                          backfill={true}
                                                          value={newStyleName}
                                                          onChange={this.changeNewStyleName}

                                            />
                                            <AutoComplete dataSource={dataSource[newStyleName] === undefined ? [] : dataSource[newStyleName].sort()}
                                                          filterOption={(inputValue, option) =>
                                                              option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                          }
                                                          children={<input className={'autoCompleteInput'} id={'newStyleValue'} style={{width:120,marginLeft:'10px'}} placeholder={'属性值'} onFocus={autoSelectAll}/>}
                                                          backfill={true}
                                                          value={newStyleValue}
                                                          onChange={this.changeNewStyleValue}
                                            />
                                            <i className={'iconfont iconcurrent ok'} onClick={this.finishAdd}/>
                                            <i className={'iconfont icondelete cancel'} onClick={this.cancelAdd}/>
                                        </div>
                                    :<Button type="primary" size={'small'} style={{marginTop:'10px'}} ghost onClick={this.addProp}>add...</Button>
                            }
                        </li>
                    </ul>
                </div>
                {
                    next
                        ? <></>
                        : addFrameNode === current
                            ? <div>
                                <InputNumber formatter={value => `${value}%`}
                                             size={'small'}
                                             autoFocus={true}
                                             style={{margin:'5px 10px 0 0'}}
                                             parser={value => value.replace('%', '')}
                                             value={newFrame}
                                             min={parseInt(current)} max={parseInt(next)} onChange={this.changeNewFrame}/>
                                <Button type={'primary'} style={{marginRight:'5px'}} size={'small'} onClick={this.addFrame}>插入</Button>
                                <Button type={'danger'} size={'small'} onClick={this.cancelFrame}>取消</Button>
                              </div>
                            :<Button type={'link'} onClick={this.addKeyFrames}>插入关键帧</Button>

                }
            </div>
        )
    }

}

function mapStateToProps(state) {
    const {selectedTag} = state;
    return {selectedTag}
}

export default connect(mapStateToProps)(AnimationModal) ;
