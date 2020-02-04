import React from 'react'
import {Modal} from "antd";
import store from '../../../../store'

class recentFileModal extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{

        })
    }

    render() {
        return (
            <Modal title={'最近文件'} width={1200}>
                <div>
                    1234
                </div>
            </Modal>
        )
    }

}

export default recentFileModal
