import React from 'react'
import {Modal,Input,message} from "antd";
import http from '../../../../common/http'
import store from "../../../../store";
import '../css/inviteModal.less'
import '../css/modals.less'
const { Search } = Input;

export class InviteModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchText:'',
            isInvite:true,
            userInfo:{},
            okText:'新增'
        }
        store.subscribe(this.listen);
    }

    listen = ()=>{
        let newState = store.getState();
        this.setState(newState)
    };

    searchUser = (value)=>{
        http.get('/getUserInfoByUserName',{userName:value}).then((res)=>{
            let {userName,avatar,userId} = res.data.data;
            this.setState({
                userInfo:{
                    userName,
                    avatar,
                    userId
                }
            })
            // if (res.msg !== '当前用户已在项目中'){
                this.setState({
                    isInvite:false,
                    okText:`新增${this.state.userInfo.userName}`
                })
            // }else {
            //     this.setState({
            //         okText:'当前用户已在项目中'
            //     })
            // }
        })
    }

    cancel = ()=>{
        this.props.cancel();
        this.setState({
            searchText:'',
            isInvite:true,
            userInfo:{}
        })
    }

    ok = ()=>{
        http.get('/addNohtmlProjectPartner',{
            projectId:this.props.fileId,
            userId:this.state.userInfo.userId
        }).then(res=>{
            if (res.data.msg === '当前用户已在项目中'){
                message.warn('当前用户已在项目中');
            }else {
                message.success('新增成功');
                this.cancel();
            }

        })

    }

    render() {
        return (
            <Modal title={`新增用户到${this.props.fileName}`} width={1000}
                   className={'inviteModal modals'}
                   visible={this.props.showInviteModal}
                   cancelText={'取消'}
                   okText={this.state.okText}
                   // okButtonProps={{disabled:this.state.isInvite}}
                   onOk={this.ok}
                   onCancel={this.cancel}>
                <Search
                    placeholder="输入用户名称"
                    value={this.state.searchText}
                    onChange={e=>this.setState({searchText:e.target.value})}
                    onSearch={value => this.searchUser(value)}
                    style={{ width: 200 }}
                />
                <hr/>
                <div>
                    {
                        JSON.stringify(this.state.userInfo) === '{}'
                            ?<div className={'empty'}>输入用户名来邀请用户到项目</div>
                            :<div className={'userInfo'}>
                                <div>
                                    <img src={this.state.userInfo.avatar} alt={this.state.userInfo.userId}/>
                                </div>
                                <p>{this.state.userInfo.userName}</p>
                            </div>
                    }
                </div>
            </Modal>
        )
    }

}
