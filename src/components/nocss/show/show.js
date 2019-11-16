import React from 'react'
import store from '../../../store'

import './show.less'

class Show extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            showText:'文本'
        });
        store.subscribe(this.listener);
    }

    listener = ()=>{
        let newState = store.getState();
        this.setState(newState)
    };

    render() {
        return (
            <div className={'show_wp'}>
                <div className={'Title'}>
                    <div>
                        <i className={'iconfont iconshow titleIcon'}/>展示区
                    </div>
                    <div>
                        <input type='text' className={'selfText'} placeholder={'自定义文本'} onChange={(e)=>this.setState({showText:e.target.value||'文本'})}/>
                        <i className={'iconfont iconuploadimg'}/>
                    </div>
                </div>
                <article>
                    <div style={this.state.nocssStyle}>
                        {this.state.showText}
                    </div>
                </article>
            </div>
        )
    }
}
export default Show;
