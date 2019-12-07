import React from 'react'
import store from '../../../../store'
import {addProp, changeProp} from "../common/api";
import {Select} from "antd";
const {Option} = Select;

class MyTransform extends React.Component{
    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState());
        store.subscribe(this.listener)
    }

    listener = ()=>{
        let newState = store.getState();
        this.setState(newState);
    };

    render() {
        return(
            <li className={'transform multi'}>
                <span className={'operateTitle'}><i className={'iconfont iconnocsstransform'}/>变形<i className={'iconfont iconadd add'} onClick={()=>addProp(this.props.stateName,'transform')}/></span>

                <div className={'content'}>
                    <Select style={{width:150}} defaultValue={this.state[this.props.stateName].border.split(' ')[1]} onChange={(e)=>changeProp(this.props.stateName,'border',e,1)}>
                        <Option className={'OptionItem'} value={'translate'}><i className={'iconfont icontranslate'}/>位移<span>translate</span></Option>
                        <Option className={'OptionItem'} value={'scale'}><i className={'iconfont iconscale'}/>缩放<span>scale</span></Option>
                        <Option className={'OptionItem'} value={'rotate'}><i className={'iconfont iconrotate'}/>旋转<span>rotate</span></Option>
                        <Option className={'OptionItem'} value={'skew'}><i className={'iconfont iconskew'}/>倾斜<span>skew</span></Option>
                    </Select>
                </div>

            </li>
        )
    }
}

export default MyTransform
