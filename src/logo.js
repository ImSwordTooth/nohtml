import React from 'react'
import store from "./store";
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'


class Logo extends React.Component{

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    constructor(props){
        super(props);
        store.subscribe(this.listener);
    }
    listener = () => {
        let newState = store.getState();
        this.setState(newState);
    };


    render() {
        const { match, location, history } = this.props
        return (
            <div className={'logo_wp'}>
                <img src={require('./logo.png')} alt={'logo'} className={'logo'}/>
                {location.pathname}
            </div>
        )
    }

}

export default withRouter(Logo);
