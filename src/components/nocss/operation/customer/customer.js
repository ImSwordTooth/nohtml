import React from 'react'
import './customer.less'
import store from "../../../../store";
import {
    changeCustomerCssStyle,
    changeCustomerHoverStyle,
    changeHoverStyle,
    changeNocssStyle, deleteCustomerCssStyle, deleteCustomerHoverStyle
} from "../../../../store/action";

class Customer extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            customerCssList:[
                {
                    key:'',
                    value:'',
                    category:'standard'
                }
            ],
            editingId:''                    //正在编辑的td的id，特征为key+index或者是value+index
        })
        store.subscribe(this.listener)
    }

    listener = ()=>{
        let newState = store.getState();
        this.setState(newState)
    };

    changeEditingTarget = (type,index)=>{
        this.setState({
            editingId:type+index
        })
        window.addEventListener('mousedown',this.clickOutside,false)
    };

    clickOutside = (e)=>{
        if (e.target.tagName!=='TD'){
            this.setState({
                editingId:''
            });
            window.removeEventListener('mousedown',this.clickOutside)
        }
    }

    updateCustomerCssList = (type,index,value)=>{

        //TODO 检测enter和tab键

        console.log(this.state.editingId)

        let list = this.state.customerCssList.concat();
        if (index === list.length-1 && type!=='category'){
            list.push({
                key:'',
                value:'',
                category:'standard'
            })
        }
        list[index][type] = value;
        this.setState({
            customerCssList:list
        })

        this.state.customerCssList.forEach((item,idx)=>{
            if (item.key !== '' && item.value !== ''){
                if (item.category === 'standard'){
                    changeCustomerCssStyle({
                        prop:item.key,
                        value:item.value
                    })
                }else {
                    changeCustomerHoverStyle({
                        prop:item.key,
                        value:item.value
                    })
                }
                //切换类型时，不仅仅要把现在的更新上去，而且要把原来的删掉
                if (type === 'category' && index === idx){
                    if (item.category === 'standard'){
                        deleteCustomerHoverStyle(item.key)
                    } else {
                        deleteCustomerCssStyle(item.key)
                    }

                }
            }else {
                if (item.category === 'standard'){
                    deleteCustomerCssStyle(item.key)
                }else {
                    deleteCustomerHoverStyle(item.key)
                }

            }
        })
    };

    testKey = (e)=>{
        if (e.key === 'Enter'){
            this.setState({
                editingId:''
            })
        }
        if (e.key === 'Tab'){
            if (/^key/.test(this.state.editingId)) {
                this.setState({
                    editingId:this.state.editingId.replace('key','value')
                })
            }else {
                this.setState({
                    editingId:'key'+(parseInt(/[0-9]+/.exec(this.state.editingId)[0])+1)
                })
            }
        }
    }

    deleteCustomerCssList = (item,index,e)=>{
        e.stopPropagation();
        let list = this.state.customerCssList.concat();
        list.splice(index,1);
        this.setState({
            customerCssList:list
        });
        if (item.category === 'standard'){
            deleteCustomerCssStyle(item.key)
        }else {
            deleteCustomerHoverStyle(item.key)
        }

    };

    render() {
        return (
            <div>
                <table className={'customer_table'} border="1">
                    <tr>
                        <th style={{width:'50px',textAlign:'center'}}/>
                        <th>key</th>
                        <th>value</th>
                    </tr>
                    {
                        this.state.customerCssList.map((item,index)=>{
                            return (
                                <tr key={index} className={item.category==='hover'?'isHover':''}>
                                    <td>
                                        <div className={'category'}>
                                            <i className={`iconfont icon${item.category}`} onClick={()=>this.updateCustomerCssList('category',index,item.category==='standard'?'hover':'standard')}/>
                                        </div>
                                    </td>
                                    <td id={`key${index}`} className={this.state.editingId === `key${index}`?'editing':''} onClick={()=>this.changeEditingTarget('key',index)}>
                                        <input value={item.key} onFocus={()=>{if (this.state.editingId!==`key${index}`){this.setState({editingId:`key${index}`})} }} onChange={(e)=>this.updateCustomerCssList('key',index,e.target.value)} onKeyDown={(e)=>this.testKey(e)}/>
                                    </td>
                                    <td id={`value${index}`} className={this.state.editingId === `value${index}`?'editing':''} onClick={()=>this.changeEditingTarget('value',index)}>
                                        <input value={item.value} onFocus={()=>{if (this.state.editingId!==`value${index}`){this.setState({editingId:`value${index}`})} }} onChange={(e)=>this.updateCustomerCssList('value',index,e.target.value)} onKeyDown={(e)=>this.testKey(e)}/>

                                        {
                                            index===this.state.customerCssList.length-1
                                                ?<></>
                                                :<div className={'delete'} onClick={(e)=>this.deleteCustomerCssList(item,index,e)}><i className={'iconfont icondelete'}/></div>
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>

            </div>
        )
    }
}

export default Customer;
