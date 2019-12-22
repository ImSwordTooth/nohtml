import React from 'react'
import {Slider, Switch} from "antd";
import {changeProp} from "../../../../common/units";
import store from '../../../../store'

class MyBorderRadius extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            oneMode:false
        })
        store.subscribe(this.listener)
    }

    listener = ()=>{
        let newState = store.getState();
        this.setState(newState);
    };

    changeMode = (e)=>{
        this.setState({
            oneMode:e
        })
    }

    changeBorderRadius = (value,index)=>{
        if (this.state.oneMode){
            changeProp(changeProp(this.props.stateName,'borderRadius',value+'px',0))
            changeProp(changeProp(this.props.stateName,'borderRadius',value+'px',1))
            changeProp(changeProp(this.props.stateName,'borderRadius',value+'px',2))
            changeProp(changeProp(this.props.stateName,'borderRadius',value+'px',3))
        } else {
            changeProp(this.props.stateName,'borderRadius',value+'px',index)
        }
    }

    render() {
        return(
            <li className={'borderradius'}>
                <span className={'operateTitle'}><i className={'iconfont iconnocssborderradius'}/>圆角</span>
                <div className={'content'}>
                    <div className={'items'}>
                        <div className={'info'}>左上：</div>
                        <Slider style={{width:100}} min={0} max={50} onChange={(e)=>this.changeBorderRadius(e,0)} value={parseInt(this.state[this.props.stateName].borderRadius.split(' ')[0])}/><span className={'unit'}>{this.state[this.props.stateName].borderRadius.split(' ')[0]}</span>
                    </div>
                    <div className={'items'}>
                        <div className={'info'}>右上：</div>
                        <Slider style={{width:100}} min={0} max={50} onChange={(e)=>this.changeBorderRadius(e,1)} value={parseInt(this.state[this.props.stateName].borderRadius.split(' ')[1])}/><span className={'unit'}>{this.state[this.props.stateName].borderRadius.split(' ')[1]}</span>
                    </div>
                    <div className={'items'}>
                        <div className={'info'}>右下：</div>
                        <Slider style={{width:100}} min={0} max={50} onChange={(e)=>this.changeBorderRadius(e,2)} value={parseInt(this.state[this.props.stateName].borderRadius.split(' ')[2])}/><span className={'unit'}>{this.state[this.props.stateName].borderRadius.split(' ')[2]}</span>
                    </div>
                    <div className={'items'}>
                        <div className={'info'}>左下：</div>
                        <Slider style={{width:100}} min={0} max={50} onChange={(e)=>this.changeBorderRadius(e,3)} value={parseInt(this.state[this.props.stateName].borderRadius.split(' ')[3])}/><span className={'unit'}>{this.state[this.props.stateName].borderRadius.split(' ')[3]}</span>
                    </div>

                    <Switch checkedChildren={'单值'}
                            unCheckedChildren={'四值'}
                            defaultChecked={false}
                            style={{marginLeft:'50px'}}
                            onChange={this.changeMode}/>
                </div>
            </li>
        )
    }
}

export default MyBorderRadius
