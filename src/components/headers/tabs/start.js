import React from 'react'

import Device from '../../common/device'
import MyFont from '../../common/font'
import FontStyle from '../../common/fontStyle'
import Color from '../../common/color'
import '../css/start.less'

import { Divider } from 'antd';

class start extends React.Component{

    render() {
        return (
            <div className='start'>
                <Device/>
                <Divider type={'vertical'}/>
                <MyFont/>
                <Divider type={'vitical'}/>
                <FontStyle/>
                <Divider type={'vitical'}/>
                <Color/>
            </div>
        )
    }

}

export default start
