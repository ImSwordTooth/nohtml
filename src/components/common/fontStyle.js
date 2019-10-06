import React from 'react'
import {updateTag} from "../../store/action";
import store from "../../store";

//字型
class fontStyle extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({

        });
        store.subscribe(this.listener)
    }

    listener = () => {
        let newState = store.getState();
        this.setState(newState);
    };

    getDefaultClass = (prop,value)=>{
        if (this.state.selectedTag){
            return this.state.selectedTag.style[prop]===value?'active':''
        }else {
            return ''
        }
    }

    changeFont = (prop,value)=>{
        if (this.state.selectedTag.style[prop]===value){
            updateTag({
                prop:'style',
                styleProp:prop,
                value:''
            })
        } else {
            updateTag({
                prop:'style',
                styleProp:prop,
                value:value
            })
        }


    }

    render() {
        return (
            <div className={'fontstyle icongroup'}>
                <div>
                    <i className={`iconfont iconbold ${this.getDefaultClass('fontWeight','bold')}` } onClick={()=>this.changeFont('fontWeight','bold')} />
                    <i className={`iconfont iconlighter ${this.getDefaultClass('fontWeight','lighter')}`} onClick={()=>this.changeFont('fontWeight','lighter')} />
                    <i className={`iconfont iconitalic ${this.getDefaultClass('fontStyle','italic')}`} onClick={()=>this.changeFont('fontStyle','italic')} />
                    <i className={`iconfont iconunderline ${this.getDefaultClass('textDecoration','underline')}`} onClick={()=>this.changeFont('textDecoration','underline')} />
                    <i className={'iconfont iconsub'} />
                    <i className={'iconfont iconsup'} />
                </div>

            </div>
        )
    }
}

export default fontStyle
