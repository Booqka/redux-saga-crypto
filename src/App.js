import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import { Layout, Menu } from 'antd'
import CryptoList from './pages/CryptoList'
const { Header, Content, Footer } = Layout

export default function App() {

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          />
        </Header>
        <Content style={{ padding: '40px 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Switch>
              <Route path="/">
                <CryptoList/>
              </Route>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Booqka</Footer>
      </Layout>
    </Router>
  )
}


