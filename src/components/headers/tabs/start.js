import React from 'react'

import MyFont from '../../common/font'
import FontStyle from '../../common/fontStyle'
import Color from '../../common/color'
import '../css/start.less'

import { Divider } from 'antd';

class start extends React.Component{

    render() {
        return (
            <div className='start'>
                <MyFont/>
                <Divider type={'vertical'}/>
                <FontStyle/>
                <Divider type={'vertical'}/>
                <Color/>
            </div>
        )
    }

}

export default start
