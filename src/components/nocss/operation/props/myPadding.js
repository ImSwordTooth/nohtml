import React from 'react'
import store from '../../../../store'

import {changeProp} from "../../../../common/units";
import {Slider, Switch} from "antd";

class MyPadding extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            doubleMode:false
        });
        store.subscribe(this.listener)
    }

    listener = ()=>{
        let newState = store.getState();
        this.setState(newState)
    };

    changeMode = (e)=>{
        this.setState({
            doubleMode:e
        })
    }

    changePadding = (value,index)=>{
        if (this.state.doubleMode){
            if (index === 0 || index === 2){
                changeProp(changeProp(this.props.stateName,'padding',value+'px',0))
                changeProp(changeProp(this.props.stateName,'padding',value+'px',2))
            } else {
                changeProp(changeProp(this.props.stateName,'padding',value+'px',1))
                changeProp(changeProp(this.props.stateName,'padding',value+'px',3))
            }
        } else {
            changeProp(this.props.stateName,'padding',value+'px',index)
        }
    }

    render() {
        return(
            <li className={'padding'}>
                <span className={'operateTitle'}><i className={'iconfont iconnocsspadding'}/>内边距</span>
                <div className={'content'}>
                    <div className={'items'}>
                        <div className={'info'}>top：</div>
                        <Slider style={{width:100}} min={0} max={100} onChange={(e)=>this.changePadding(e,0)} value={parseInt(this.state[this.props.stateName].padding.split(' ')[0])}/><span className={'unit'}>{this.state[this.props.stateName].padding.split(' ')[0]}</span>
                    </div>
                    <div className={'items'}>
                        <div className={'info'}>right：</div>
                        <Slider style={{width:100}} min={0} max={100} onChange={(e)=>this.changePadding(e,1)} value={parseInt(this.state[this.props.stateName].padding.split(' ')[1])}/><span className={'unit'}>{this.state[this.props.stateName].padding.split(' ')[1]}</span>
                    </div>
                    <div className={'items'}>
                        <div className={'info'}>bottom：</div>
                        <Slider style={{width:100}} min={0} max={100} onChange={(e)=>this.changePadding(e,2)} value={parseInt(this.state[this.props.stateName].padding.split(' ')[2])}/><span className={'unit'}>{this.state[this.props.stateName].padding.split(' ')[2]}</span>
                    </div>
                    <div className={'items'}>
                        <div className={'info'}>left：</div>
                        <Slider style={{width:100}} min={0} max={100} onChange={(e)=>this.changePadding(e,3)} value={parseInt(this.state[this.props.stateName].padding.split(' ')[3])}/><span className={'unit'}>{this.state[this.props.stateName].padding.split(' ')[3]}</span>
                    </div>


                    <Switch checkedChildren={'双值'}
                            unCheckedChildren={'四值'}
                            defaultChecked={false}
                            style={{marginLeft:'50px'}}
                            onChange={this.changeMode}/>
                </div>
            </li>
        )
    }
}

export default MyPadding
