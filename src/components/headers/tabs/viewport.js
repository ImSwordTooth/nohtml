import React from 'react'
import {Icon, Switch} from "antd";

import '../css/viewport.less'
class Viewport extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isChecked:true
        };
        // this.changeDevice  = this.changeDevice.bind(this);
    }

    // changeDevice(){
    //     this.setState({
    //         isChecked:true
    //     })
    // }
    changeDevice = check =>{
        this.setState({
            isChecked:check
        })
    }

    render() {
        return (
            <div className='device'>
                <i className={`iconfont iconpc ${this.state.isChecked ? 'active':''}`}/>
                <Switch  checkedChildren={<Icon type="check" />}
                         unCheckedChildren={<Icon type="check" />}
                         defaultChecked
                         onChange={this.changeDevice}
                />
                <i className={`iconfont iconphone ${!this.state.isChecked ? 'active':''}`} />
            </div>
        )
    }
}

export default Viewport
