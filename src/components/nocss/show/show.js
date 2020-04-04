import React,{PureComponent} from 'react'
import store from '../../../store'

import './show.less'

export default class Show extends PureComponent{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            showText:'文本',
            isHover:false,
            computedHoverStyle:Object.entries(Object.assign({},store.getState().hoverStyle)).map(item=>{
                item[1] = item[1].value
            })
        });
        store.subscribe(this.listener);
    }

    listener = ()=>{
        let newState = store.getState();
        this.setState(newState)
    };

    computedStyle = ()=>{
        const {isHover, nocssStyle, customerCssStyle, hoverStyle, customerHoverStyle} = this.state;
        if (isHover){
            return Object.assign(Object.assign({},nocssStyle,customerCssStyle),Object.assign({},hoverStyle,customerHoverStyle))
        } else {
            return Object.assign({},nocssStyle,customerCssStyle);
        }
    };

    changeHoverStatus = (e)=>{
        this.setState({
            isHover:e.type === 'mouseenter'
        })
    };

    changeSelfText = (e)=>{
        const text = e.target.value || '文本';
        this.setState({
            showText:text
        })
    };

    render() {
        const {showText} = this.state;
        return (
            <div className={'show_wp'}>
                <div className={'Title'}>
                    <div>
                        <i className={'iconfont iconshow titleIcon'}/>展示区
                    </div>
                    <div>
                        <input type='text' className={'selfText'} placeholder={'自定义文本'} onChange={this.changeSelfText}/>
                        <i className={'iconfont iconuploadimg'}/>
                    </div>
                </div>
                <article>
                    <div style={this.computedStyle()} onMouseEnter={this.changeHoverStatus} onMouseLeave={this.changeHoverStatus}>
                        {showText}
                    </div>
                </article>
            </div>
        )
    }
}
