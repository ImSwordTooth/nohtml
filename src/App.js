import React from 'react';
import MyHeader from './components/headers/myHeader'
import MyTools from './components/headers/myTools'

import './css/app.less'


function App() {
  return (
      <div className='App'>
        <MyHeader/>
        <MyTools/>
      </div>
  );
}

export default App;
