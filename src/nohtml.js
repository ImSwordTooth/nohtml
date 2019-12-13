import React from 'react';
import { Provider } from 'react-redux'
import store from './store/index'

import { Layout } from 'antd'
import MyHeader from './components/nohtml/headers/myHeader'
import MySider from './components/nohtml/sider/mySider'
import MyContent from './components/nohtml/content/myContent'
import MyFooter from './components/nohtml/footer/myFooter'


import './css/nohtml.less'
const { Content, Footer, Sider } = Layout;

class Nohtml extends React.Component{

    render() {
        return (
            <Provider store={store}>
                <Layout className={'App'}>
                    <MyHeader/>
                    <Content>
                        <Layout style={{ padding: '24px 0', background: '#fff' }}>
                            <Sider width={200} style={{ background: '#fff' }}>
                                <MySider/>
                            </Sider>
                            <Content id={'content'} className={'content'}>
                                <MyContent/>
                            </Content>
                        </Layout>
                    </Content>
                    <Footer className={'footer'}>
                        {/*<MyFooter/>*/}
                    </Footer>
                </Layout>
            </Provider>
        );
    }

}
// function Nohtml() {
//   return (
//       <Provider store={store}>
//           <Layout className={'App'}>
//               <MyHeader/>
//               <Content>
//                   <Layout style={{ padding: '24px 0', background: '#fff' }}>
//                       <Sider width={200} style={{ background: '#fff' }}>
//                           <MySider/>
//                       </Sider>
//                       <Content style={{ padding: '0 24px', minHeight: 280 }}>
//                           <MyContent/>
//                       </Content>
//                   </Layout>
//               </Content>
//               <Footer className={'footer'}>
//                  <MyFooter/>
//               </Footer>
//           </Layout>
//       </Provider>
//   );
// }

export default Nohtml;
