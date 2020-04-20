import React from 'react'
import {connect} from 'react-redux'
import './code.less'
class Code extends React.Component{

    state = {
        selfClassName:'nocss'
    };

    changeSelfClassName = (e)=>{
        this.setState({selfClassName:e.target.value||'nocss'})
    }



    render() {
        const {nocssStyle,customerCssStyle,hoverStyle,customerHoverStyle} = this.props
        const {selfClassName} = this.state;
        return(
            <div className={'show_wp'}>
                <div className={'Title'}>
                    <div>
                        <i className={'iconfont iconcodebox titleIcon'}/>代码区
                    </div>
                    <div>
                        <input type='text' className={'selfText'} style={{width:80}} placeholder={'类名'} onChange={this.changeSelfClassName}/>
                        <i className={'iconfont iconcopy'}/>
                    </div>
                </div>
                <div className={'css_wp'}>
                    {`.${selfClassName}{`}
                    <br/>
                    {[...Object.entries(Object.assign({},nocssStyle,customerCssStyle))].map((item,index)=>{
                    if (item[1]){
                        return <span style={{display:'block'}} className={'cssText'} key={index}><strong>{item[0]}:</strong><span>{item[1]};</span></span>
                    }
                })}
}
                    <br/>
                    {`.${selfClassName}:hover{`}
                    {[...Object.entries(Object.assign({},hoverStyle,customerHoverStyle))].map((item,index)=>{
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

function mapStateToProps(state) {
    const {nocssStyle,customerCssStyle,hoverStyle,customerHoverStyle} = state;
    return {nocssStyle,customerCssStyle,hoverStyle,customerHoverStyle}
}

export default connect(mapStateToProps)(Code);
