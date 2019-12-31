import React from 'react'
import '../css/animation.less'
import {Divider} from "antd";
import AnimationModal from '../../common/modals/animationModal'
import store from '../../../../store'
import {updateTag} from "../../../../store/action";
import Mask from "../mask";

class Animation extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            selectAnimation:'',
            showAnimationModal:false
        })
        store.subscribe(this.listener)
    }

    listener = () => {
        let newState = store.getState();
        this.setState(newState);
    };
    componentDidMount() {
        // let str = '';
        // if (value === undefined){
        //     str = `@keyframes ${this.state.animationName===''?'anonymous':this.state.animationName} {\n`;
        // }else {
        //     str = `@keyframes ${value===''?'anonymous':value} {\n`;
        // }
        //
        // for (let i in this.state.framesContent){
        //     str += `\t${i} {\n`;
        //     [...Object.entries(this.state.framesContent[i])].forEach(item=>{
        //         str += `\t\t${item[0].replace(/[A-Z]/g,w=>'-'+w.toLowerCase())}:${item[1]};\n`;
        //     });
        //     str +='\t}\n'
        // }
        // str += '}';
        // let css = document.styleSheets[0];
        // css.deleteRule(0)
        // css.insertRule(str, 0)
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
    };

    openAnimationModal = ()=>{
        let css = document.styleSheets[0];
        //这里不是随便填的，是根据animationModal里的初始值确定的
        css.insertRule(`@keyframes anonymous {
            0% {
                background-color:#000000;
            }
            50% {
                background-color:#ff0000;
            }
            100% {
                background-color:#000000;
            }
        }`, 0);
        this.setState({
            showAnimationModal:true
        })
    };

    getCssRule =()=>{

        let css = document.styleSheets;
        console.log(css)

    };

    render() {
        return (
            <div>
                <div className={'animationTimingFunction'}>
                    <div style={{position:'relative'}}>
                        {
                            JSON.stringify(this.state.selectedTag)==='{}'?<Mask title={'请先选中要添加动画的元素'}/>:<></>
                        }
                        <ul className={'timingFunctionList'}>
                            <li className={`${this.state.selectAnimation==='translate'?'active':''}`} onClick={()=>this.changeSelectAnimation('translate')}><span>弹跳</span><div className={'translate'}/></li>
                            <li className={`${this.state.selectAnimation==='rotate'?'active':''}`} onClick={()=>this.changeSelectAnimation('rotate')}><span>旋转</span><div className={'rotate'}/></li>
                            <li className={`${this.state.selectAnimation==='scale'?'active':''}`} onClick={()=>this.changeSelectAnimation('scale')}><span>放大</span><div className={'scale'}/></li>
                            <li className={`${this.state.selectAnimation==='skew'?'active':''}`} onClick={()=>this.changeSelectAnimation('skew')}><span>拉扯</span><div className={'skew'}/></li>
                            <li className={`${this.state.selectAnimation==='hang'?'active':''}`} onClick={()=>this.changeSelectAnimation('hang')}><span>悬挂</span><div className={'hang'}/></li>
                            <li className={`${this.state.selectAnimation==='bounce'?'active':''}`} onClick={()=>this.changeSelectAnimation('bounce')}><span>抖动</span><div className={'bounce'}/></li>
                        </ul>
                        <Divider type={'vertical'} style={{height:'50px',margin:'0 10px'}}/>
                        <ul className={'timingFunctionList'}>
                            {
                                this.state.keyframesList.map((item,index)=>{
                                    return (<li key={index}
                                                className={`${this.state.selectAnimation === item.name ? 'active' : ''}`}
                                                onClick={()=>this.changeSelectAnimation(item.name)}>
                                                    <span>{item.name}</span>
                                                    <div/>
                                            </li>)
                                })
                            }
                        </ul>
                    </div>
                </div>
                <i className={'iconfont iconanimation'} onClick={()=>this.openAnimationModal()}/>

                <AnimationModal showAnimationModal={this.state.showAnimationModal} cancel={()=>this.setState({showAnimationModal:false})}/>

                {/*<button onClick={()=>this.getCssRule()}>获取cssRule</button>*/}
            </div>
        )
    }

}

export default Animation;
