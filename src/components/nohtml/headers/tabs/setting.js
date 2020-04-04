import React from 'react'
import '../css/setting.less'
import {Divider,Tooltip} from 'antd'

class Setting extends React.Component{
    render() {
        return (
            <div className={'setting'}>
                <div className={'icon'}>
                    <i className={'iconfont iconaddimg'}/>
                    <div>
                        <span>网站图标</span>
                        <Tooltip title={'仅支持.ico文件'} placement={'bottomLeft'} align={{offset:[-6,-3]}}>
                            <i className={'iconfont iconhelp'}/>
                        </Tooltip>
                    </div>

                </div>
            </div>
        )
    }

}

export default Setting;
