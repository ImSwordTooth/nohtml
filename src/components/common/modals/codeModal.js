import React from 'react'
import store from '../../../store'
import {changeCode} from "../../../store/action";
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript';
import '../css/codeModal.less'
import 'highlight.js/styles/androidstudio.css';

hljs.registerLanguage('javascript', javascript);


class CodeModal extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{

        })
        store.subscribe(this.listener)
    }

    listener = ()=>{
        let newState = store.getState();
        this.setState(newState)
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
    }



    render() {
        return (
            this.state.showCode
                ?
                <div className={'code_wp'}>
                    <button onClick={()=>changeCode(false)}>关闭</button>
                    <div className={'html'} style={{whiteSpace:'pre'}}>
                        {/*{hljs.highlightAuto(this.state.tagList.children.map(val=>this.getHTMLContent(val,0))).value}*/}
                        {/*<pre dangerouslySetInnerHTML={hljs.highlight('javascript','function codes () {\n' +*/}
                        {/*'      return this.$store.getters.getCodes + \'\\n\' + this.$store.getters.getHoverCodes + \'\\n\' + this.$store.getters.getAnimationCodes\n' +*/}
                        {/*'    }').value}>*/}
                        {/*<code>*/}

                        {/*{}*/}

                        {/*<pre><code className="html">*/}
                        {/*{this.state.tagList.children.map(val=>this.getHTMLContent(val,0))}*/}
                        {/*</code></pre>*/}
                        {this.state.tagList.children.map(val=>this.getHTMLContent(val,0))}
                    </div>
                </div>
                :''

        )
    }
}

export default CodeModal
