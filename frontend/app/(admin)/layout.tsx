'use client'

import { Layout, Menu, Avatar, Dropdown, Typography } from 'antd'
import {
  DashboardOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  TeamOutlined,
  SafetyOutlined
} from '@ant-design/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { MenuProps } from 'antd'

const { Header, Sider, Content } = Layout
const { Title } = Typography

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const menuItems: MenuProps['items'] = [
    {
      key: '/admin/dashboard',
      icon: <DashboardOutlined />,
      label: <Link href="/admin/dashboard">仪表盘</Link>,
    },
    {
      key: '/admin/products',
      icon: <AppstoreOutlined />,
      label: <Link href="/admin/products">产品管理</Link>,
    },
    {
      key: '/admin/sensors',
      icon: <DatabaseOutlined />,
      label: <Link href="/admin/sensors">传感器管理</Link>,
    },
    {
      key: '/admin/documents',
      icon: <FileTextOutlined />,
      label: <Link href="/admin/documents">文档管理</Link>,
    },
    {
      key: '/admin/faq',
      icon: <QuestionCircleOutlined />,
      label: <Link href="/admin/faq">FAQ 管理</Link>,
    },
    {
      type: 'divider',
    },
    {
      key: '/admin/users',
      icon: <TeamOutlined />,
      label: <Link href="/admin/users">用户管理</Link>,
    },
    {
      key: '/admin/permissions',
      icon: <SafetyOutlined />,
      label: <Link href="/admin/permissions">权限管理</Link>,
    },
    {
      key: '/admin/settings',
      icon: <SettingOutlined />,
      label: <Link href="/admin/settings">系统设置</Link>,
    },
  ]

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
    },
    {
      type: 'divider',
    },
    {
      key: 'portal',
      label: <Link href="/">返回门户</Link>,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      danger: true,
    },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          OFS 管理后台
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          style={{ marginTop: '8px' }}
        />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{
          padding: '0 24px',
          background: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 1px 4px rgba(0,21,41,.08)'
        }}>
          <div />
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Avatar icon={<UserOutlined />} />
              <span>管理员</span>
            </div>
          </Dropdown>
        </Header>
        <Content style={{ margin: '24px', minHeight: 'calc(100vh - 112px)' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
