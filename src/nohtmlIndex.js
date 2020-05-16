import React from 'react'
import {Input, Layout, Menu, Select, Spin, Popconfirm, message, notification, Button, Popover} from "antd";
import {withRouter}  from 'react-router-dom'
import './css/nohtmlIndex.less'
import {changeNav} from "./store/action";
import http from "./common/http";
import {connect} from "react-redux";
import InviteModal from "./components/nohtml/common/modals/inviteModal";
import {loadFile} from "./common/units";
const { Content, Sider } = Layout;
const { Option } = Select;
const Clipboard = require('clipboard')


class NohtmlIndex extends React.Component{

    state = {
        menuIndex:'1',              //1：全部项目 || 2：星标项目 || 3：回收站
        projectList:[],             //全部项目列表
        starList:[],                //星标项目列表
        garbageList:[],              //回收站项目列表
        inviteCode:'',
        addFileLoading:false,
        isLoading:true,
        sort:'last_update_time desc',
        searchText:''
    };


    // componentWillMount(){
    //     const {loginStatus} = this.props
    //     changeNav('nohtml');
    //     if(loginStatus === 2){
    //         this.getProjectList()
    //     }
    // }

    componentDidMount() {
        const {loginStatus} = this.props
        changeNav('nohtml');
        if(loginStatus === 2){
            this.getProjectList()
        }
    }

    componentWillUnmount() {
        changeNav('');
    }

    changeMenuIndex = (e)=>{
        const {loginStatus} = this.props
        this.setState({
            menuIndex:e.key,
            isLoading:true
        })
        if(loginStatus === 2){
            switch (e.key) {
                case '1':this.getProjectList();break;
                case '2':this.getStarList();break;
                default:this.getGarbageList()
            }
        }
    }

    getProjectList = ()=>{
        const {sort,searchText} = this.state
        http.get('getNohtmlProjectList',{
            sort,
            projectName:searchText
        }).then(res=>{
            console.log(res.data.data)
            this.setState({
                projectList:res.data.data,
                isLoading:false
            })
        })
    }

    getStarList = ()=>{
        const {sort,searchText} = this.state
        http.get('getStarNoHtmlProject',{
            sort,
            projectName:searchText
        }).then(res=>{
            this.setState({
                starList:res.data.data,
                isLoading:false
            })
        })
    }

    getGarbageList = ()=>{
        const {sort,searchText} = this.state
        http.get('getDisableNoHtmlProject',{
            sort,
            projectName:searchText
        }).then(res=>{
            this.setState({
                garbageList:res.data.data,
                isLoading:false
            })
        })
    }

    timeFormat = (date)=>{
        let time = new Date(date);
        const addZero = (i)=>{
            if (i.toString().length === 1){
                return '0'+i
            }else {
                return i
            }
        };
        const year = time.getFullYear();
        const month = addZero(time.getMonth()+1);
        const day = addZero(time.getDate());
        const hour = addZero(time.getHours());
        const minute = addZero(time.getMinutes());
        const second = addZero(time.getSeconds());

        return `${year}.${month}.${day} ${hour}:${minute}:${second}`;
    }

    setStar = (e)=>{
        let {star,id} = e.target.dataset
        const {menuIndex,projectList,starList,garbageList} = this.state
        star = star === 'true' ? 0 : 1
        http.post('setProjectStar',{
            projectId:id,
            isStar:star
        }).then(()=>{
            let list = [];
            if (menuIndex === '1'){
                list = projectList.length === 0 ? [] : projectList;
                list[list.findIndex((i)=>id===i.projectId)].isStar = star === 1
                this.setState({
                    projectList:list
                })
            }else {
                list = starList.length === 0 ? [] : starList;
                list.splice(list.findIndex((i)=>id===i.projectId),1)
                this.setState({
                    starList:list
                })
            }
        })
    };

