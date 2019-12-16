import React from 'react'
import './css/mask.less'

class Mask extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className={'mask_wp'}>
                <span>{this.props.title}</span>
            </div>
        )
    }
}

export default Mask
