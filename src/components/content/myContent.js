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

    drawerTitle = ()=>{
        let selectedTag = this.state.selectedTag;
        return (
            <div className={'drawerTitle'}>
                <i className={`iconfont icon${selectedTag.type}`} />
                <span className={'title'}>{selectedTag.dataName}</span>
            </div>
        )
    };

    drawerContent = ()=>{
        return (
            <div>
                <TextArea value={this.state.selectedTag.content} onChange={(e)=>this.changeContent(e)}/>
            </div>
        )
    }

    createNodes = ({id, pid, children, type,style,content}) => {
        // console.log(style)
        return React.createElement(
            type || 'div',
            {style:{...style}},
            [(content || ''),...children.map(val => this.createNodes(val))]
        )
    };

    render() {

        const content = this.state.tagList.children;

        return (
            <div className={'container_wp'}>
                <div className={`container ${this.state.showDrawer?'operation_open':''}`}>
                    {content.map(val => this.createNodes(val))}
                </div>
                <Drawer
                    className={'operation_wp'}
                    title={this.drawerTitle()}
                    placement="right"
                    closable={true}
                    onClose={this.closeDrawer}
                    visible={this.state.showDrawer}
                    mask={false}
                    getContainer={false}
                    style={{ position: 'absolute'}}
                    width={400}
                >
                    {this.drawerContent()}
                </Drawer>
            </div>
        )
    }
}

export default myContent
