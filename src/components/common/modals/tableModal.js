import React from 'react'
import {Button, Input, message, Modal} from "antd";
import store from "../../../store";

export class TableModal extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            tableThs:['表头1','表头2','表头3']        //表头数组初值
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

    render() {
        return (
            <Modal title='插入表格' width={1000}
                   className={'tableModal modals'}
                   visible={this.props.showTableModal}
                   onOk={this.handleOk}
                   onCancel={this.props.cancel}>
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
                                <li className={'standard'}>{this.getTablePreviews()}</li>
                                <li className={'business'}>{this.getTablePreviews()}</li>
                                <li className={'line'}>{this.getTablePreviews('1')}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}
