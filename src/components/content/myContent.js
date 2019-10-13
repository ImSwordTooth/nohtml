import React from 'react'
import {Drawer,Input} from 'antd'

import './myContent.less'
import store from '../../store'
import {changeDrawer, updateTag} from "../../store/action";

const {TextArea} = Input

class myContent extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            isReName:false
        });
        store.subscribe(this.listener)
    }

    listener = () => {
        let newState = store.getState();
        this.setState(newState);
    };

    closeDrawer = ()=>{
        changeDrawer(false)
    };

    changeContent = (e)=>{
        updateTag({
            prop:'content',
            value:e.target.value
        })
    }

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

    drawerContent = ()=>{
        return (
            <div>
                <TextArea value={this.state.selectedTag.content} onChange={(e)=>this.changeContent(e)}/>
            </div>
        )
    };

    createNodes = ({key, pid, children, type,style,content,props}) => {
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
                    style:{...style},
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
                    style:{...style},
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
            let style = {
                width:ele.clientWidth,
                height:ele.clientHeight,
                left:ele.getBoundingClientRect().left,
                top:ele.getBoundingClientRect().top
            };
            return <div className={'mask'} style={style}/>
        }

    }

    render() {

        const content = this.state.tagList.children;

        return (
            <div className={'container_wp'} id={'container_wp'}>
                <div className={`container ${this.state.showDrawer?'operation_open':''}`} id={'0'} style={{width:'65vw',height:'65vh'}}>
                    {content.map(val => this.createNodes(val))}
                    {this.mask()}
                </div>
                <Drawer
                    className={'operation_wp'}
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
