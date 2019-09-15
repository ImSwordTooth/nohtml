import React from 'react'

//字型
class fontStyle extends React.Component{

    render() {
        return (
            <div className={'fontstyle icongroup'}>
                <div>
                    <i className='iconfont iconbold' />
                    <i className='iconfont iconlighter active' />
                    <i className='iconfont iconitalic' />
                    <i className='iconfont iconunderline' />
                    <i className='iconfont iconsub' />
                    <i className='iconfont iconsup' />
                </div>

            </div>
        )
    }
}

export default fontStyle
