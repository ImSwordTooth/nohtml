import React from 'react'
import '../css/animation.less'

class Animation extends React.Component{

    constructor(props){
        super(props);

    }

    render() {
        return (
            <div>
                <div className={'animationTimingFunction'}>
                    <ul className={'timingFunctionList'}>
                        <li><div className={'translate'}/></li>
                        <li><div className={'rotate'}/></li>
                        <li><div className={'scale'}/></li>
                        <li><div className={'skew'}/></li>
                    </ul>
                </div>
            </div>
        )
    }

}

export default Animation;
