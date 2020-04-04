import React,{PureComponent} from 'react'
import store from '../../../../store'
import {changeProp} from "../../../../common/units";

export default class MyFontStyle extends PureComponent{

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
        const {stateName} = this.props;
        const {fontWeight,fontStyle,textDecoration} = this.state[stateName];

        return(
            <li className={'fontStyle'}>
                <span className={'operateTitle'}><i className={'iconfont iconnocssfontstyle'}/>字型</span>
                <div className={'content'}>
                    <div className={'icons'}>
                        <i className={`iconfont iconbold ${fontWeight==='bold'?'active':''}`} onClick={()=>changeProp(stateName,'fontWeight',fontWeight==='bold'?'normal':'bold')}/>
                        <i className={`iconfont iconlighter ${fontWeight==='lighter'?'active':''}`} onClick={()=>changeProp(stateName,'fontWeight',fontWeight==='lighter'?'normal':'lighter')}/>
                        <i className={`iconfont iconitalic ${fontStyle==='italic'?'active':''}`} onClick={()=>changeProp(stateName,'fontStyle',fontStyle==='italic'?'normal':'italic')}/>
                        <i className={`iconfont iconunderline ${textDecoration==='underline'?'active':''}`} onClick={()=>changeProp(stateName,'textDecoration',textDecoration==='underline'?'none':'underline')}/>
                        <i className={`iconfont iconlinethrough ${textDecoration==='line-through'?'active':''}`} onClick={()=>changeProp(stateName,'textDecoration',textDecoration==='line-through'?'none':'line-through')}/>
                        <i className={`iconfont iconoverline ${textDecoration==='overline'?'active':''}`} onClick={()=>changeProp(stateName,'textDecoration',textDecoration==='overline'?'none':'overline')}/>
                    </div>
                </div>
            </li>
        )
    }
}
