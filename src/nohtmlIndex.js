import React from 'react'
import store from './store'
import {Input, Layout, Menu, Pagination, Select} from "antd";
// import {withRouter}  from 'react-router-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
withRouter
} from "react-router-dom";
import './css/nohtmlIndex.less'
import {changeNav} from "./store/action";
import Nohtml from "./nohtml";
const { Content, Sider } = Layout;
const { Option } = Select;


class NohtmlIndex extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            menuIndex:'1'
        });
        store.subscribe(this.listen);
    }

    listen = ()=>{
        let newState = store.getState();
        this.setState(newState)
    };

    componentDidMount() {
        changeNav('nohtml');
    }

    componentWillUnmount() {
        changeNav('');
    }


    render() {


        return (
            <Layout className={'App'}>
                <Content>
                    <Layout style={{ padding: '24px', background: '#fff',height:'100%' }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu defaultSelectedKeys={['1']} onClick={(e)=>this.setState({menuIndex:e.key})}>
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
                        <Content id={'content'} className={'content'}>
                            <div>
                                <div className={'toolbar'}>
                                    <span className={'orderBy'}>
                                        {
                                            this.state.menuIndex !== '1' && this.state.menuIndex !== '2'
                                                ? <><i className={'iconfont icongarbage'}/><span><strong>回收站</strong>：删除过的项目，最多保存xx天</span></>
                                                : (this.state.menuIndex === '1'
                                                    ? <><i className={'iconfont iconall'}/><span><strong>全部项目</strong>：我参与的所有项目</span></>
                                                    : <><i className={'iconfont iconfavorite'}/><span><strong>收藏项目</strong>：我收藏的项目</span></>)
                                        }
                                    </span>
                                    <span>
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

                                </div>
                                <table className={'fileList'}>
                                    <tr>
                                        <th width="60%">项目名</th>
                                        <th>项目成员</th>
                                        <th>修改时间</th>
                                        <th>创建时间</th>
                                        <th>操作</th>
                                    </tr>
                                    <tr>
                                        <td className={'fileName'} onClick={()=>this.props.history.push('/nohtml/detail/789789')}>我的第一个项目</td>
                                        <td>
                                            <div>
                                                <img src={require('./asset/avatar.jpg')}/>
                                                <img src={require('./asset/avatar2.jpg')}/>
                                                <img src={require('./asset/avatar2.jpg')}/>
                                                <img src={require('./asset/avatar2.jpg')}/>
                                            </div>
                                        </td>
                                        <td>2019.6.30</td>
                                        <td>2019.5.25</td>
                                        <td>
                                            <div className={'btns'}>
                                                <i className={'iconfont iconfavorite'}/>
                                                <i className={'iconfont icongarbage'}/>
                                                <i className={'iconfont iconadd'}/>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={'fileName'} onClick={()=>this.props.history.push('/nohtml/detail/123456')}>我的第二个很长很长很长长很长长很长很长的项目</td>
                                        <td>
                                            <div>
                                                <img src={require('./asset/avatar.jpg')}/>
                                                <img src={require('./asset/avatar3.jpg')}/>
                                            </div>
                                        </td>
                                        <td>2020.1.26</td>
                                        <td>2020.1.1</td>
                                        <td>
                                            <div className={'btns'}>
                                                <i className={'iconfont iconfavorite'}/>
                                                <i className={'iconfont icongarbage'}/>
                                                <i className={'iconfont iconadd'}/>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                                <Pagination simple defaultCurrent={2} total={50} style={{float:'right'}}/>
                            </div>
                        </Content>
                    </Layout>
                </Content>
                {/*<Switch>*/}
                    {/*<Route path={`/nohtml/xx`}>*/}
                        {/*<Nohtml />*/}
                    {/*</Route>*/}
                {/*</Switch>*/}
            </Layout>
        )
    }
}

export default withRouter(NohtmlIndex);
