import React from 'react'
import store from '../../../../store'
import {changeProp} from "../common/api";

class MyFontStyle extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState());
        store.subscribe(this.listener)
    }

    listener = ()=>{
        let newState = store.getState();
        this.setState(newState)
    };

    render() {
        return(
            <li id={'fontStyle'}>
                <span className={'operateTitle'}><i className={'iconfont iconnocssfontstyle'}/>字型</span>
                <div className={'content'}>
                    <div className={'icons'}>
                        <i className={`iconfont iconbold ${this.state.nocssStyle.fontWeight==='bold'?'active':''}`} onClick={()=>changeProp('fontWeight',this.state.nocssStyle.fontWeight==='bold'?'normal':'bold')}/>
                        <i className={`iconfont iconlighter ${this.state.nocssStyle.fontWeight==='lighter'?'active':''}`} onClick={()=>changeProp('fontWeight',this.state.nocssStyle.fontWeight==='lighter'?'normal':'lighter')}/>
                        <i className={`iconfont iconitalic ${this.state.nocssStyle.fontStyle==='italic'?'active':''}`} onClick={()=>changeProp('fontStyle',this.state.nocssStyle.fontStyle==='italic'?'normal':'italic')}/>
                        <i className={`iconfont iconunderline ${this.state.nocssStyle.textDecoration==='underline'?'active':''}`} onClick={()=>changeProp('textDecoration',this.state.nocssStyle.textDecoration==='underline'?'none':'underline')}/>
                        <i className={`iconfont iconlinethrough ${this.state.nocssStyle.textDecoration==='line-through'?'active':''}`} onClick={()=>changeProp('textDecoration',this.state.nocssStyle.textDecoration==='line-through'?'none':'line-through')}/>
                        <i className={`iconfont iconoverline ${this.state.nocssStyle.textDecoration==='overline'?'active':''}`} onClick={()=>changeProp('textDecoration',this.state.nocssStyle.textDecoration==='overline'?'none':'overline')}/>
                    </div>
                </div>
            </li>
        )
    }
}

export default MyFontStyle
