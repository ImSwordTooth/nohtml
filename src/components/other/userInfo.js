import React from 'react'
import './css/userInfo.less'
import {Avatar, message, Tooltip, Spin, Icon, Button} from 'antd'
import {withRouter}  from 'react-router-dom'
import store from "../../store";
import http from '../../common/http'
import {getComputedCss} from "../../common/units";
import {InviteModal} from "../nohtml/common/modals/inviteModal";
import {changeTagList, updateSetting} from "../../store/action";
class UserInfo extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            phoneNumber:'空',
            email:'空',
            fileList:[],
            spin:true,
            currentFile:-1,
            fileContent:{}
        });
        store.subscribe(this.listen);
    }

    listen = ()=>{
        let newState = store.getState();
        this.setState(newState)
    };

    componentDidMount() {
        //获取用户信息
        // http.get('/getUser').then(res=>{
        //     let {phoneNum,mail} = res.data.data;
        //     this.setState({
        //         phoneNumber:phoneNum,
        //         email:mail
        //     })
        // }).catch(()=>{
        //     message.error('获取用户信息失败！');
        // });

        //获取文件列表
        http.get('/getNoHtmlProjectViewList').then(res=> {
            console.log(res)
            this.setState({
                fileList: res.data.data,
                spin:false
            })
        })
    }

    timeFormat = (originTime)=>{
        return new Date(+new Date(new Date(originTime).toJSON())+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
    };

    getFileContent = (url,index)=>{
        this.setState({
            currentFile:index
        });
        http.get('/getFile',{
            filePath:url
        }).then(res=>{
            this.setState({
                fileContent:res.data.data.tagList
            })
        }).catch(()=>{
            message.warn('获取文件内容失败');
        })
    };

    createNodes = (node) => {
        if (JSON.stringify(node) !== '{}'){
            let className = '';
            let css = Object.assign({},node.trueStyle),
                hover = Object.assign({},node.hoverTrueStyle);
            if (node.props.className){
                className += node.props.className.join(' ');
                css = getComputedCss(node,'trueStyle');
                hover = getComputedCss(node,'hoverTrueStyle');
            }
            Object.entries(css).map((item,index)=>{
                if (item[1].match(/(0|([1-9]\d*))(\.\d+)?rem/g)){
                    css[item[0]] = item[1].replace(/(0|([1-9]\d*))(\.\d+)?rem/g,(i)=>{
                        return (parseFloat(i)*0.5)+'rem'
                    })
                }
            });
            Object.entries(hover).map((item,index)=>{
                if (item[1].match(/(0|([1-9]\d*))(\.\d+)?rem/g)){
                    css[item[0]] = item[1].replace(/(0|([1-9]\d*))(\.\d+)?rem/g,(i)=>{
                        return (parseFloat(i)*0.5)+'rem'
                    })
                }
            });
            if (node.children!==undefined){
                return React.createElement(
                    node.type || 'div',
                    {
                        id:node.key,
                        key:node.key,
                        style:node.key===this.state.hoverId?{...Object.assign({},css,hover)}:{...css},
                        src:node.props.src?node.props.src:null,
                        className
                    },
                    [(node.content || null),...node.children.map(val => this.createNodes(val))]
                )
            } else {
                return React.createElement(
                    node.type || 'div',
                    {
                        id:node.key,
                        key:node.key,
                        style:node.key===this.state.hoverId?{...Object.assign({},css,hover)}:{...css},
                        src:node.props.src?node.props.src:null,
                        type:node.props.type?node.props.type:null,
                        className
                    }
                )
            }
        }


    };

    newFile = ()=>{
        http.get('/addFile').then(res=>{
            console.log(res)
            changeTagList({
                type:'div',
                pid:null,
                key:'0',
                dataName:'总容器',
                iconName:'icondiv',     //标签的图标
                trueStyle:{},       //放在标签内的样式
                viewStyle:{},       //用于数据展示的样式
                hoverTrueStyle:{},      //hover时放在标签内的样式
                hoverViewStyle:{},      //hover时用于数据展示的样式
                willCreateKey:0,
                props:{
                    className:[]
                },
                children:[]
            });
            updateSetting({
                prop:'fileUrl',
                value:res.msg
            })
            this.props.history.push('/nohtml')
        })
    }

    openFile = (url)=>{
        http.get('/getFile',{
            filePath:url
        }).then(res=>{
            changeTagList(res.data.data.tagList)
            updateSetting({
                prop:'fileUrl',
                value:url
            })
            this.props.history.push('/nohtml')
        })

    }


    render() {
        return (

            <div className={'user_wp'}>
                <div className={'file'}>
                    <div className={'userInfo'}>
                        <div className={'avatar'}>
                            <img  src={this.state.user.avatar} alt={'用户头像'}/>
                        </div>
                        <div className={'information'}>
                            <p className={'username web-font'}>{this.state.user.userName}</p>
                            <div className={'info'}>
                                <i className={'iconfont iconphone'}/>
                                <span>{this.state.phoneNumber}</span>
                            </div>
                            <div className={'info'}>
                                <i className={'iconfont iconemail'}/>
                                <span>{this.state.email}</span>
                            </div>
                        </div>
                    </div>
                    <h2 className={'listTitle'}>项目列表<Button style={{marginLeft:10}} onClick={()=>this.newFile()}>新增</Button></h2>
                    <hr/>
                    <Spin spinning={this.state.spin}>
                        <ul className={'fileList'}>
                            {this.state.fileList.map((item,index)=>{
                                return (
                                    <li key={index} className={`${this.state.currentFile === index ? 'active': ''}`} onClick={()=>this.getFileContent(item.url,index)} onDoubleClick={()=>this.openFile(item.url)}>
                                        <div className={'title_wp'}>
                                            <p className={'title'}>{item.projectName}</p>
                                            <div>
                                                {
                                                    item.userList.map((i,idx)=>{
                                                        return (
                                                            <Tooltip title={i.userName} key={idx}>
                                                                <Avatar src={i.avatar} style={{marginLeft:'-10px'}}/>
                                                            </Tooltip>
                                                        )
                                                    })
                                                }
                                                <Tooltip title={'邀请用户'}>
                                                    <Avatar icon={"plus"} style={{marginLeft:'-10px'}} onClick={()=>this.setState({showInviteModal:true})}/>
                                                </Tooltip>
                                            </div>
                                        </div>
                                        <p className={'content'}>{item.description}</p>
                                        <div className={'last'}>
                                            <Avatar size={'small'} style={{marginRight:'5px'}} src={item.userList.find((i)=>i.userId === item.captain).avatar}/><strong style={{marginRight:20}}>{item.userList.find((i)=>i.userId === item.captain).userName}</strong>最后修改<strong>{this.timeFormat(item.lastUpdateTime)}</strong>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </Spin>
                </div>

                <div className={'show'}>
                    {this.createNodes(this.state.fileContent)}
                </div>
                <InviteModal fileId={this.state.currentFile === -1 ? '' : this.state.fileList[this.state.currentFile].projectId} fileName={this.state.currentFile === -1 ? '' : this.state.fileList[this.state.currentFile].projectName} showInviteModal={this.state.showInviteModal} cancel={()=>{
                    this.setState({showInviteModal:false});
                    http.get('/getNoHtmlProjectViewList').then(res=> {
                        this.setState({
                            fileList: res.data.data,
                            spin:false
                        })
                    })
                }}/>
            </div>
        )
    }
}

export default withRouter(UserInfo)
