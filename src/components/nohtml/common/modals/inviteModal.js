import React,{PureComponent} from 'react'
import {Modal,Input,message} from "antd";
import http from '../../../../common/http'
import '../css/inviteModal.less'
import '../css/modals.less'
const { Search } = Input;

class InviteModal extends PureComponent{

    state = {
        searchText:'',
        isInvite:true,
        userInfo:{},
        okText:'新增'
    }

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
        const {cancel} = this.props
        cancel();
        this.setState({
            searchText:'',
            isInvite:true,
            userInfo:{}
        })
    }

    ok = ()=>{
        const {fileId} = this.props
        const {userInfo} = this.state
        http.get('/addNohtmlProjectPartner',{
            projectId:fileId,
            userId:userInfo.userId
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
        const {fileName,showInviteModal} = this.props
        const {okText,searchText,userInfo} = this.state
        return (
            <Modal title={`新增用户到${fileName}`} width={1000}
                   className={'inviteModal modals'}
                   visible={showInviteModal}
                   cancelText={'取消'}
                   okText={okText}
                   // okButtonProps={{disabled:this.state.isInvite}}
                   onOk={this.ok}
                   onCancel={this.cancel}>
                <Search
                    placeholder="输入用户名称"
                    value={searchText}
                    onChange={e=>this.setState({searchText:e.target.value})}
                    onSearch={value => this.searchUser(value)}
                    style={{ width: 200 }}
                />
                <hr/>
                <div>
                    {
                        JSON.stringify(userInfo) === '{}'
                            ?<div className={'empty'}>输入用户名来邀请用户到项目</div>
                            :<div className={'userInfo'}>
                                <div>
                                    <img src={userInfo.avatar} alt={userInfo.userId}/>
                                </div>
                                <p>{userInfo.userName}</p>
                            </div>
                    }
                </div>
            </Modal>
        )
    }

}

export default InviteModal
