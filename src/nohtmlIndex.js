import React from 'react'
import store from './store'
import {Input, Layout, Menu, Select, Spin, Popconfirm, message} from "antd";
import {withRouter}  from 'react-router-dom'
import './css/nohtmlIndex.less'
import {changeNav} from "./store/action";
import http from "./common/http";
import {connect} from "react-redux";
const { Content, Sider } = Layout;
const { Option } = Select;


class NohtmlIndex extends React.Component{

    state = {
        menuIndex:'1',              //1：全部项目 || 2：星标项目 || 3：回收站
        projectList:[],             //全部项目列表
        starList:[],                //星标项目列表
        garbageList:[],              //回收站项目列表
        isLoading:true
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
        http.get('getNohtmlProjectList').then(res=>{
            console.log(res.data.data)
            this.setState({
                projectList:res.data.data,
                isLoading:false
            })
        })
    }

    getStarList = ()=>{
        http.get('getStarNoHtmlProject').then(res=>{
            this.setState({
                starList:res.data.data,
                isLoading:false
            })
        })
    }

    getGarbageList = ()=>{
        http.get('getDisableNoHtmlProject').then(res=>{
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

    deleteProject = (id)=>{
        const {menuIndex,projectList,starList,garbageList} = this.state;
        http.get('deleteNohtmlProjectPartnerById',{
            id:id
        }).then(res=>{
            console.log(res)
            if (res.data.status === 200){
                message.success('删除成功，可在回收站中恢复或永久删除');
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
    };


    render() {
        const {history,loginStatus} = this.props
        const {projectList,starList,garbageList,menuIndex,isLoading} = this.state;
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
                            <button className={'new'}>新建</button>
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
                                                <Select defaultValue={'修改时间倒序'} style={{width:125}}>
                                                    <Option value={'修改时间倒序'}>修改时间倒序</Option>
                                                    <Option value={'修改时间升序'}>修改时间升序</Option>
                                                    <Option value={'创建时间倒序'}>创建时间倒序</Option>
                                                    <Option value={'创建时间升序'}>创建时间升序</Option>
                                                </Select>
                                                </span>
                                                <Input.Search placeholder={'搜索项目名'} style={{width:300,marginLeft:10}}/>
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
                                                                        <td className={'fileName'} data-id={item.projectId}>{item.projectName}</td>
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
                                                                                    ?   <i className={'iconfont iconreload'}/>
                                                                                    :   <>
                                                                                            {
                                                                                                item.isStar
                                                                                                    ?<i className={'iconfont iconaddfavorite'} style={{color:'orange',fontSize:22}} data-star={item.isStar} data-id={item.projectId} onClick={this.setStar}/>
                                                                                                    :<i className={'iconfont iconfavorite'} data-star={item.isStar} data-id={item.projectId} onClick={this.setStar}/>
                                                                                            }
                                                                                            <Popconfirm title={'确认将该项目移入回收站吗？'} okText={'确认'} cancelText={'取消'} onConfirm={()=>this.deleteProject(item.projectId)}>
                                                                                                <i className={'iconfont icongarbage'}/>
                                                                                            </Popconfirm>
                                                                                            <i className={'iconfont iconadd'}/>
                                                                                        </>
                                                                                }

                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                        {/*<tr>*/}
                                                        {/*    <td className={'fileName'} onClick={()=>history.push('/nohtml/detail/789789')}>我的第一个项目</td>*/}
                                                        {/*    <td>*/}
                                                        {/*        <div>*/}
                                                        {/*            <img src={require('./asset/avatar.jpg')}/>*/}
                                                        {/*            <img src={require('./asset/avatar2.jpg')}/>*/}
                                                        {/*            <img src={require('./asset/avatar2.jpg')}/>*/}
                                                        {/*            <img src={require('./asset/avatar2.jpg')}/>*/}
                                                        {/*        </div>*/}
                                                        {/*    </td>*/}
                                                        {/*    <td>2019.6.30</td>*/}
                                                        {/*    <td>2019.5.25</td>*/}
                                                        {/*    <td>*/}
                                                        {/*        <div className={'btns'}>*/}
                                                        {/*            <i className={'iconfont iconfavorite'}/>*/}
                                                        {/*            <i className={'iconfont icongarbage'}/>*/}
                                                        {/*            <i className={'iconfont iconadd'}/>*/}
                                                        {/*        </div>*/}
                                                        {/*    </td>*/}
                                                        {/*</tr>*/}
                                                        {/*<tr>*/}
                                                        {/*    <td className={'fileName'} onClick={()=>history.push('/nohtml/detail/123456')}>我的第二个很长很长很长长很长长很长很长的项目</td>*/}
                                                        {/*    <td>*/}
                                                        {/*        <div>*/}
                                                        {/*            <img src={require('./asset/avatar.jpg')}/>*/}
                                                        {/*            <img src={require('./asset/avatar3.jpg')}/>*/}
                                                        {/*        </div>*/}
                                                        {/*    </td>*/}
                                                        {/*    <td>2020.1.26</td>*/}
                                                        {/*    <td>2020.1.1</td>*/}
                                                        {/*    <td>*/}
                                                        {/*        <div className={'btns'}>*/}
                                                        {/*            <i className={'iconfont iconaddfavorite'} style={{color:'orange'}}/>*/}
                                                        {/*            <i className={'iconfont icongarbage'}/>*/}
                                                        {/*            <i className={'iconfont iconadd'}/>*/}
                                                        {/*        </div>*/}
                                                        {/*    </td>*/}
                                                        {/*</tr>*/}
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
                                                    <div>当前处于离线状态，请<a>登录</a>以查看您的项目列表，或者直接点击<a>新建</a>来创建离线文件</div>
                                                    <div>我们不会以任何形式来保存您的离线文件，请注意及时导出</div>
                                                </div>

                                            </div>
                                        </div>

                                }



                            </div>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        )
    }
}

function mapStateToProps(state) {
    const {loginStatus} = state;
    return {loginStatus}
}

export default withRouter(connect(mapStateToProps)(NohtmlIndex));
