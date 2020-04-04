import React,{PureComponent} from 'react'
import './css/mask.less'

export default class Mask extends PureComponent{
    render() {
        return (
            <div className={'mask_wp'}>
                <span>{this.props.title}</span>
            </div>
        )
    }
}
