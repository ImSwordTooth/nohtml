import React from 'react'
import store from '../../../store'
import './code.less'
class Code extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            selfClassName:'nocss'
        });
        store.subscribe(this.listener)
    }

    listener = ()=>{
        let newState = store.getState();
        this.setState(newState)
    };

    render() {
        return(
            <div className={'show_wp'}>
                <div className={'Title'}>
                    <div>
                        <i className={'iconfont iconcodebox titleIcon'}/>代码区
                    </div>
                    <div>
                        <input type='text' className={'selfText'} style={{width:80}} placeholder={'类名'} onChange={(e)=>this.setState({selfClassName:e.target.value||'nocss'})}/>
                        <i className={'iconfont iconcopy'}/>
                    </div>
                </div>
                <div className={'css_wp'}>
                    {`.${this.state.selfClassName}{`}
                    <br/>
                    {[...Object.entries(this.state.nocssStyle)].map((item,index)=>{
                        if (item[1]){
                            return <span style={{display:'block'}} className={'cssText'} key={index}><strong>{item[0]}:</strong><span>{item[1]};</span></span>
                        }
                })}
}
                    <br/>
                    {`.${this.state.selfClassName}:hover{`}
                    {[...Object.entries(this.state.hoverStyle)].map((item,index)=>{
                        if (item[1]){
                            return <span style={{display:'block'}} className={'cssText'} key={index}><strong>{item[0]}:</strong><span>{item[1]};</span></span>
                        }
                    })}
}

                </div>

            </div>
        )
    }

}

export default Code;
