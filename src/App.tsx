import React from 'react';

import { Layout, Menu, Modal } from 'antd';
import { HomeOutlined, PaperClipOutlined, SettingOutlined, UserOutlined, CompassOutlined } from '@ant-design/icons';

import { Outlet } from 'react-router';

import { supabase } from './lib/supabase';

import LoginComponent from './components/LoginComponent';
import Setting from './components/SettingComponent';
import ProfileComponent from './components/ProfileComponent';
import SignUpComponent from './components/SignUpComponent';
import DiscoverComponent from './components/DiscoverComponent';

const { Content, Footer, Sider } = Layout;

export default function App() {
  const [collapsed, setCollapsed] = React.useState(true);

  const [openLogin, setLoginModal] = React.useState(false)

  const OpenLoginModal = () => {
    setLoginModal(true)
  }

  const CloseLoginModal = () => {
    setLoginModal(false)
  }

  const [openSetting, setSettingModal] = React.useState(false)

  const OpenSettingModal = () => {
    setSettingModal(true)
  }

  const CloseSettingModal = () => {
    setSettingModal(false)
  }

  const [openProfile, setProfileModal] = React.useState(false)

  const OpenProfileModal = () => {
    setProfileModal(true)
  }

  const CloseProfileModal = () => {
    setProfileModal(false)
  }

  const [openSignUp, setSignUpModal] = React.useState(false)

  const OpenSignUpModal = () => {
    setSignUpModal(true)
  }

  const CloseSignUpModal = () => {
    setSignUpModal(false)
  }

  const [openDiscover, setDiscoverModal] = React.useState(false)

  const OpenDiscoverModal = () => {
    setDiscoverModal(true)
  }

  const CloseDiscoverModal = () => {
    setDiscoverModal(false)
  }

  const [session, setSession] = React.useState<any>(null);

  React.useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    }
    )
  },

    []
  )

  return (
    <>
      <Layout hasSider style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 1 }}>
          <div className="logo" />
          <Menu mode="inline" theme="dark" defaultSelectedKeys={['1']}>
            <>
              <Menu.Item icon={<HomeOutlined />} key="1">
                Home
              </Menu.Item>
              <Menu.Item onClick={OpenDiscoverModal} icon={<CompassOutlined />} key="2">
                Discover
              </Menu.Item>
              <Menu.Item icon={<PaperClipOutlined />} key="3">
                Blog
              </Menu.Item>
              {session ? (
                <>
                  <Menu.SubMenu icon={<UserOutlined />} title="Account" >
                    <Menu.Item onClick={OpenProfileModal}>
                      Profile
                    </Menu.Item>
                    <Menu.Item onClick={() => supabase.auth.signOut()}>
                      Logout
                    </Menu.Item>
                    <Menu.Item disabled>
                      Sign Up
                    </Menu.Item>
                  </Menu.SubMenu>
                </>
              ) : (
                <>
                  <Menu.SubMenu icon={<UserOutlined />} title="Account" >
                    <Menu.Item disabled>
                      Profile
                    </Menu.Item>
                    <Menu.Item onClick={OpenLoginModal}>
                      Login
                    </Menu.Item>
                    <Menu.Item onClick={OpenSignUpModal}>
                      Sign Up
                    </Menu.Item>
                  </Menu.SubMenu>
                </>
              )}
              <Menu.Item icon={<SettingOutlined />} onClick={OpenSettingModal}>
                Setting
              </Menu.Item>
            </>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 90 }}>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: 'center' }}>River v2.0.1 By Bloom </Footer>
        </Layout>
      </Layout>

      <Modal open={openLogin} onCancel={CloseLoginModal} footer={null} title="Login">
        <LoginComponent />
      </Modal>

      <Modal open={openSignUp} onCancel={CloseSignUpModal} footer={null} title="Creating a Account">
        <SignUpComponent />
      </Modal>

      <Modal open={openSetting} onCancel={CloseSettingModal} footer={null} title="River Setting">
        <Setting />
      </Modal>

      <Modal open={openProfile} onCancel={CloseProfileModal} footer={null} title="Profile">
        <ProfileComponent />
      </Modal>

      <Modal open={openDiscover} onCancel={CloseDiscoverModal} footer={null} title="Discover">
        <DiscoverComponent />
      </Modal>
    </>
  );
};

