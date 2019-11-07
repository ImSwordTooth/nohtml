import React from 'react'
import store from '../../../../store'
import '../css/animationModal.less'
import {Affix, Input, InputNumber, Modal, Select, Steps, message, Switch, AutoComplete, Tooltip, Button, Icon} from "antd";
import {dataSource, dataSourceKeys} from "../../../../untils/cssTable";
import {updateTag} from "../../../../store/action";
const { Step } = Steps;
const { Option } = Select;

class AnimationModal extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            framesList:['0%','50%','100%'],
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
            addingNode:'',              //正在添加属性的节点
            newStyleName:'',
            newStyleValue:'',
            mode:true,                   //增删keyframes的模式
            addFrameNode:'',             //正在插入关键帧的节点
            newFrame:'',
            editingNode:'',             //正在编辑的节点
            editingProp:'',              //正在编辑的属性
            editingValue:'',              //正在编辑的属性值
            animationKeyframesCode:'',                  //@keyframes代码
            animationCssCode:'',                         //css中animation的代码
            animationName:'',                           //@keyframes的名字
            animationDuring:'',
            animationDuringUnit:'s',
            animationDelay:'',
            animationDelayUnit:'s',
            animationTimingFunction:'linear',
            isInfinite:true,

        })
        store.subscribe(this.listener)
    }

    listener = () => {
        let newState = store.getState();
        this.setState(newState);
    };

    //如果选择了一个元素，就把这个元素显示在展示区
    createNodes = (val) => {
        if (this.props.showAnimationModal && JSON.stringify(val)!=='{}'){
            let {key, pid, children, type,trueStyle,content,props} = val;
            console.log({...trueStyle})
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
        let framesContent = this.state.framesContent;
        if (this.state.newStyleName===''||this.state.newStyleValue===''){
            message.error('属性和属性值不能为空！');
            return;
        }
        if (Object.keys(framesContent[node]).includes(this.state.newStyleName)) {
            message.error('属性重复！');
            return;
        }
        if (this.state.mode) {
            for (let i in framesContent){
                framesContent[i][this.state.newStyleName] = this.state.newStyleValue
            }
        }else {
            framesContent[node][this.state.newStyleName] = this.state.newStyleValue
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
        let framesContent = this.state.framesContent;
        if (this.state.mode) {
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

    //选择模式
    changeMode = (status)=>{
        this.setState({
            mode:status
        })
    };

    //添加关键帧
    addFrame = (node)=>{
        let framesContent = this.state.framesContent;
        if (this.state.mode) {
            framesContent[this.state.newFrame+'%'] = Object.assign({},framesContent[node]);
        }else {
            framesContent[this.state.newFrame+'%'] = {};
        }
        let framesList = [...this.state.framesList];
        framesList.push(this.state.newFrame+'%');
        this.setState({
            framesContent,
            framesList:framesList.sort((a,b)=>parseInt(a)-parseInt(b)),
            addFrameNode:'',
            newFrame:''
        })
    };

    //取消添加关键帧
    cancelFrame = ()=>{
        this.setState({
            addFrameNode:'',
            newFrame:''
        })
    };

    //修改属性值
    editNode = (e)=>{
        let framesContent = this.state.framesContent;
        framesContent[this.state.editingNode][this.state.editingProp] = e;
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
        // return {animation:`${animationName} ${animationTimingFunction} ${during} ${delay} ${infinite}`};
        return `${animationName} ${animationTimingFunction} ${during} ${delay} ${infinite}`;
    }

    changeAnimationKeyframesCode = (value)=>{
        let str = '';
        if (value === undefined){
            str = `@keyframes ${this.state.animationName===''?'anonymous':this.state.animationName} {\n`;
        }else {
            str = `@keyframes ${value===''?'anonymous':value} {\n`;
        }

        for (let i in this.state.framesContent){
            str += `\t${i} {\n`;
            [...Object.entries(this.state.framesContent[i])].forEach(item=>{
                str += `\t\t${item[0].replace(/[A-Z]/g,w=>'-'+w.toLowerCase())}:${item[1]};\n`;
            });
            str +='\t}\n'
        }
        str += '}';
        let css = document.styleSheets[0];
        console.log(str)
        css.deleteRule(0)
        css.insertRule(str, 0)

    }

    cssContent = (current,next)=>{
        return (
            <div>
                <div className={`cssContent ${this.state.addingNode===current?'open':''}`}>
                    <ul className={'cssList'}>
                        {[...Object.entries(this.state.framesContent[current])].sort().map((item,index)=>{
                            return(
                                <li key={index}>
                                    <i className={'iconfont icondelete delete'} onClick={()=>{this.deleteProp(current,item[0]);this.changeAnimationKeyframesCode();}}/>
                                    <span className={'key'}>{item[0]}：</span>
                                    {this.state.editingNode === current && this.state.editingProp === item[0]
                                        ? <AutoComplete
                                                autoFocus={true}
                                                dataSource={dataSource[item[0]]===undefined?[]:dataSource[item[0]].sort()}
                                                filterOption={(inputValue, option) =>
                                                    option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                }
                                                children={<Input width={120} value={item[1]} onBlur={()=>this.setState({editingNode:'',editingProp:''})}/>}
                                                value={item[1]}
                                                onChange={(e)=>{this.editNode(e);this.changeAnimationKeyframesCode()}}
                                            />
                                        :<span className={'value'} onClick={()=>this.setState({editingNode:current,editingProp:item[0]})}>{item[1]}</span>
                                    }
                                </li>
                            )
                        })}
                        <li>
                            {this.state.addingNode===current
                                ?
                                    <div>

                                    <AutoComplete
                                        autoFocus={true}
                                        dataSource={dataSourceKeys.sort()}
                                        filterOption={(inputValue, option) =>
                                            option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                        children={<input className={'autoCompleteInput'} id={'newStyleName'} style={{width:120}} placeholder={'新建属性'} onFocus={(e)=>{e.target.select()}}/>}
                                        backfill={true}
                                        value={this.state.newStyleName}
                                        onChange={(e)=>{this.setState({newStyleName:e})}}
                                    />
                                    <AutoComplete
                                        dataSource={dataSource[this.state.newStyleName]===undefined?[]:dataSource[this.state.newStyleName].sort()}
                                        filterOption={(inputValue, option) =>
                                            option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                        children={
                                            <input className={'autoCompleteInput'} id={'newStyleValue'} style={{width:120,marginLeft:'10px'}} placeholder={'属性值'}
                                                   onFocus={(e)=>{e.target.select()}}
                                            />}
                                        backfill={true}
                                        value={this.state.newStyleValue}
                                        onChange={(e)=>{this.setState({newStyleValue:e});}}
                                    />
                                    <i className={'iconfont iconcurrent ok'} onClick={()=>{this.finishAdd(current);this.changeAnimationKeyframesCode()}}/>
                                    <i className={'iconfont icondelete cancel'} onClick={()=>this.cancelAdd()}/>
                                    </div>
                                :
                                    <Button type="primary" size={'small'} style={{marginTop:'10px'}} ghost onClick={()=>this.addProp(current)}>add...</Button>
                            }

                        </li>

                    </ul>
                </div>
                {next===undefined?null:
                    this.state.addFrameNode === current
                        ?<div>
                            <InputNumber formatter={value => `${value}%`}
                                         size={'small'}
                                         autoFocus={true}
                                         style={{margin:'5px 10px 0 0'}}
                                         parser={value => value.replace('%', '')}
                                         value={this.state.newFrame}
                                         min={parseInt(current)} max={parseInt(next)} onChange={(e)=>this.setState({newFrame:e+''})}/>
                            <Button type={'primary'} style={{marginRight:'5px'}} size={'small'} onClick={()=>{this.addFrame(current);this.changeAnimationKeyframesCode()}}>插入</Button>
                            <Button type={'danger'} size={'small'} onClick={()=>this.cancelFrame()}>取消</Button>
                         </div>
                        :<Button type={'link'} onClick={()=>this.setState({addFrameNode:current,newFrame:(parseInt(next)+parseInt(current))/2+''})}>插入关键帧</Button>}
            </div>
        )
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
                        {JSON.stringify(this.state.selectedTag)==='{}'?<div className={'block'} style={{animation:this.getAnimationCsscode()}}/>:this.createNodes(this.state.selectedTag)}
                    </div>
                    <div className={'modal_item'}>
                        <span>动画名称</span>
                        <div>
                            <Input value={this.state.animationName} placeholder={'不能以数字开头'} onChange={(e)=>{
                                this.setState({animationName:e.target.value});
                                this.changeAnimationKeyframesCode(e.target.value);
                            }}/>
                        </div>
                    </div>
                    <div className={'modal_item'}>
                        <span>持续时间</span>
                        <div>
                                <Input value={this.state.animationDuring} onChange={(e)=>this.setState({animationDuring:e.target.value})} style={{width:150}} addonAfter={
                                    <Select defaultValue={this.state.animationDuringUnit} onChange={(e)=>{this.setState({animationDuringUnit:e})}} style={{width:60}}>
                                        <Option value="s">s</Option>
                                        <Option value="ms">ms</Option>
                                    </Select>}/>
                        </div>
                    </div>
                    <div className={'modal_item'}>
                        <span>延迟</span>
                        <div>
                            <Input value={this.state.animationDelay} onChange={(e)=>this.setState({animationDelay:e.target.value})} style={{width:150}} addonAfter={
                                <Select defaultValue={this.state.animationDelayUnit} onChange={(e)=>{this.setState({animationDelayUnit:e})}} style={{width:60}}>
                                    <Option value="s">s</Option>
                                    <Option value="ms">ms</Option>
                                </Select>}/>
                        </div>
                    </div>
                    <div className={'modal_item'}>
                        <span>无限循环</span>
                        <div>
                            <div className={'checkbox_wp'}>
                                <Switch defaultChecked onChange={(e)=>this.setState({isInfinite:e})}/>
                                <i className={'iconfont iconhelp'} style={{marginLeft:'10px'}}/>
                            </div>
                        </div>
                    </div>
                    <div className={'modal_item'}>
                        <span>过渡函数</span>
                        <div>
                            <Select defaultValue={this.state.animationTimingFunction} onChange={(e)=>{this.setState({animationTimingFunction:e})}} style={{width:150}}>
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
                                        defaultChecked
                                        onChange={this.changeMode}/>
                                <Tooltip title={'若选中智能模式，则每次增删属性会作用在所有关键帧上，后续只需修改属性值即可，建议勾选'} placement="topLeft">
                                    <i className={'iconfont iconhelp'} style={{marginLeft:'10px'}}/>
                                </Tooltip>
                            </div>
                            <Steps progressDot current={this.state.framesList.length} direction="vertical">
                                {this.state.framesList.map((item,index)=>{
                                    return <Step key={index} title={item} description={this.cssContent(item,this.state.framesList[index+1])} />
                                })}
                            </Steps>
                        </div>
                    </div>
                </div>


            </Modal>
        )
    }

}

export default AnimationModal;
