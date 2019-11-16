import React from 'react'
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import Nohtml from "../nohtml";

import './html.less'
import MyFooter from "../components/footer/myFooter";

class Html extends React.Component{
    render() {
        return (
            <Router basename={'nohtml'}>
                <div>

                    <Route exact path={'/'}>
                        <div className={'html_wp'}>
                            <p style={{
                                fontSize:'60px',
                                fontWeight:'100',
                            }}>
                                html可视化构建工具
                            </p>
                            <Link to={'/index'}>
                                <button className={'enter'}>进入</button>
                            </Link>
                            <div className={'describe_wp'}>
                                <div>
                                    <h3 className={'describe'}>树状结构，随心操作元素</h3>
                                    <pre className={'describe_content'}>
                                    细致还原Dom树，像Word一样编辑您的元素
                                </pre>
                                </div>
                                <img className={'screenShot'} src={require('../asset/QQ截图20191115220255.png')} alt={'树状图'}/>
                            </div>
                            <div className={'describe_wp'}>
                                <img className={'screenShot'} src={require('../asset/QQ截图20191116150047.png')} alt={'动画编辑器'}/>
                                <div>
                                    <h3 className={'describe'}>动画编辑</h3>
                                    <pre className={'describe_content'}>
                                        内置动画编辑器，玩转@keyframes
                                    </pre>
                                </div>

                            </div>
                        </div>




                        <MyFooter/>
                    </Route>




                </div>

                <Route exact path="/index">
                    <Nohtml />
                </Route>
                {/*<Switch>*/}
                    {/*<Route path="/css">*/}
                    {/*<Nocss />*/}
                    {/*</Route>*/}

                {/*</Switch>*/}
            </Router>



        )
    }

}

export default Html
