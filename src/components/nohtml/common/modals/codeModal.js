import React,{PureComponent} from 'react'
import {changeCode} from "../../../../store/action";
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript';
import '../css/codeModal.less'
import 'highlight.js/styles/androidstudio.css';
import {Modal, Tabs, Switch, Icon} from "antd";
import {connect} from 'react-redux'
const { TabPane } = Tabs;

hljs.registerLanguage('javascript', javascript);


class CodeModal extends PureComponent{

    state = {
        cssSpinner:true
    }

    getHTMLContent = (val,n)=>{
        let {key, pid, children, type,viewStyle,content,props} = val;

        let space = '';
        for (let i=0;i<n;i++){
            space += '\t';
        }

        let innerText = '';
        if (content){
            innerText = `\n${space}${`\t`+content}`
        } else {
            innerText = ''
        }

        let style = '';
        if (JSON.stringify(viewStyle)!=='{}'){
            style = ' style="';
            for (let i in viewStyle){
                style += `${i.replace(/[A-Z]/g,w=>'-'+w.toLowerCase())}:${viewStyle[i]};`
            }
            style += '"';
        }


        if (children!==undefined){
            return `\n${space}<${type} ${`id="${key}"`}${style}${props.src?` src="${props.src}"`:''}>${innerText}${[...children.map(val => this.getHTMLContent(val,n+1))].join('')}
${space}</${type}>`
        } else {
            if (type === 'img' || type === 'input') {
                return `\n${space}<${type} ${`id="${key}"`}${style}${props.src?` src="${props.src}"`:''} />`
            }else{
                return `\n${space}<${type} ${`id="${key}"`}${style}${props.src?` src="${props.src}"`:''}> </${type}>`
            }

        }
    };
     getCssContent = (val)=>{
        let style = '';
            for (let i in val.viewStyle){
                style += `\t${i.replace(/[A-Z]/g,w=>'-'+w.toLowerCase())}:${val.viewStyle[i]};`
            }

            return `.${val.className}{\n${style.replace(/;(?<!;$)/g,';\n')}\n}\n`
    }

    cancel = ()=>{
        // this.props.cancel();
        // this.setState({
        //     tableThs:['表头1','表头2','表头3'],
        //     currentClass:''
        // })
    }

    ok = ()=>{
        // this.props.ok(this.state.tableThs,this.state.currentClass);
        // this.setState({
        //     tableThs:['表头1','表头2','表头3'],
        //     currentClass:''
        // })
    }



    render() {
         const {showCode,changeCode,tagList,classList} = this.props
        return (
            <Modal title={'生成代码'} width={1200}
                   className={'code_wp modals'}
                   visible={showCode}
                   cancelText={'关闭'}
                   okText={'下载'}
                   onOk={this.ok}
                   onCancel={()=>changeCode(false)}
                >



                <Tabs type="card" tabBarExtraContent={
                    <div>
                        <span>是否压缩</span>
                        <Switch  checkedChildren={<Icon type="check" />}
                                 unCheckedChildren={<Icon type="close" />}
                                 defaultChecked/>
                    </div>}>
                    <TabPane tab="html" key="1">
                        <div className={'html'}>
                            {tagList.children.map(val=>this.getHTMLContent(val,0))}
                        </div>
                    </TabPane>
                    <TabPane tab="css" key="2">
                        <div className={'css'}>
                            {/*<Spinner show={this.state.cssSpinner}/>*/}
                            {classList.map(val=>this.getCssContent(val,0))}
                        </div>
                    </TabPane>
                </Tabs>


            </Modal>
            // this.state.showCode
            //     ?
            //
            //     :''

        )
    }
}

function mapStateToProps(state) {
    const {showCode,tagList,classList} = state;
    return {showCode,tagList,classList}
}

function mapDispatchToProps() {
    return {
        changeCode
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CodeModal)
