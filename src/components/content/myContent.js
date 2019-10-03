import React from 'react'
import {Drawer} from 'antd'

import './myContent.less'
import store from '../../store'

class myContent extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
          showDrawer:true
        });
        store.subscribe(this.listener)
    }

    listener = () => {
        let newState = store.getState();
        this.setState(newState);
    };

    closeDrawer = ()=>{
        this.setState({
            showDrawer:false
        })
    };

    openDrawer = ()=>{
        this.setState({
            showDrawer:true
        })
    };

    createNodes = ({id, pid, children, type}) => {
        return React.createElement(
            type || 'div',
            {key: id},
            children ? ['内容',...children.map(val => this.createNodes(val))] : '内容'
        )
    };

    render() {

        const content = this.state.tagList.children;

        return (
            <div className={'container_wp'}>
                <div className={`container ${this.state.showDrawer?'operation_open':''}`}>
                    <button onClick={this.openDrawer}>
                        打开抽屉
                    </button>
                    {content.map(val => this.createNodes(val))}
                </div>
                <Drawer
                    className={'operation_wp'}
                    title="Basic Drawer"
                    placement="right"
                    closable={true}
                    onClose={this.closeDrawer}
                    visible={this.state.showDrawer}

                    mask={false}
                    getContainer={false}
                    style={{ position: 'absolute'}}
                    width={400}
                >
                    <p>Some contents...</p>
                </Drawer>
            </div>
        )
    }
}

export default myContent
