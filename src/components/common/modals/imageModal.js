import React from 'react'
import {Input, Modal} from "antd";
const {TextArea} = Input;

export class ImageModal extends React.Component{

    constructor(props){
        super(props);
    }

    //生成模态框里的内容
    getImageModal = (type)=>{
        if (type === '网络图片') {
            return (
                <div className={'modal_item'}>
                    <span>图片地址</span>
                    <div>
                        <Input style={{width:500}}/>
                    </div>
                </div>
            )

        }else if (type === 'base64编码') {
            return (
                <div className={'modal_item'}>
                    <span>base64编码</span>
                    <div>
                        <TextArea autosize={{ minRows: 5}} style={{width:500}}/>
                    </div>
                </div>
            )
        }
    };

    render() {
        return (
            <Modal title={this.props.imageModalTitle} width={800}
                   className={'imageModal modals'}
                   visible={this.props.showImageModal}
                   onCancel={this.props.cancel}>
                <div>
                    {this.getImageModal(this.props.imageModalTitle)}
                </div>
            </Modal>
        )
    }
}
