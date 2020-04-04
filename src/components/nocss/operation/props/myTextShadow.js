import React,{PureComponent} from 'react'
import ColorPicker from "rc-color-picker";
import store from '../../../../store'
import {changeProp,colorRgba,addProp,deleteProp} from "../../../../common/units";
import { Slider} from "antd";

export default class MyTextShadow extends PureComponent{

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
        const {stateName}= this.props;
        const {textShadow} = this.state[stateName];

        return(
            <li className={'textShadow multi'}>
                <span className={'operateTitle'}><i className={'iconfont iconnocsstextshadow'}/>字体阴影<i className={'iconfont iconadd add'} onClick={()=>addProp(stateName,'textShadow')}/></span>
                {textShadow.split(/(?<=rgba\(.*\)|#\w{6}),/g).map((item,index)=>{
                    return (
                        <div className={'content'} key={index}>
                            {textShadow.split(/(?<=rgba\(.*\)|#\w{6}),/g).length>1
                                ? <i className={'iconfont icondelete delete'} onClick={()=>deleteProp(stateName,'textShadow',index)}/>
                                : <></>
                            }
                            <div className={'items'}>
                                <div className={'info'}>左右：</div>
                                <Slider style={{width:100}} min={-50} max={50} onChange={(e)=>changeProp(stateName,'textShadow',e+'px',0,index)} value={parseInt(item.split(' ')[0])}/><span className={'unit'}>{item.split(' ')[0]}</span>
                            </div>
                            <div className={'items'}>
                                <div className={'info'}>上下：</div>
                                <Slider style={{width:100}} min={-50} max={50} onChange={(e)=>changeProp(stateName,'textShadow',e+'px',1,index)} value={parseInt(item.split(' ')[1])}/><span className={'unit'}>{item.split(' ')[1]}</span>
                            </div>
                            <div className={'items'}>
                                <div className={'info'}>模糊：</div>
                                <Slider style={{width:100}} min={0} max={50} onChange={(e)=>changeProp(stateName,'textShadow',e+'px',2,index)} value={parseInt(item.split(' ')[2])}/><span className={'unit'}>{item.split(' ')[2]}</span>
                            </div>
                            <div className={'items'}>
                                <ColorPicker onChange={(e)=>{changeProp(stateName,'textShadow',colorRgba(e.color,e.alpha),3,index)}} defaultColor={item.split(' ')[3]} defaultAlpha={new RegExp('(?<=\\()\\S+(?=\\))','g').exec(item.split(' ')[3])?Number(new RegExp('(?<=\\()\\S+(?=\\))','g').exec(item.split(' ')[3])[0].split(',')[3])*100:100}>
                                    <div className={'colorpicker'}>
                                        <span className={'currentColor'} style={{backgroundColor:item.split(' ')[3]}}/>
                                        <span className={'currentColorText'}>{item.split(' ')[3]}</span>
                                    </div>
                                </ColorPicker>
                            </div>
                        </div>
                    )
                })}
            </li>
        )
    }
}
