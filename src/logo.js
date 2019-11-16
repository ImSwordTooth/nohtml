import React from 'react'

class Logo extends React.Component{

    render() {
        return (
            <div className={'logo_wp'}>
                <img src={require('./logo.png')} alt={'logo'} className={'logo'}/>
            </div>
        )
    }

}

export default Logo;
