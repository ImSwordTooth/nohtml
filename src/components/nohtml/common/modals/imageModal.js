import React,{PureComponent} from 'react'
import {Input, Modal,message} from "antd";
const {TextArea} = Input;

export class ImageModal extends PureComponent{

    state = {
        imgName:'',
        imgSrc:''
    }

    changeImg = (e,name)=>{
        this.setState({
            [name]:e.target.value
        })
        // console.log(this.state.imgSrc)
    }


    cancel = ()=>{
        const {cancel} = this.props
        cancel();
        this.setState({
            imgName:'',
            imgSrc:''
        })
    };

    ok = ()=>{
        let {imgName,imgSrc} = this.state;
        const {imageModalTitle,ok} = this.props
        let src = '';
        if (imageModalTitle === '网络图片') {
            src = '图片地址'
        }else if (imageModalTitle === 'base64编码'){
            src = 'base64编码'
        }
        if (imgName === ''){
            message.error('请输入图片名');
        } else if (imgSrc === ''){
            message.error(`请输入${src}`);
        } else {
            ok(imgName,imgSrc);
            this.setState({
                imgName:'',
                imgSrc:''
            })
        }

    };

    //生成模态框里的内容
    getImageModal = (type)=>{
        const {imgName,imgSrc} = this.state
        if (type === '网络图片') {
            return (
                <>
                    <div className={'modal_item'}>
                        <span>图片名</span>
                        <div>
                            <Input style={{width:200}} value={imgName} onChange={(e)=>this.changeImg(e,'imgName')}/>
                        </div>
                    </div>
                    <div className={'modal_item'}>
                        <span>图片地址</span>
                        <div>
                            <Input style={{width:500}} value={imgSrc} onChange={(e)=>this.changeImg(e,'imgSrc')}/>
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
                            <Input style={{width:200}} value={imgName} onChange={(e)=>this.changeImg(e,'imgName')}/>
                        </div>
                    </div>
                    <div className={'modal_item'}>
                        <span>base64编码</span>
                        <div>
                            <TextArea autosize={{ minRows: 5}} style={{width:500}} value={imgSrc} onChange={(e)=>this.changeImg(e,'imgSrc')}/>
                        </div>
                    </div>
                </>
            )
        }
    };

    render() {
        const {imageModalTitle,showImageModal,type} = this.props
        return (
            <Modal title={imageModalTitle} width={800}
                   className={'imageModal modals'}
                   visible={showImageModal}
                   cancelText={'取消'}
                   okText={type}
                   onCancel={this.cancel}
                   onOk={this.ok}
            >
                <div>
                    {this.getImageModal(imageModalTitle)}
                </div>
            </Modal>
        )
    }
}
