import React,{PureComponent} from 'react'
import './customer.less'
import {
    changeCustomerCssStyle,
    changeCustomerHoverStyle, deleteAllCustomerCssStyle, deleteAllCustomerHoverStyle,
    deleteCustomerCssStyle,
    deleteCustomerHoverStyle
} from "../../../../store/action";
import {connect} from 'react-redux'

class Customer extends PureComponent{

    state = {
        customerCssList:[
            {
                key:'',
                value:'',
                category:'standard'
            }
        ],
        editingId:'',                    //正在编辑的td的id，特征为key+index或者是value+index
        isShowShadow:true
    };

    changeEditingTarget = (type,index)=>{
        this.setState({
            editingId:type+index
        });
        document.addEventListener('mousedown',this.clickOutside,false)
    };

    clickOutside = (e)=>{
        if (e.target.tagName!=='TD'){
            this.setState({
                editingId:''
            });
            document.removeEventListener('mousedown',this.clickOutside,false)
        }
    };

    updateCustomerCssList = (type,index,value)=>{
        const {changeCustomerCssStyle,changeCustomerHoverStyle,deleteCustomerHoverStyle,deleteCustomerCssStyle,deleteAllCustomerCssStyle,deleteAllCustomerHoverStyle} = this.props;
        const {customerCssList} = this.state;

        let list = customerCssList.concat();
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
        });

        deleteAllCustomerCssStyle();
        deleteAllCustomerHoverStyle();

        list.forEach((item,idx)=>{
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
        const {editingId} = this.state;
        if (e.key === 'Enter'){
            this.setState({
                isShowShadow:false
            })
        }
        if (e.key === 'Tab'){
            if (/^key/.test(editingId)) {
                this.setState({
                    isShowShadow:true,
                    editingId:editingId.replace('key','value')
                })
            }else {
                this.setState({
                    isShowShadow:true,
                    editingId:'key'+(parseInt(/[0-9]+/.exec(editingId)[0])+1)
                })
            }
        }
    };

    deleteCustomerCssList = (item,index,e)=>{
        const {deleteCustomerCssStyle,deleteCustomerHoverStyle} = this.props;
        const {customerCssList} = this.state;
        e.stopPropagation();
        let list = customerCssList.concat();
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

    handleFocus = (e)=>{
        const {editingId} = this.state;
        const {index,inputtype} = e.target.dataset;
        if (editingId !== inputtype+index+''){
            this.setState({editingId: inputtype+index+''})
        }
    };

    handleChange = (e)=>{
        const {dataset:{index,inputtype},value} = e.target;
        this.updateCustomerCssList(inputtype,+index,value)
    };

    //TODO 有bug，enter后tab
    render() {
        const {customerCssList,editingId,isShowShadow} = this.state;
        return (
            <div>
                <table className={'customer_table'} border="1">
                    <tr>
                        <th style={{width:'50px',textAlign:'center'}}/>
                        <th>key</th>
                        <th>value</th>
                    </tr>
                    {
                        customerCssList.map((item,index)=>{
                            return (
                                <tr key={index} className={item.category==='hover'?'isHover':''}>
                                    <td>
                                        <div className={'category'}>
                                            <i className={`iconfont icon${item.category}`} onClick={()=>this.updateCustomerCssList('category',index,item.category==='standard'?'hover':'standard')}/>
                                        </div>
                                    </td>
                                    <td id={`key${index}`} className={editingId === `key${index}` && isShowShadow?'editing':''} onClick={()=>this.changeEditingTarget('key',index)}>
                                        <input value={item.key} data-index={index} data-inputtype={'key'} onFocus={this.handleFocus} onChange={this.handleChange} onKeyDown={this.testKey}/>
                                    </td>
                                    <td id={`value${index}`} className={editingId === `value${index}` && isShowShadow?'editing':''} onClick={()=>this.changeEditingTarget('value',index)}>
                                        <input value={item.value} data-index={index} data-inputtype={'value'} onFocus={this.handleFocus} onChange={this.handleChange} onKeyDown={this.testKey}/>

                                        {
                                            index === customerCssList.length-1
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

function mapDispatchToProps() {
    return{
        changeCustomerCssStyle,
        changeCustomerHoverStyle,
        deleteCustomerHoverStyle,
        deleteCustomerCssStyle,
        deleteAllCustomerCssStyle,
        deleteAllCustomerHoverStyle
    }
}

export default connect(null,mapDispatchToProps)(Customer)
