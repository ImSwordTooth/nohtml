import React from 'react'

import MyFont from '../../common/font'
import FontStyle from '../../common/fontStyle'
import Color from '../../common/color'
import '../css/start.less'
import store from '../../../../store'
import { Divider,Tooltip } from 'antd';

class start extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{

        })
        store.subscribe(this.listener);
    }

    listener = () => {
        let newState = store.getState();
        this.setState(newState);
    };

    getContent = ()=>{
        if (JSON.stringify(this.state.selectedTag)==='{}') {
            return (
                <Tooltip/>
            )
        }
    }

    render() {
        return (
            <div className='start'>
                <div style={{position:'relative',width:'max-content'}}>
                    <Tooltip title={'请先选中要操作的元素'}><div className={`${JSON.stringify(this.state.selectedTag)==='{}'?'no_operate':''}`}/></Tooltip>
                        <MyFont/>
                        <Divider type={'vertical'}/>
                        <FontStyle/>
                        <Divider type={'vertical'}/>
                        <Color/>
                </div>

            </div>
        )
    }

}

export default start