    exitProject = (id)=>{
        const {menuIndex,projectList,starList,garbageList} = this.state;
        http.get('deleteNohtmlProjectPartnerById',{
            projectId:id
        }).then(res=>{
            if (res.data.status === 200){
                message.success('退出成功！');
                let list = [];
                if (menuIndex === '1'){
                    list = projectList.length === 0 ? [] : projectList;
                    list.splice(list.findIndex((i)=>id===i.projectId),1);
                    this.setState({
                        projectList:list
                    })
                }else {
                    list = starList.length === 0 ? [] : starList;
                    list.splice(list.findIndex((i)=>id===i.projectId),1);
                    this.setState({
                        starList:list
                    })
                }
            }else {
                message.error('退出失败');
            }
        })
    };

    disableProject = (id)=>{
        const {menuIndex,projectList,starList} = this.state;
        http.get('setNoHtmlProjectDisable',{
            projectId:id
        }).then(res=>{
            if (res.data.status === 200){
                message.success('删除成功，可在回收站恢复或者永久删除');
                let list = [];
                if (menuIndex === '1'){
                    list = projectList.length === 0 ? [] : projectList;
                    list.splice(list.findIndex((i)=>id===i.projectId),1);
                    this.setState({
                        projectList:list
                    })
                }else {
                    list = starList.length === 0 ? [] : starList;
                    list.splice(list.findIndex((i)=>id===i.projectId),1);
                    this.setState({
                        starList:list
                    })
                }
            }else {
                message.error('删除失败');
            }
        })
    }

    deleteProject = (id)=>{
        const {garbageList} = this.state;
        http.get('deleteNohtmlProjectListById',{
            projectId:id
        }).then(res=>{
            if (res.data.status === 200){
                message.success('删除成功');
                garbageList.splice(garbageList.findIndex((i)=>id===i.projectId),1);
                this.setState({
                    garbageList
                })
            }else {
                message.error('删除失败')
            }
        })
    }

    invite = (e)=>{
        const {id} = e.target.dataset
        http.get('getInvitationCode',{
            projectId:id
        }).then(res=>{
            if (res.data.status === 200){
                new Clipboard('.btn', {
                    text:  function(trigger) {
                        return res.data.data;
                    }
                })
                notification['success']({
                    message: '邀请码如下，已复制到剪切板：',
                    description:res.data.data
                });
            }
        })
    }

    changeInviteCode = (e)=>{
        this.setState({
            inviteCode:e.target.value
        })
    }

    join = ()=>{
        const {inviteCode} = this.state
        http.get('InvitationCodeVerify',{
            invitationCode:inviteCode
        }).then(res=>{
            if (res.data.status === 200){
                console.log(res)
                message.success('加入成功')
                this.getProjectList()
            }else {
                message.error('邀请码不正确，加入失败')
            }
        })
    }

    visibleChange = (visible)=>{
        if (visible){
            this.setState({
                inviteCode:''
            })
        }
    }

    toFile = (e)=>{
        const {url,id,name} = e.target.dataset
        const {history}= this.props
        history.push('/nohtml/detail', {url,id,name})
    }

    addFile = ()=>{
        const {history,user}= this.props
        this.setState({
            addFileLoading:true
        })
        if (user.userId){
            http.get('addFile',{
                projectName:'新建html',
                description:null
            }).then(res=>{
                if (res.data.status === 200){
                    console.log(res)
                    const {file,projectName,projectId,url} = res.data.data
                    loadFile(JSON.parse(file))
                    this.setState({
                        addFileLoading:false
                    },()=>{
                        history.push('/nohtml/detail',{
                            id:projectId,
                            name:projectName,
                            url
                        })
                    })
                }
            })
        }else{
            history.push('/nohtml/detail')
        }

    }

    toLogin = ()=>{
        const {history}= this.props
        history.push('/login')
    }

    changeOrder = (e)=>{
        this.setState({
            sort:e,
            isLoading:true
        },()=>{
            const {menuIndex} = this.state
            switch (menuIndex) {
                case '1':this.getProjectList();break;
                case '2':this.getStarList();break;
                default:this.getGarbageList();
            }
        })
        console.log(e)
    }

    search = (e)=>{
        const {menuIndex} = this.state
        switch (menuIndex) {
            case '1':this.getProjectList();break;
            case '2':this.getStarList();break;
            default:this.getGarbageList();
        }
    }

