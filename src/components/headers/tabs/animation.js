import React from 'react'
import '../css/animation.less'

import AnimationModal from '../../common/modals/animationModal'
import store from '../../../store'
import {updateTag} from "../../../store/action";

class Animation extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            selectAnimation:'',
            showAnimationModal:false
        })

    }

    changeSelectAnimation=(value)=>{
        if (this.state.selectAnimation === value){
            this.setState({
                selectAnimation:''
            });
            updateTag({
                prop:'style',
                innerProp:'animation',
                value:''
            })
        } else {
            this.setState({
                selectAnimation:value
            });
            updateTag({
                prop:'style',
                innerProp:'animation',
                value:value + ' ease 2s infinite'
            })
        }
    }

    getCssRule =()=>{

        let css = document.styleSheets;
        console.log(css)

    }

    render() {
        return (
            <div>
                <div className={'animationTimingFunction'}>
                    <ul className={'timingFunctionList'}>
                        <li className={`${this.state.selectAnimation==='translate'?'active':''}`} onClick={()=>this.changeSelectAnimation('translate')}><span>弹跳</span><div className={'translate'}/></li>
                        <li className={`${this.state.selectAnimation==='rotate'?'active':''}`} onClick={()=>this.changeSelectAnimation('rotate')}><span>旋转</span><div className={'rotate'}/></li>
                        <li className={`${this.state.selectAnimation==='scale'?'active':''}`} onClick={()=>this.changeSelectAnimation('scale')}><span>放大</span><div className={'scale'}/></li>
                        <li className={`${this.state.selectAnimation==='skew'?'active':''}`} onClick={()=>this.changeSelectAnimation('skew')}><span>拉扯</span><div className={'skew'}/></li>
                        <li className={`${this.state.selectAnimation==='hang'?'active':''}`} onClick={()=>this.changeSelectAnimation('hang')}><span>悬挂</span><div className={'hang'}/></li>
                        <li className={`${this.state.selectAnimation==='bounce'?'active':''}`} onClick={()=>this.changeSelectAnimation('bounce')}><span>抖动</span><div className={'bounce'}/></li>
                    </ul>
                </div>
                <i className={'iconfont iconanimation'} onClick={()=>this.setState({showAnimationModal:true})}/>

                <AnimationModal showAnimationModal={this.state.showAnimationModal} cancel={()=>this.setState({showAnimationModal:false})}/>
                {/*<button onClick={()=>this.getCssRule()}>获取cssRule</button>*/}
            </div>
        )
    }

}

export default Animation;
