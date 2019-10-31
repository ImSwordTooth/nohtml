import React from 'react';
import { Provider } from 'react-redux'
import store from './store/index'

import { Layout } from 'antd'
import MyHeader from './components/headers/myHeader'
import MySider from './components/sider/mySider'
import MyContent from './components/content/myContent'
import MyFooter from './components/footer/myFooter'
import CodeModal from './components/common/modals/codeModal'

import './css/app.less'
const { Content, Footer, Sider } = Layout;


function App() {
  return (
      <Provider store={store}>
          <Layout className={'App'}>
              <MyHeader/>
              <Content>
                  <Layout style={{ padding: '24px 0', background: '#fff' }}>
                      <Sider width={200} style={{ background: '#fff' }}>
                          <MySider/>
                      </Sider>
                      <Content style={{ padding: '0 24px', minHeight: 280 }}>
                          <MyContent/>
                      </Content>
                  </Layout>
              </Content>
              <Footer className={'footer'}>
                 <MyFooter/>
              </Footer>
          </Layout>
          <CodeModal/>
      </Provider>
  );
}

export default App;
