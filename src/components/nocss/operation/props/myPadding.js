import React,{PureComponent} from 'react'
import {changeProp} from "../../../../common/units";
import {Slider, Switch} from "antd";
import {connect} from "react-redux";

class MyPadding extends PureComponent{

    state = {
        doubleMode:false
    };

    changeMode = (e)=>{
        this.setState({
            doubleMode:e
        })
    };

    changePadding = (value,index)=>{
        const {stateName} = this.props;
        const {doubleMode} = this.state;
        if (doubleMode){
            if (index === 0 || index === 2){
                changeProp(stateName,'padding',value+'px',0);
                changeProp(stateName,'padding',value+'px',2);
            } else {
                changeProp(stateName,'padding',value+'px',1);
                changeProp(stateName,'padding',value+'px',3);
            }
        } else {
            changeProp(stateName,'padding',value+'px',index);
        }
    };

    render() {
        const {stateName,nocssStyle,hoverStyle} = this.props;
        const {padding} = stateName==='nocssStyle' ? nocssStyle : hoverStyle;

        return(
            <li className={'padding'}>
                <span className={'operateTitle'}><i className={'iconfont iconnocsspadding'}/>内边距</span>
                <div className={'content'}>
                    <div className={'items'}>
                        <div className={'info'}>top：</div>
                        <Slider style={{width:100}} min={0} max={100} onChange={(e)=>this.changePadding(e,0)} value={parseInt(padding.split(' ')[0])}/><span className={'unit'}>{padding.split(' ')[0]}</span>
                    </div>
                    <div className={'items'}>
                        <div className={'info'}>right：</div>
                        <Slider style={{width:100}} min={0} max={100} onChange={(e)=>this.changePadding(e,1)} value={parseInt(padding.split(' ')[1])}/><span className={'unit'}>{padding.split(' ')[1]}</span>
                    </div>
                    <div className={'items'}>
                        <div className={'info'}>bottom：</div>
                        <Slider style={{width:100}} min={0} max={100} onChange={(e)=>this.changePadding(e,2)} value={parseInt(padding.split(' ')[2])}/><span className={'unit'}>{padding.split(' ')[2]}</span>
                    </div>
                    <div className={'items'}>
                        <div className={'info'}>left：</div>
                        <Slider style={{width:100}} min={0} max={100} onChange={(e)=>this.changePadding(e,3)} value={parseInt(padding.split(' ')[3])}/><span className={'unit'}>{padding.split(' ')[3]}</span>
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

function mapStateToProps(state) {
    const {nocssStyle,hoverStyle} = state;
    return {nocssStyle,hoverStyle}
}

export default connect(mapStateToProps)(MyPadding)
