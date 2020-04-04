import React,{PureComponent} from 'react'

import './myFooter.less'
export default class MyFooter extends PureComponent{
    render() {
        return (
            <footer className={'footer_wp'}>
                Copyright © 2019 剑齿. All rights reserved.
                <a href={'http://www.beian.miit.gov.cn/'}>皖ICP备19016238号</a>
            </footer>
        )
    }
}
