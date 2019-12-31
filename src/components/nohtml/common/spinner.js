import React from 'react'
import './css/spinner.less'

class Spinner extends React.Component{

    constructor(props){
        super(props);
    }

    render() {
        return(
            <div>
                {/*{this.props.show*/}
                    {/*?*/}
                    <div className={'spinnerBox'}>
                        <div className="spinner"/>
                    </div>
                    {/*:*/}
                    {/*<></>*/}
                {/*}*/}
            </div>


        )
    }

}

export default Spinner
