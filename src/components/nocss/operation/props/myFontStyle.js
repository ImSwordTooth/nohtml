import React from 'react'
import store from '../../../../store'
import {changeProp} from "../../../../common/units";

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
            <li className={'fontStyle'}>
                <span className={'operateTitle'}><i className={'iconfont iconnocssfontstyle'}/>字型</span>
                <div className={'content'}>
                    <div className={'icons'}>
                        <i className={`iconfont iconbold ${this.state[this.props.stateName].fontWeight==='bold'?'active':''}`} onClick={()=>changeProp(this.props.stateName,'fontWeight',this.state[this.props.stateName].fontWeight==='bold'?'normal':'bold')}/>
                        <i className={`iconfont iconlighter ${this.state[this.props.stateName].fontWeight==='lighter'?'active':''}`} onClick={()=>changeProp(this.props.stateName,'fontWeight',this.state[this.props.stateName].fontWeight==='lighter'?'normal':'lighter')}/>
                        <i className={`iconfont iconitalic ${this.state[this.props.stateName].fontStyle==='italic'?'active':''}`} onClick={()=>changeProp(this.props.stateName,'fontStyle',this.state[this.props.stateName].fontStyle==='italic'?'normal':'italic')}/>
                        <i className={`iconfont iconunderline ${this.state[this.props.stateName].textDecoration==='underline'?'active':''}`} onClick={()=>changeProp(this.props.stateName,'textDecoration',this.state[this.props.stateName].textDecoration==='underline'?'none':'underline')}/>
                        <i className={`iconfont iconlinethrough ${this.state[this.props.stateName].textDecoration==='line-through'?'active':''}`} onClick={()=>changeProp(this.props.stateName,'textDecoration',this.state[this.props.stateName].textDecoration==='line-through'?'none':'line-through')}/>
                        <i className={`iconfont iconoverline ${this.state[this.props.stateName].textDecoration==='overline'?'active':''}`} onClick={()=>changeProp(this.props.stateName,'textDecoration',this.state[this.props.stateName].textDecoration==='overline'?'none':'overline')}/>
                    </div>
                </div>
            </li>
        )
    }
}

export default MyFontStyle
