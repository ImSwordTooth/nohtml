import React from 'react'
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import Nohtml from "../nohtml";

// import Swiper from 'swiper'

import './home.less'
import MyFooter from "../components/footer/myFooter";

import Swiper from 'swiper/js/swiper'
import 'swiper/css/swiper.css'

class Html extends React.Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }

    // componentDidMount() {
    //     new Swiper('.swiper-container', {
    //         height:'100%',
    //         direction: 'horizontal',//横向轮播
    //         loop: true,//无缝轮播
    //         parallax:true,
    //         speed:300,
    //         grabCursor : true,
    //         autoplay : {
    //             delay:3000,
    //             disableOnInteraction: false,
    //         },
    //         pagination: {
    //             el: '.swiper-pagination',
    //         },
    //         navigation: {//左右分页
    //             nextEl: '.swiper-button-next',
    //             prevEl: '.swiper-button-prev',
    //         }
    //     })
    // }
    //
    // componentWillUnmount() {
    //     if (this.state.mySwiper !== null) { // 销毁swiper
    //         // this.state.mySwiper.destroy()
    //     }
    // }

    render() {
        return (
            <Router basename={'nohtml'}>
                {/*<div>*/}

                    <Route exact path={'/'}>
                        <div className={'html_wp'}>
                            <div className="swiper-container" data-swiper-parallax="-23%">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide" data-swiper-parallax="-300">
                                        <div className={'describe_wp'}>
                                            <div>
                                                <h3 className={'describe'}>树状结构，随心操作元素</h3>
                                                <pre className={'describe_content'}>
                                                    细致还原Dom树，像Word一样编辑您的元素
                                                </pre>
                                            </div>
                                            <img className={'screenShot'} src={require('../asset/QQ截图20191115220255.png')} alt={'树状图'}/>
                                        </div>
                                    </div>
                                    <div className="swiper-slide" data-swiper-parallax="-500">
                                        <div className={'describe_wp'}>
                                            <img className={'screenShot'} src={require('../asset/index2.png')} alt={'动画编辑器'}/>
                                            <div>
                                                <h3 className={'describe'}>动画编辑</h3>
                                                <pre className={'describe_content'}>
                                                    内置动画编辑器，玩转@keyframes
                                                </pre>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="swiper-slide">Slide 3</div>
                                </div>

                                {/*<div className="swiper-scrollbar"></div>*/}
                            </div>

                            <div className="swiper-button-prev"/>
                            <div className="swiper-button-next"/>
                            <div className="swiper-pagination"/>

                            {/*<p style={{*/}
                                {/*fontSize:'60px',*/}
                                {/*fontWeight:'100',*/}
                            {/*}}>*/}
                                {/*html可视化构建工具*/}
                            {/*</p>*/}
                            <Link to={'/index'}>
                                <button className={'enter'}>进入</button>
                            </Link>

                            {/*<div className={'describe_wp'}>*/}
                                {/*<img className={'screenShot'} src={require('../asset/QQ截图20191116150047.png')} alt={'动画编辑器'}/>*/}
                                {/*<div>*/}
                                    {/*<h3 className={'describe'}>动画编辑</h3>*/}
                                    {/*<pre className={'describe_content'}>*/}
                                        {/*内置动画编辑器，玩转@keyframes*/}
                                    {/*</pre>*/}
                                {/*</div>*/}

                            {/*</div>*/}
                        </div>




                        <MyFooter/>
                    </Route>




                {/*</div>*/}

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
