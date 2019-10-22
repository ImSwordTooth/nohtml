import React from 'react'
import {Button, Input, message, Modal} from "antd";
import '../css/tableModal.less'

export class TableModal extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            tableThs:['表头1','表头2','表头3'],        //表头数组初值
            currentClass:''                   //选中的预设的表的类名
        }
    }

    //获取表头，复用到下面的预设中
    getTableThs = ()=>{
        return this.state.tableThs.map((item,key)=>{
            return (
                <div className={'input_wp'} key={key}>
                    <Input value={item} id={`th-${key}`} onChange={this.changeTableThsValue}/>
                    <span onClick={()=>this.deleteTableThs(key)}><i className={'iconfont icondelete'}/></span>
                </div>
            )
        })
    };

    //修改表头内容
    changeTableThsValue = (e)=>{
        let index = parseInt(e.target.id.split('-')[1]);
        let arr = this.state.tableThs;
        arr[index] = e.target.value;
        this.setState({
            tableThs:arr
        })
    };

    //删除表头
    deleteTableThs = (index)=>{
        let arr = [...this.state.tableThs];
        arr.splice(index,1);
        this.setState({
            tableThs:arr
        })
    };

    //添加表头
    addTableThs = ()=>{
        let size = this.state.tableThs.length;
        if (size>=10){
            message.warn('最多10个表头')
        }else {
            this.setState({
                tableThs:this.state.tableThs.concat(`表头${size+1}`)
            })
        }
    };

    //创建一个个列表，用于预设样式中的展示
    getTablePreviews = (border)=>{
        return (
            <table border={border}>
                <tbody>
                <tr>
                    {this.state.tableThs.map((item,index)=><th key={index}>{item}</th>)}
                </tr>
                <tr>
                    {this.state.tableThs.map((item,index)=><td key={index}>{`数据${index+1}`}</td>)}
                </tr>
                <tr>
                    {this.state.tableThs.map((item,index)=><td key={index}>{`数据${index+this.state.tableThs.length+1}`}</td>)}
                </tr>
                </tbody>
            </table>
        )
    };

    toggleCurrent = (e)=>{
        let className = e.currentTarget.dataset.class;
        if (className === this.state.currentClass){
            this.setState({
                currentClass:''
            })
        } else {
            this.setState({
                currentClass:e.currentTarget.dataset.class
            })
        }

    }

     cancel = ()=>{
        this.props.cancel();
        this.setState({
            tableThs:['表头1','表头2','表头3'],
            currentClass:''
        })
     }

     ok = ()=>{
        this.props.ok(this.state.tableThs,this.state.currentClass);
         this.setState({
             tableThs:['表头1','表头2','表头3'],
             currentClass:''
         })
     }

    render() {
        return (
            <Modal title={`${this.props.type}表格`} width={1000}
                   className={'tableModal modals'}
                   visible={this.props.showTableModal}
                   cancelText={'取消'}
                   okText={this.props.type}
                   onOk={this.ok}
                   onCancel={this.cancel}>
                <div>
                    <div className={'modal_item'}>
                        <span>表头</span>
                        <div className={'ths'}>
                            {this.getTableThs()}
                            <Button type="primary" ghost onClick={()=>this.addTableThs()}>添加</Button>
                        </div>
                    </div>
                    <div className={'modal_item'}>
                        <span>预设样式</span>
                        <div>
                            <ul className={'previewList'}>
                                <li className={`standard ${this.state.currentClass==='standard'?'currentTable':''}`} data-class={'standard'} onClick={(e)=>this.toggleCurrent(e)}>{this.getTablePreviews()}</li>
                                <li className={`business ${this.state.currentClass==='business'?'currentTable':''}`} data-class={'business'} onClick={(e)=>this.toggleCurrent(e)}>{this.getTablePreviews()}</li>
                                <li className={`line ${this.state.currentClass==='line'?'currentTable':''}`} data-class={'line'} onClick={(e)=>this.toggleCurrent(e)}>{this.getTablePreviews('1')}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}
