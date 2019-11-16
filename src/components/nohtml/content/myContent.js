import React from 'react'
import {Collapse, Drawer, Input, Tag,Tooltip,AutoComplete,Select} from 'antd'

import './myContent.less'
import store from '../../../store'
import {changeDrawer, updateTag} from "../../../store/action";
import {dataSource,defaultCssProp,dataSourceKeys} from "../../../untils/cssTable";

const {TextArea} = Input;
const { Panel } = Collapse;
const {Option} = Select;


class myContent extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            isReName:false,
            editingStyleName:'',        //当前正在编辑的样式的名字，同一时间只能编辑一个
            editingStyleValue:'',        //当前正在编辑的样式的值
            newStyleName:'',            //新建样式属性名
            newStyleValue:'',            //新建样式属性值
            newPanelList:[':hover',':link',':active',':visited',':first-child',':']
        });
        store.subscribe(this.listener)
    }

    listener = () => {
        let newState = store.getState();
        this.setState(newState);
    };

    componentDidMount() {

    }
    componentWillUnmount() {

    }


    closeDrawer = ()=>{
        changeDrawer(false)
    };

    changeContent = (e)=>{
        updateTag({
            prop:'content',
            value:e.target.value
        })
    };

    //重命名
    reName = (e)=>{
        updateTag({
            prop:'dataName',
            value:e.target.value
        })
    };

    drawerTitle = ()=>{
        let selectedTag = this.state.selectedTag;
        let title = null;
        if (this.state.isReName){
            title = <Input value={selectedTag.dataName} style={{width:120}} onChange={this.reName} onPressEnter={()=>this.setState({isReName:false})}/>;
        }else{
            title = (
                    <>
                        <span className={'title'}>{selectedTag.dataName}</span>
                        <i className={'iconfont iconrename rename'} onClick={()=>this.setState({isReName:true})}/>
                        <Tag>{selectedTag.type}</Tag>
                    </>
            );
        }
        return (
            <div className={'drawerTitle'}>
                <i className={`iconfont icon${selectedTag.type}`} />
                {title}
            </div>
        )

    };

    changeEditing = (name,value)=>{
        if (name!==''){
            //如果点击了属性值，就添加一个监听器，监听鼠标事件
            document.addEventListener('mousedown', this.handleClickOutside, false);
        }
        this.setState({
            editingStyleName:name,
            editingStyleValue:value
        })
    };

    addNewPanel = (e)=>{
        console.log(e)
    };

    //点击外部重置为空
    handleClickOutside=(e)=> {
        //如果用户点击的不是正在编辑的input
        if (e.target.className!=='autoCompleteInput'){
            //就把正在编辑的内容置为空--
            this.setState({
                editingStyleName: '',
                editingStyleValue:'',
                newStyleName:'',
                newStyleValue:''
            });
            //然后移除监听器
            document.removeEventListener('mousedown', this.handleClickOutside, false);
        }
    };

    drawerContent = ()=>{
        let selectedTag = this.state.selectedTag;


        if (JSON.stringify(selectedTag)!=='{}') {
            let props = Object.assign({},selectedTag.props),
                css = Object.assign({},selectedTag.viewStyle);
            let defaultCssArr = defaultCssProp[selectedTag.type]||defaultCssProp.div;
            // console.log(this.state.selectedTag.style)
            // console.log(getComputedStyle(document.getElementById(selectedTag.key), null))


                    defaultCssArr.map(item=>{

                        if (!css[item]){
                            /**
                             * Elt.style只能获取行内样式，要想使用计算过的样式，要用getComputedStyle(Ele,pseudoElt)。
                             * 此处把非行内样式做了一个标记，在后面添加了一个“#”，不影响排序的情况下判断该属性是否是行内属性，输出的时候把“#”替换成“”即可
                             * */
                            css[item+'#'] = getComputedStyle(document.getElementById(selectedTag.key), null)[item];
                        }
                        /**
                         * 此处是想把不合规则的属性标记为红色，但是判断起来并不简单。暂时搁置，以后再写或者直接砍掉。
                         * 下方关于&的正则判断暂未删除
                         * */
                        /*else if (this.state.selectedTag.style[item]&&getComputedStyle(document.getElementById(selectedTag.key), null)[item]=='') {
                            css[item+'&'] = css[item];
                            delete css[item];
                        }
                        console.log(getComputedStyle(document.getElementById(selectedTag.key), null).display)
                        console.log(this.state.selectedTag.style.display)*/
                    });


                return (
                    <div>
                        <TextArea value={this.state.selectedTag.content} style={{marginBottom:'10px'}} onChange={(e) => this.changeContent(e)}/>
                        <Collapse expandIconPosition={'right'} bordered={false} defaultActiveKey={['1','2']}>
                            <Panel key={1} header={'属性'} style={{background: '#f7f7f7',borderRadius: 4, marginBottom: 10,border: 0,overflow: 'hidden',borderTop:'solid 4px rgba(218, 218, 218, 0.34)'}}>
                                <ul className={'drawerUl'}>
                                    {[...Object.entries(selectedTag.props)].map((item,index) => {
                                        return (
                                            <li key={index}>
                                                <div className={'key'}>{item[0].replace(/[#&]/g,'')}</div>
                                                <div className={'value'} onClick={()=>this.changeEditing(item[0].replace(/[#&]/g,''),item[1])}>
                                                    <span>{item[1]}</span>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Panel>
                            <Panel key={2} header={'CSS'}
                                   style={{background: '#f7f7f7',borderRadius: 4, marginBottom: 10,border: 0,overflow: 'hidden',borderTop:'solid 4px rgba(218, 218, 218, 0.34)'}}
                                   extra={
                                       <div>
                                           {/*<i className={'iconfont iconadd'}/>*/}
                                           <Tooltip placement='topLeft'
                                                    title={<span><span style={{color:'#949494'}}>深色</span>代表用户自定义样式；<span style={{color:'#d4d4d4'}}>浅色</span>代表计算后的样式。<br/><span><strong>修改</strong>：单击属性值（您应该始终使用<i>全选</i>来修改属性值）</span><br/><span><strong>删除</strong>：ctrl+单击属性名</span></span>}><i className={'iconfont iconhelp'}/>
                                           </Tooltip>
                                       </div>}>
                                <ul className={'drawerUl'}>
                                    {/*<li>*/}
                                    {[...Object.entries(css)].sort().map((item,index) => {
                                        let borderLeft = '';
                                        if (item[0].match(/#/)) {
                                            borderLeft = 'solid 3px #d4d4d4';
                                        }else if (item[0].match(/&/)) {
                                            borderLeft = 'solid 3px #cc3232'
                                        }

                                        if (item[1]!==''){
                                            return (
                                                <li style={{borderLeft}} key={index}>
                                                    <div className={'key'}>{item[0].replace(/[#&]/g,'')}</div>
                                                    <div className={'value'} onClick={()=>this.changeEditing(item[0].replace(/[#&]/g,''),item[1])}>
                                                        {this.state.editingStyleName===item[0].replace(/[#&]/g,'')
                                                            ?<Tooltip trigger={['focus']} title={item[1]} placement="topLeft">
                                                                <AutoComplete
                                                                    autoFocus={true}
                                                                    dataSource={dataSource[item[0].replace(/[#&]/g,'')].sort()}
                                                                    filterOption={(inputValue, option) =>{
                                                                            let arr = inputValue.toUpperCase().split(' ');
                                                                            return option.props.children.toUpperCase().indexOf(arr[arr.length-1])!==-1
                                                                        }
                                                                    }
                                                                    children={<input className={'autoCompleteInput'} id={'editingInput'} onFocus={(e)=>{e.target.select()}}/>}
                                                                    backfill={true}
                                                                    value={item[1]}
                                                                    onChange={(e)=>{
                                                                        if (!/\d+px/.test(e)){
                                                                            updateTag({
                                                                                prop:'style',
                                                                                innerProp:item[0].replace(/[#&]/g,''),
                                                                                value:e
                                                                            })
                                                                        }else {
                                                                            updateTag({
                                                                                prop:'trueStyle',
                                                                                innerProp:item[0].replace(/[#&]/g,''),
                                                                                value:e.replace(/\d+px/g,function (i) {
                                                                                    return parseInt(i)/14*0.6+'rem'
                                                                                })
                                                                            });
                                                                            updateTag({
                                                                                prop:'viewStyle',
                                                                                innerProp:item[0].replace(/[#&]/g,''),
                                                                                value:e
                                                                            })
                                                                        }
                                                                    }}
                                                                    onSelect={(e)=> {
                                                                        updateTag({
                                                                            prop: 'style',
                                                                            innerProp: item[0].replace(/[#&]/g, ''),
                                                                            value: window.event.target.value.replace(/(?<=\s*)\w+\b$/g,e)
                                                                        })
                                                                    }}
                                                                    onBlur={()=>this.changeEditing('','')}/>
                                                            </Tooltip>
                                                            :<span>{item[1]}</span>}
                                                    </div>

                                                </li>
                                            )
                                        }

                                    })}
                                    {/*</li>*/}
                                    <li>
                                        <div className={'key'}>
                                            <Tooltip trigger={['focus']} title={this.state.newStyleName} placement="topLeft">
                                                <AutoComplete
                                                    // autoFocus={true}
                                                    dataSource={dataSourceKeys.sort()}
                                                    filterOption={(inputValue, option) =>
                                                        option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                    }
                                                    children={<input className={'autoCompleteInput'} id={'newStyleName'} style={{width:120}} placeholder={'新建属性'} onFocus={(e)=>{e.target.select()}}/>}
                                                    backfill={true}
                                                    value={this.state.newStyleName}
                                                    onChange={(e)=>{this.setState({newStyleName:e})}}
                                                    onBlur={()=>{
                                                        if (this.state.newStyleName !=='' && this.state.newStyleValue !== ''){
                                                            updateTag({
                                                                prop:'style',
                                                                innerProp:this.state.newStyleName,
                                                                value:this.state.newStyleValue
                                                            });
                                                            this.setState({
                                                                newStyleName:'',
                                                                newStyleValue:''
                                                            })
                                                        }
                                                    }}
                                                />
                                            </Tooltip>
                                        </div>
                                        <div className={'value'}>
                                            <Tooltip trigger={['focus']} title={this.state.newStyleValue===''?'':this.state.newStyleValue} placement="topLeft">
                                                <AutoComplete
                                                    // autoFocus={true}
                                                    dataSource={dataSource[this.state.newStyleName]===undefined?[]:dataSource[this.state.newStyleName].sort()}
                                                    filterOption={(inputValue, option) =>
                                                        option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                    }
                                                    children={
                                                        <input className={'autoCompleteInput'} id={'newStyleValue'} style={{width:120}} placeholder={'属性值'}
                                                                onFocus={(e)=>{e.target.select()}}
                                                                onKeyDown={(e)=>{
                                                                    if (e.key === 'Tab'){
                                                                        e.preventDefault();
                                                                        updateTag({
                                                                            prop:'style',
                                                                            innerProp:this.state.newStyleName,
                                                                            value:this.state.newStyleValue
                                                                        });
                                                                        this.setState({
                                                                            newStyleName:'',
                                                                            newStyleValue:''
                                                                        });
                                                                        document.getElementById('newStyleName').focus();
                                                                    }
                                                                }}
                                                        />}
                                                    backfill={true}
                                                    value={this.state.newStyleValue}
                                                    onChange={(e)=>{
                                                        this.setState({newStyleValue:e})
                                                    }}
                                                    onBlur={()=>{
                                                        if (this.state.newStyleName !=='' && this.state.newStyleValue !== ''){
                                                            updateTag({
                                                                prop:'style',
                                                                innerProp:this.state.newStyleName,
                                                                value:this.state.newStyleValue
                                                            });
                                                            this.setState({
                                                                newStyleName:'',
                                                                newStyleValue:''
                                                            })
                                                        }
                                                    }}
                                                />
                                            </Tooltip>
                                        </div>
                                    </li>
                                </ul>
                            </Panel>
                            <Panel key={3}
                                   disabled={true}
                                   header={
                                       <div>
                                           <Select defaultValue="lucy" style={{ width: 120 }} onFocus={(e)=>console.log(e)} onChange={(e)=>this.addNewPanel(e)}>
                                               <Option value="jack">Jack</Option>
                                               <Option value="lucy">Lucy</Option>
                                               <Option value="disabled" disabled>
                                                   Disabled
                                               </Option>
                                               <Option value="Yiminghe">yiminghe</Option>
                                           </Select>
                                           <button>完成</button>
                                       </div>

                                    }
                                   style={{background: '#f7f7f7',borderRadius: 4, marginBottom: 10,border: 0,overflow: 'hidden',borderTop:'solid 4px rgba(218, 218, 218, 0.34)'}}/>
                        </Collapse>
                    </div>
                )
        }
    };

    createNodes = ({key, pid, children, type,trueStyle,content,props}) => {
        let className = '';
        if (props.className){
            className += props.className;
        }
        if (children!==undefined){
            return React.createElement(
                type || 'div',
                {
                    id:key,
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
                    id:key,
                    key,
                    style:{...trueStyle},
                    src:props.src?props.src:null,
                    type:props.type?props.type:null,
                    className
                }

            )
        }

    };

    mask = ()=>{
        if (this.state.hoveredTagKey!==''){
            let ele = document.getElementById(this.state.hoveredTagKey);
            if(ele){
                let style = {
                    width:ele.clientWidth,
                    height:ele.clientHeight,
                    left:ele.getBoundingClientRect().left,
                    top:ele.getBoundingClientRect().top
                };
                return <div className={'mask'} style={style}/>
            }
        }

    };

    render() {

        const content = this.state.tagList.children;

        return (
            <div className={'container_wp'} id={'container_wp'}>

                <div className={`container ${this.state.showDrawer?'operation_open':''}`} id={'0'} style={{width:'60vw',height:'60vh'}}>
                    {content.map(val => this.createNodes(val))}
                    {this.mask()}
                </div>
                <Drawer
                    className={'operation_wp'}
                    id={'Drawer'}
                    title={this.drawerTitle()}
                    placement="right"
                    closable={true}
                    onClose={this.closeDrawer}
                    visible={this.state.showDrawer}
                    mask={false}
                    getContainer={()=>document.getElementById('0')}
                    // width={'20vw'}
                    width={400}
                >
                    {this.drawerContent()}
                </Drawer>
            </div>
        )
    }
}

export default myContent
