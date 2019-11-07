import React from 'react'
import '../css/classes.less'
import store from '../../../../store'
import ClassesModal from "../../common/modals/classesModal";
import {TableModal} from "../../common/modals/tableModal";
class Classes extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            selectedClass:'',
            showClassesModal:false
        })
    }

    render() {
        return (
            <div>
                <ul className={'class_list'}>
                    <li className={this.state.selectedClass==='drawUl'?'active':''} onClick={()=>this.setState({selectedClass:'drawUl'})}>
                        <div>示例文字</div>
                        <span className={'className'}>drawUl</span>
                    </li>
                    <li className={this.state.selectedClass==='value'?'active':''} onClick={()=>this.setState({selectedClass:'value'})}>

                        <div>示例文字</div>
                        <span className={'className'}>value</span>
                    </li>
                    <li className={this.state.selectedClass==='operation_wp'?'active':''} onClick={()=>this.setState({selectedClass:'operation_wp'})}>

                        <div>示例文字</div>
                        <span className={'className'}>operation_wp</span>
                    </li>
                    <li className={this.state.selectedClass==='key'?'active':''} onClick={()=>this.setState({selectedClass:'key'})}>
                        <div>示例文字</div>
                        <span className={'className'}>key</span>
                    </li>
                </ul>
                <span>more</span>

                <span onClick={()=>this.setState({showClassesModal:true})}>新增类</span>
                <ClassesModal showClassesModal={this.state.showClassesModal} cancel={()=>this.setState({showClassesModal:false})}/>
            </div>
        )
    }

}

export default Classes
