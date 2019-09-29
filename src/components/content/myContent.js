import React from 'react'

import './myContent.less'
import store from '../../store'

class myContent extends React.Component{

    constructor(props){
        super(props);
        this.state = store.getState();
        store.subscribe(this.listener)
    }

    listener = () => {
        let newState = store.getState();
        this.setState(newState);
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
                <div className={'container'}>
                    {content.map(val => this.createNodes(val))}
                </div>
            </div>
        )
    }
}

export default myContent
