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
    }

    // const
    //
    // content = ()=>{
    //
    //     this.state.tagList;
    // }

    handleJson = (val, pid) => {
        if (val.pid === pid) {
            const children = this.state.tagList.children.map(val2 => this.handleJson(val2, val.id)).filter(x => x)
            if (children.length) val.children = children
            return val
        }
    }

    createNodes = ({id, pid, children, type}) => {
        return React.createElement(
            type || 'div',
            {key: id},
            children ? ['zzz',...children.map(val => this.createNodes(val))] : 'sss'
        )
    }

    render() {

        const content = this.state.tagList.children.map(val => this.handleJson(val, 0)).filter(x => x)
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
