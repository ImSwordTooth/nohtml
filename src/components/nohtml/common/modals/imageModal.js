import React from 'react'
import {Input, Modal,message} from "antd";
const {TextArea} = Input;

export class ImageModal extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            imgName:'',
            imgSrc:''
        }
    }

    changeImg = (e,name)=>{
        this.setState({
            [name]:e.target.value
        })
        // console.log(this.state.imgSrc)
    }


    cancel = ()=>{
        this.props.cancel();
        this.setState({
            imgName:'',
            imgSrc:''
        })
    };

    ok = ()=>{
        let imgName = this.state.imgName,
            imgSrc = this.state.imgSrc;
        let src = '';
        if (this.props.imageModalTitle === '网络图片') {
            src = '图片地址'
        }else if (this.props.imageModalTitle === 'base64编码'){
            src = 'base64编码'
        }
        if (imgName === ''){
            message.error('请输入图片名');
        } else if (imgSrc === ''){
            message.error(`请输入${src}`);
        } else {
            this.props.ok(this.state.imgName,this.state.imgSrc);
            this.setState({
                imgName:'',
                imgSrc:''
            })
        }

    };

    //生成模态框里的内容
    getImageModal = (type)=>{
        if (type === '网络图片') {
            return (
                <>
                    <div className={'modal_item'}>
                        <span>图片名</span>
                        <div>
                            <Input style={{width:200}} value={this.state.imgName} onChange={(e)=>this.changeImg(e,'imgName')}/>
                        </div>
                    </div>
                    <div className={'modal_item'}>
                        <span>图片地址</span>
                        <div>
                            <Input style={{width:500}} value={this.state.imgSrc} onChange={(e)=>this.changeImg(e,'imgSrc')}/>
                        </div>
                    </div>
                </>
            )

        }else if (type === 'base64编码') {
            return (
                <>
                    <div className={'modal_item'}>
                        <span>图片名</span>
                        <div>
                            <Input style={{width:200}} value={this.state.imgName} onChange={(e)=>this.changeImg(e,'imgName')}/>
                        </div>
                    </div>
                    <div className={'modal_item'}>
                        <span>base64编码</span>
                        <div>
                            <TextArea autosize={{ minRows: 5}} style={{width:500}} value={this.state.imgSrc} onChange={(e)=>this.changeImg(e,'imgSrc')}/>
                        </div>
                    </div>
                </>
            )
        }
    };

    render() {
        return (
            <Modal title={this.props.imageModalTitle} width={800}
                   className={'imageModal modals'}
                   visible={this.props.showImageModal}
                   cancelText={'取消'}
                   okText={this.props.type}
                   onCancel={this.cancel}
                   onOk={this.ok}
            >
                <div>
                    {this.getImageModal(this.props.imageModalTitle)}
                </div>
            </Modal>
        )
    }
}
