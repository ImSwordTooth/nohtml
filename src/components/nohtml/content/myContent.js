import React from 'react'
import {Collapse, Drawer, Input, Tag,Tooltip,AutoComplete,Select} from 'antd'

import './myContent.less'
import store from '../../../store'
import {changeDrawer, updateTag} from "../../../store/action";
import {dataSource,defaultCssProp,dataSourceKeys} from "../../../data/cssTable";
import {getComputedCss} from "../../../common/units";

const {TextArea} = Input;
const { Panel } = Collapse;
const {Option} = Select;


class myContent extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            isReName:false,
            editingStyleName:'',        //当前正在编辑的样式的名字，同一时间只能编辑一个,hover的是'hover'+属性名
            editingStyleValue:'',        //当前正在编辑的样式的值
            newStyleName:'',            //新建样式属性名
            newStyleValue:'',            //新建样式属性值
            newHoverStyleName:'',       //新建hover样式属性值
            newHoverStyleValue:'',      //新建hover样式属性值
            newPanelList:[':hover',':link',':active',':visited',':first-child',':'],
            hoverId:'',                 //展示区hover的元素的id
        });
        store.subscribe(this.listener)
    }

    listener = () => {
        let newState = store.getState();
        this.setState(newState);
    };

    componentDidMount() {
        document.getElementById('content').addEventListener('scroll',this.debounce(this.getDrawerTop,100))
    }
    componentWillUnmount() {
        document.getElementById('content').removeEventListener('scroll',this.debounce);
        document.removeEventListener('mousedown', this.handleClickOutside,);
    }

    //防抖函数
    debounce = (fn,wait)=>{
        let timeout = null;
        return function(){
            if(timeout !== null){       //如果用户在wait时间内再次触发，就会清除定时器
                clearTimeout(timeout);
            }
            timeout = setTimeout(fn,wait);      //然后再重新设置定时器
        }
    };

    //动态设置抽屉的位置
    getDrawerTop = ()=>{
        let top = document.getElementById('content').scrollTop;
        if(document.getElementById('Drawer')){
            document.getElementById('Drawer').style.transform = `translateY(${top}px)`;         //使用transform的好处是可以添加动画，十分平滑不突兀
        }
    };




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

    deleteClassName = (name)=>{
        let classList = this.state.selectedTag.props.className.concat();
        classList.splice(classList.indexOf(name),1);
        updateTag({
            prop:'props',
            innerProp:'className',
            value:classList
        })
    }

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
            //类中的样式
            let classStyle = {};
            let list = this.state.classList.map(item=>item.className);
            if (selectedTag.props.className){
                selectedTag.props.className.forEach((item)=>{
                    if (list.includes(item)){
                        classStyle = Object.assign({},classStyle,this.state.classList[list.indexOf(item)].viewStyle);
                    }
                });
            }

            let props = Object.assign({},selectedTag.props),
                css = getComputedCss(selectedTag,'viewStyle');
            let hover = getComputedCss(selectedTag,'hoverViewStyle');

            let defaultCssArr = defaultCssProp[selectedTag.type]||defaultCssProp.div;


            // console.log(this.state.selectedTag.style)
            // console.log(getComputedStyle(document.getElementById(selectedTag.key), null))


                    defaultCssArr.map(item=>{

                        if (!css[item]){
                            /**
                             * Elt.style只能获取行内样式，要想使用计算过的样式，要用getComputedStyle(Ele,pseudoElt)。
                             * 此处把非行内样式做了一个标记，在后面添加了一个“#”，不影响排序的情况下判断该属性是否是行内属性，输出的时候把“#”替换成“”即可
                             * */
                            if (document.getElementById(selectedTag.key)!==null){
                                css[item+'#'] = getComputedStyle(document.getElementById(selectedTag.key), null)[item];
                            }

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
                        <Collapse expandIconPosition={'right'} bordered={false} defaultActiveKey={['1','2','3']}>
                            <Panel key={1} header={'属性'} style={{background: '#f7f7f7',borderRadius: 4, marginBottom: 10,border: 0,overflow: 'hidden',borderTop:'solid 4px rgba(218, 218, 218, 0.34)'}}>
                                <ul className={'drawerUl'}>
                                    {[...Object.entries(selectedTag.props)].map((item,index) => {
                                        return (
                                            item[0] === 'className'
                                            ?
                                                item[1].length > 0
                                                    ?
                                                    <li key={index}>
                                                        <div className={'key'}>{item[0]}</div>
                                                        <div className={'value'} onClick={()=>this.changeEditing(item[0],item[1])}>
                                                            <div>
                                                                {item[1].map((i)=>{
                                                                    return (
                                                                        <Tooltip title={
                                                                            Object.entries(this.state.classList[this.state.classList.findIndex((item)=>item.className===i)].viewStyle).map((i)=>{
                                                                                return `${i[0].replace(/[A-Z]/g,w=>'-'+w.toLowerCase())}: ${i[1]};\n`
                                                                            })
                                                                        }
                                                                                 overlayStyle={{whiteSpace:'pre-wrap',fontFamily:'codeSaver, monospace',fontSize:'13px'}}
                                                                        >
                                                                            <Tag closable={true} onClose={()=>this.deleteClassName(i)}>{i}</Tag>
                                                                        </Tooltip>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </li>
                                                    :null
                                            :
                                                <li key={index}>
                                                    <div className={'key'}>{item[0]}</div>
                                                    <Tooltip placement={'topLeft'} title={item[1]}>
                                                        <div className={'value'} onClick={()=>this.changeEditing(item[0],item[1])}>
                                                            {
                                                                item[0] === 'className'
                                                                    ?
                                                                    <div>
                                                                        {item[1].map((i)=>{
                                                                            return <Tag closable={true}>{i}</Tag>
                                                                        })}
                                                                    </div>
                                                                    :
                                                                    <span>{item[1]}</span>
                                                            }

                                                        </div>
                                                    </Tooltip>
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
                                                    title={
                                                        <span>
                                                            <span style={{color:'#949494'}}>深色</span>代表用户自定义样式；<br/>
                                                            <span style={{color:'#d4d4d4'}}>浅色</span>代表计算后的样式；<br/>
                                                            <span style={{color:'#1493d3'}}>蓝色</span>代表该样式来自于某个样式类。<br/>
                                                            <hr/>
                                                            <span>
                                                                <strong>修改</strong>：单击属性值（您应该始终使用<i>全选</i>来修改属性值）
                                                            </span>
                                                            <br/>
                                                            <span>
                                                                <strong>删除</strong>：ctrl+单击属性名
                                                            </span>
                                                        </span>}
                                           >
                                               <i className={'iconfont iconhelp'}/>
                                           </Tooltip>
                                       </div>}>
                                <ul className={'drawerUl'}>
                                    {/*<li>*/}
                                    {[...Object.entries(css)].sort().map((item,index) => {
                                        let borderLeft = '';
                                        if (classStyle[item[0]] && classStyle[item[0]] === item[1]){
                                            borderLeft = 'solid 3px #1493d3';
                                        }
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
                                                            if (!/\d+px/.test(this.state.newStyleValue)){
                                                                updateTag({
                                                                    prop:'style',
                                                                    innerProp:this.state.newStyleName,
                                                                    value:this.state.newStyleValue
                                                                })
                                                            }else {
                                                                updateTag({
                                                                    prop:'trueStyle',
                                                                    innerProp:this.state.newStyleName,
                                                                    value:this.state.newStyleValue.replace(/\d+px/g,function (i) {
                                                                        return parseInt(i)/14*0.6+'rem'
                                                                    })
                                                                });
                                                                updateTag({
                                                                    prop:'viewStyle',
                                                                    innerProp:this.state.newStyleName,
                                                                    value:this.state.newStyleValue
                                                                })
                                                            }
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
                                                                        if (!/\d+px/.test(this.state.newStyleValue)){
                                                                            updateTag({
                                                                                prop:'style',
                                                                                innerProp:this.state.newStyleName,
                                                                                value:this.state.newStyleValue
                                                                            })
                                                                        }else {
                                                                            updateTag({
                                                                                prop:'trueStyle',
                                                                                innerProp:this.state.newStyleName,
                                                                                value:this.state.newStyleValue.replace(/\d+px/g,function (i) {
                                                                                    return parseInt(i)/14*0.6+'rem'
                                                                                })
                                                                            });
                                                                            updateTag({
                                                                                prop:'viewStyle',
                                                                                innerProp:this.state.newStyleName,
                                                                                value:this.state.newStyleValue
                                                                            })
                                                                        }
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
                                                            if (!/\d+px/.test(this.state.newStyleValue)){
                                                                updateTag({
                                                                    prop:'style',
                                                                    innerProp:this.state.newStyleName,
                                                                    value:this.state.newStyleValue
                                                                })
                                                            }else {
                                                                updateTag({
                                                                    prop:'trueStyle',
                                                                    innerProp:this.state.newStyleName,
                                                                    value:this.state.newStyleValue.replace(/\d+px/g,function (i) {
                                                                        return parseInt(i)/14*0.6+'rem'
                                                                    })
                                                                });
                                                                updateTag({
                                                                    prop:'viewStyle',
                                                                    innerProp:this.state.newStyleName,
                                                                    value:this.state.newStyleValue
                                                                })
                                                            }
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
                            <Panel key={3} header={'hover'}
                                   style={{background: '#f7f7f7',borderRadius: 4, marginBottom: 10,border: 0,overflow: 'hidden',borderTop:'solid 4px rgba(218, 218, 218, 0.34)'}}>
                                <ul className={'drawerUl'}>
                                {[...Object.entries(hover)].sort().map((item,index) => {
                                    if (item[1]!==''){
                                        return (
                                            <li key={index}>
                                                <div className={'key'}>{item[0]}</div>
                                                <div className={'value'} onClick={()=>this.changeEditing('hover'+item[0],item[1])}>
                                                    {this.state.editingStyleName==='hover'+item[0]
                                                        ?<Tooltip trigger={['focus']} title={item[1]} placement="topLeft">
                                                            <AutoComplete
                                                                autoFocus={true}
                                                                dataSource={dataSource[item[0]].sort()}
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
                                                                            prop:'hover',
                                                                            innerProp:item[0],
                                                                            value:e
                                                                        })
                                                                    }else {
                                                                        updateTag({
                                                                            prop:'hoverTrueStyle',
                                                                            innerProp:item[0],
                                                                            value:e.replace(/\d+px/g,function (i) {
                                                                                return parseInt(i)/14*0.6+'rem'
                                                                            })
                                                                        });
                                                                        updateTag({
                                                                            prop:'hoverViewStyle',
                                                                            innerProp:item[0],
                                                                            value:e
                                                                        })
                                                                    }
                                                                }}
                                                                onSelect={(e)=> {
                                                                    updateTag({
                                                                        prop: 'hover',
                                                                        innerProp: item[0],
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
                                    <li>
                                        <div className={'key'}>
                                            <Tooltip trigger={['focus']} title={this.state.newHoverStyleName} placement="topLeft">
                                                <AutoComplete
                                                    // autoFocus={true}
                                                    dataSource={dataSourceKeys.sort()}
                                                    filterOption={(inputValue, option) =>
                                                        option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                    }
                                                    children={<input className={'autoCompleteInput'} id={'newHoverStyleName'} style={{width:120}} placeholder={'新建属性'} onFocus={(e)=>{e.target.select()}}/>}
                                                    backfill={true}
                                                    value={this.state.newHoverStyleName}
                                                    onChange={(e)=>{this.setState({newHoverStyleName:e})}}
                                                    onBlur={()=>{
                                                        if (this.state.newHoverStyleName !=='' && this.state.newHoverStyleValue !== ''){
                                                            updateTag({
                                                                prop:'style',
                                                                innerProp:this.state.newHoverStyleName,
                                                                value:this.state.newHoverStyleValue
                                                            });
                                                            this.setState({
                                                                newHoverStyleName:'',
                                                                newHoverStyleValue:''
                                                            })
                                                        }
                                                    }}
                                                />
                                            </Tooltip>
                                        </div>
                                        <div className={'value'}>
                                            <Tooltip trigger={['focus']} title={this.state.newHoverStyleValue===''?'':this.state.newHoverStyleValue} placement="topLeft">
                                                <AutoComplete
                                                    // autoFocus={true}
                                                    dataSource={dataSource[this.state.newHoverStyleName]===undefined?[]:dataSource[this.state.newHoverStyleName].sort()}
                                                    filterOption={(inputValue, option) =>
                                                        option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                    }
                                                    children={
                                                        <input className={'autoCompleteInput'} id={'newHoverStyleValue'} style={{width:120}} placeholder={'属性值'}
                                                               onFocus={(e)=>{e.target.select()}}
                                                               onKeyDown={(e)=>{
                                                                   if (e.key === 'Tab'){
                                                                       e.preventDefault();
                                                                       if (!/\d+px/.test(this.state.newHoverStyleValue)){
                                                                           updateTag({
                                                                               prop:'hover',
                                                                               innerProp:this.state.newHoverStyleName,
                                                                               value:this.state.newHoverStyleValue
                                                                           })
                                                                       }else {
                                                                           updateTag({
                                                                               prop:'hoverTrueStyle',
                                                                               innerProp:this.state.newHoverStyleName,
                                                                               value:this.state.newHoverStyleValue.replace(/\d+px/g,function (i) {
                                                                                   return parseInt(i)/14*0.6+'rem'
                                                                               })
                                                                           });
                                                                           updateTag({
                                                                               prop:'hoverViewStyle',
                                                                               innerProp:this.state.newHoverStyleName,
                                                                               value:this.state.newHoverStyleValue
                                                                           })
                                                                       }
                                                                       this.setState({
                                                                           newHoverStyleName:'',
                                                                           newHoverStyleValue:''
                                                                       });
                                                                       document.getElementById('newHoverStyleName').focus();
                                                                   }
                                                               }}
                                                        />}
                                                    backfill={true}
                                                    value={this.state.newHoverStyleValue}
                                                    onChange={(e)=>{
                                                        this.setState({newHoverStyleValue:e})
                                                    }}
                                                    onBlur={()=>{
                                                        if (this.state.newHoverStyleName !=='' && this.state.newHoverStyleValue !== ''){
                                                            if (!/\d+px/.test(this.state.newHoverStyleValue)){
                                                                updateTag({
                                                                    prop:'hover',
                                                                    innerProp:this.state.newHoverStyleName,
                                                                    value:this.state.newHoverStyleValue
                                                                })
                                                            }else {
                                                                updateTag({
                                                                    prop:'hoverTrueStyle',
                                                                    innerProp:this.state.newHoverStyleName,
                                                                    value:this.state.newHoverStyleValue.replace(/\d+px/g,function (i) {
                                                                        return parseInt(i)/14*0.6+'rem'
                                                                    })
                                                                });
                                                                updateTag({
                                                                    prop:'hoverViewStyle',
                                                                    innerProp:this.state.newHoverStyleName,
                                                                    value:this.state.newHoverStyleValue
                                                                })
                                                            }
                                                            this.setState({
                                                                newHoverStyleName:'',
                                                                newHoverStyleValue:''
                                                            })
                                                        }
                                                    }}
                                                />
                                            </Tooltip>
                                        </div>
                                    </li>
                                </ul>

                                </Panel>
                        </Collapse>
                    </div>
                )
        }
    };

    createNodes = (node) => {
        let className = '';
        let css = Object.assign({},node.trueStyle),
            hover = Object.assign({},node.hoverTrueStyle);
        if (node.props.className){
            className += node.props.className.join(' ');
            css = getComputedCss(node,'trueStyle');
            hover = getComputedCss(node,'hoverTrueStyle');

        }
        if (node.children!==undefined){
            return React.createElement(
                node.type || 'div',
                {
                    id:node.key,
                    key:node.key,
                    style:node.key===this.state.hoverId?{...Object.assign({},css,hover)}:{...css},
                    src:node.props.src?node.props.src:null,
                    className
                },
                [(node.content || null),...node.children.map(val => this.createNodes(val))]
            )
        } else {
            return React.createElement(
                node.type || 'div',
                {
                    id:node.key,
                    key:node.key,
                    style:node.key===this.state.hoverId?{...Object.assign({},css,hover)}:{...css},
                    src:node.props.src?node.props.src:null,
                    type:node.props.type?node.props.type:null,
                    className
                }
            )
        }

    };

    containerStyle = ()=>{
        let node = this.state.tagList;
        let className = '';
        let css = Object.assign({},node.trueStyle),
            hover = Object.assign({},node.hoverTrueStyle);
        if (node.props.className){
            className += node.props.className.join(' ');
            css = getComputedCss(node,'trueStyle');
            hover = getComputedCss(node,'hoverTrueStyle');

        }
        return node.key===this.state.hoverId?{...Object.assign({},css,hover)}:{...css}
    }

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

    setHover = (e)=>{
        let id = e.target.id;
        this.setState({
            hoverId:id
        })

    }

    render() {
        return (
            <div className={'container_wp'} id={'container_wp'}>
                <div className={`container ${this.state.showDrawer?'operation_open':''}`} id={'0'}
                     style={!this.state.setting.width.match(/vw$/g)
                         ?Object.assign({},this.containerStyle(),{width:parseInt(this.state.setting.width)*.6+'px',height:parseInt(this.state.setting.height)*.6+'px'})
                         :Object.assign({},this.containerStyle(),{width:'60vw',height:'60vh'})}
                     onMouseMove={(e)=>this.setHover(e)}>
                    {this.state.tagList.children.map(val => this.createNodes(val))}
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
                    getContainer={()=>document.getElementById('container_wp')}
                    width={400}
                >
                    {this.drawerContent()}
                </Drawer>
            </div>
        )
    }
}

export default myContent
