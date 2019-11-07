import React from 'react'
import {Menu} from "antd";
import {BrowserRouter as Router,Switch,Route,Link}  from 'react-router-dom'
import Nohtml from "./nohtml";
import Nocss from "./nocss";

class App extends React.Component{

    render() {
        return (
            <Router>
                <Menu mode="horizontal">
                    <Menu.Item key="mail">
                        <Link to={'/'}>
                            <i className={'iconfont iconhome'}/>
                            home
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="html">
                        <Link to={'/nohtml'}>
                            <i className={'iconfont iconhtml'} />
                            nohtml
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="nocss">
                        <Link to={'/nocss'}>
                            <i className={'iconfont iconcss'}/>
                            nocss
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="discuss">
                        <Link to={'/begin'}>
                            <i className={'iconfont icondiscuss'}/>
                            讨论区
                        </Link>
                    </Menu.Item>

                </Menu>

                <Switch>
                    <Route path="/nocss">
                        <Nocss />
                    </Route>
                    <Route path="/nohtml">
                        <Nohtml />
                    </Route>
                </Switch>
            </Router>
        )
    }

}


export default App;