    changeSearchText = (e)=>{
        this.setState({
            searchText:e.target.value
        })
    }


    render() {
        const {history,loginStatus,user} = this.props
        const {projectList,starList,garbageList,menuIndex,inviteCode,isLoading,addFileLoading,sort,searchText} = this.state;
        let list = [];
        switch (menuIndex) {
            case '1':list = projectList.length === 0 ? [] : projectList;break;
            case '2':list = starList.length === 0 ? [] : starList;break;
            default:list = garbageList.length === 0 ? [] : garbageList
        }

        return (
            <Layout className={'App'}>
                <Content>
                    <Layout style={{ padding: '24px', background: '#fff',height:'100%' }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Button className={'new'} type={'primary'} onClick={this.addFile} loading={addFileLoading}>新建</Button>
                            <Menu defaultSelectedKeys={['1']} onClick={this.changeMenuIndex}>
                                <Menu.Item key={'1'}>
                                    <span className={'menuItem'}>
                                        <i className={'iconfont iconall'}/>
                                        <span>全部项目</span>
                                    </span>
                                </Menu.Item>
                                <Menu.Item key={'2'}>
                                    <span className={'menuItem'}>
                                        <i className={'iconfont iconfavorite'}/>
                                        <span>星标项目</span>
                                    </span>
                                </Menu.Item>
                                <Menu.Item key={'3'}>
                                    <span className={'menuItem'}>
                                      <i className={'iconfont icongarbage'}/>
                                        <span>回收站</span>
                                    </span>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Content id={'content'} className={'porjectContent'}>
                            <div>
                                <div className={'toolbar'}>
                                    <span className={'orderBy'}>
                                        {
                                            menuIndex !== '1' && menuIndex !== '2'
                                                ? <><i className={'iconfont icongarbage'}/><span><strong>回收站</strong>：删除过的项目，最多保存xx天</span></>
                                                : (menuIndex === '1'
                                                    ? <><i className={'iconfont iconall'}/><span><strong>全部项目</strong>：我参与的所有项目</span></>
                                                    : <><i className={'iconfont iconfavorite'}/><span><strong>收藏项目</strong>：我收藏的项目</span></>)
                                        }
                                    </span>
                                    {
                                        loginStatus === 2
                                            ?<span>
                                                <span>
                                                排序：
                                                <Select value={sort} style={{width:125}} onChange={this.changeOrder}>
                                                    <Option value={'last_update_time desc'}>修改时间降序</Option>
                                                    <Option value={'last_update_time asc'}>修改时间升序</Option>
                                                    <Option value={'create_time desc'}>创建时间降序</Option>
                                                    <Option value={'create_time asc'}>创建时间升序</Option>
                                                </Select>
                                                </span>
                                                <Input.Search placeholder={'搜索项目名'} value={searchText} className={searchText === '' ? '' : 'searchInput'} style={{width:300,marginLeft:10}} onSearch={this.search} onChange={this.changeSearchText}/>
                                                <Popover placement="bottomRight" title={'输入邀请码'}
                                                         content={<div style={{display:'inline'}}>
                                                             <Input type="text" value={inviteCode} onChange={this.changeInviteCode} style={{width:300,marginBottom:10,marginRight:10}}/>
                                                             <Button onClick={this.join}>确定</Button>
                                                         </div>}
                                                         onVisibleChange={this.visibleChange}
                                                         trigger="click">
                                                    <Button style={{marginLeft:10}}>加入项目</Button>
                                                </Popover>
                                            </span>
                                            :<></>
                                    }
                                </div>
                                {
                                    loginStatus === 2
                                        ?<Spin spinning={isLoading}>
                                            {
                                                list.length !== 0
                                                    ?
                                                    <table className={'fileList'}>
                                                        <tbody>
                                                        <tr>
                                                            <th width="60%">项目名</th>
                                                            <th>项目成员</th>
                                                            <th>修改时间</th>
                                                            <th>创建时间</th>
                                                            <th>操作</th>
                                                        </tr>
                                                        {
                                                            list.map((item,index)=>{
                                                                return (
                                                                    <tr key={'project'+index}>
                                                                        <td className={'fileName'} data-id={item.projectId} data-url={item.url} data-name={item.projectName} onClick={this.toFile}>{item.projectName}</td>
                                                                        <td>
                                                                            <div>
                                                                                {
                                                                                    item.userList.map((user,userIndex)=>{
                                                                                        return <img key={'userImg'+userIndex} src={user.avatar} alt={user.userName}/>
                                                                                    })
                                                                                }
                                                                            </div>
                                                                        </td>
                                                                        <td>{this.timeFormat(item.lastUpdateTime)}</td>
                                                                        <td>{this.timeFormat(item.createTime)}</td>
                                                                        <td>
                                                                            <div className={'btns'}>
                                                                                {
                                                                                    menuIndex === '3'
                                                                                    ?   <><i className={'iconfont iconreload'}/>
                                                                                        <Popconfirm title={'确认永久删除该项目吗？'} okText={'确认'} cancelText={'取消'} onConfirm={()=>this.deleteProject(item.projectId)}>
                                                                                            <i className={'iconfont icongarbage'}/>
                                                                                        </Popconfirm>
                                                                                        </>
                                                                                    :   <>
                                                                                            {
                                                                                                item.isStar
                                                                                                    ?<i className={'iconfont iconaddfavorite'} style={{color:'orange',fontSize:22}} data-star={item.isStar} data-id={item.projectId} onClick={this.setStar}/>
                                                                                                    :<i className={'iconfont iconfavorite'} data-star={item.isStar} data-id={item.projectId} onClick={this.setStar}/>
                                                                                            }
                                                                                            {
                                                                                                item.captain === user.userId
                                                                                                    ?<Popconfirm title={'确认将该项目移入回收站吗？'} okText={'确认'} cancelText={'取消'} onConfirm={()=>this.disableProject(item.projectId)}>
                                                                                                        <i className={'iconfont icongarbage'}/>
                                                                                                    </Popconfirm>
                                                                                                    :<Popconfirm title={'确认退出项目吗？'} okText={'确认'} cancelText={'取消'} onConfirm={()=>this.exitProject(item.projectId)}>
                                                                                                        <i className={'iconfont iconexit'}/>
                                                                                                    </Popconfirm>
                                                                                            }
                                                                                            <i className={'iconfont iconadd'} data-id={item.projectId} onClick={this.invite}/>
                                                                                        </>
                                                                                }

                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                        </tbody>
                                                    </table>
                                                    :
                                                    <div className={'blank'}>
                                                        <img src={require('./asset/none.png')} alt={'空'}/>
                                                    </div>
                                            }

                                            {/*分页功能先砍了*/}
                                            {/*<Pagination simple defaultCurrent={2} total={50} style={{float:'right'}}/>*/}
                                        </Spin>
                                        :<div className={'blank'}>
                                            <div>
                                                <i className={'iconfont iconoffline'}/>
                                                <div className={'warn'}>
                                                    <div>当前处于离线状态，请<a onClick={this.toLogin}>登录</a>以查看您的项目列表，或者直接点击<a onClick={this.addFile}>新建</a>来创建离线文件</div>
                                                    <div>我们不会以任何形式来保存您的离线文件，请注意及时导出</div>
                                                </div>

                                            </div>
                                        </div>

                                }
                                {/*<InviteModal showInviteModal={true} cancel={()=>{*/}
                                {/*    this.setState({showInviteModal:false});*/}
                                {/*    http.get('/getNoHtmlProjectViewList').then(res=> {*/}
                                {/*        this.setState({*/}
                                {/*            fileList: res.data.data,*/}
                                {/*            spin:false*/}
                                {/*        })*/}
                                {/*    })*/}
                                {/*}}/>*/}
                            </div>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        )
    }
}

function mapStateToProps(state) {
    const {loginStatus,user} = state;
    return {loginStatus,user}
}

export default withRouter(connect(mapStateToProps)(NohtmlIndex));
